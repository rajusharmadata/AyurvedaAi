import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../module/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Create email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Send verification email
const sendVerificationEmail = async (user, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
    
    const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to: user.email,
        subject: 'Verify Your Email Address',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Welcome to AyushAI!</h2>
                <p>Hello ${user.name},</p>
                <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
                <p style="text-align: center; margin: 30px 0;">
                    <a href="${verificationUrl}" 
                       style="background-color: #4CAF50; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 4px; font-weight: bold;">
                        Verify Email Address
                    </a>
                </p>
                <p>Or copy and paste this link into your browser:</p>
                <p>${verificationUrl}</p>
                <p>This link will expire in 24 hours.</p>
                <p>If you didn't create an account, you can safely ignore this email.</p>
                <br>
                <p>Best regards,<br>The AyushAI Team</p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};

// User registration
export const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Check if user already exists
        const existingUsers = await User.find({ 
            $or: [
                { email: email.toLowerCase() }, 
                { username: username.toLowerCase() }
            ] 
        });

        // Check if any matching user is already verified
        for (const user of existingUsers) {
            if (user.isEmailVerified) {
                return res.status(400).json({
                    success: false,
                    message: 'User with this email or username already exists'
                });
            }
        }

        // If unverified users exist with conflicting data, delete them to allow new signup
        if (existingUsers.length > 0) {
            await User.deleteMany({
                _id: { $in: existingUsers.map(u => u._id) }
            });
        }

        // Create new user
        const user = await User.create({
            name,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password
        });

        // Generate email verification token
        const verificationToken = user.generateVerificationToken();
        await user.save({ validateBeforeSave: false });

        // Send verification email
        await sendVerificationEmail(user, verificationToken);

        // Generate JWT token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Registration successful! Please check your email to verify your account.',
            token,
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                isEmailVerified: user.isEmailVerified
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Error in registration',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Verify Email
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        
        // Hash the token
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');
        
        // Find user by verification token
        const user = await User.findOne({
            emailVerificationToken: hashedToken,
            emailVerificationExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification token'
            });
        }

        // Update user
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpire = undefined;
        await user.save();

        // Generate new JWT token
        const authToken = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Email verified successfully!',
            token: authToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                isEmailVerified: user.isEmailVerified
            }
        });
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying email',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Resend verification email
export const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No account found with this email address'
            });
        }
        
        if (user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email is already verified'
            });
        }
        
        // Generate new verification token
        const verificationToken = user.generateVerificationToken();
        await user.save({ validateBeforeSave: false });
        
        // Send verification email
        await sendVerificationEmail(user, verificationToken);
        
        res.status(200).json({
            success: true,
            message: 'Verification email resent. Please check your inbox.'
        });
    } catch (error) {
        console.error('Resend verification email error:', error);
        res.status(500).json({
            success: false,
            message: 'Error resending verification email',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// user login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email'
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            });
        }

        // Create token
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined in environment variables'); // Debug log
            return res.status(500).json({ message: 'Internal server error' });
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// user forgot password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        
        // Set reset token and expiration
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        // TODO: Implement actual email sending here
        console.log(`Reset token generated: ${resetToken}`);
        console.log(`Reset token will expire in 10 minutes`);

        res.status(200).json({
            message: 'Password reset email sent'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// user reset password
export const resetPassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        // Validate input
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Compare old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Old password is incorrect'
            });
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// logout
export const logout = async (req, res) => {
    try {
        // Invalidate the token (this can be done by adding it to a blacklist or similar)
        res.status(200).json({
            message: 'Logout successful'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


