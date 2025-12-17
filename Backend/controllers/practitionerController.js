import Practitioner from '../module/Practitioner.js';
import User from '../module/User.js';

export const getPractitioners = async (req, res) => {
    try {
        const practitioners = await Practitioner.find()
            .populate('user', 'name profilePicture')
            .sort({ createdAt: -1 });
        res.json(practitioners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPractitioner = async (req, res) => {
    try {
        const practitioner = await Practitioner.findById(req.params.id)
            .populate('user', 'name profilePicture');
        
        if (!practitioner) {
            return res.status(404).json({ message: 'Practitioner not found' });
        }

        res.json(practitioner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPractitioner = async (req, res) => {
    try {
        const { user, specialization, experience, qualifications, image } = req.body;
        
        const practitioner = new Practitioner({
            user,
            specialization,
            experience,
            qualifications,
            image
        });

        await practitioner.save();
        res.status(201).json(practitioner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePractitioner = async (req, res) => {
    try {
        const practitioner = await Practitioner.findById(req.params.id);
        
        if (!practitioner) {
            return res.status(404).json({ message: 'Practitioner not found' });
        }

        if (practitioner.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { specialization, experience, qualifications, image } = req.body;
        
        Object.assign(practitioner, {
            specialization,
            experience,
            qualifications,
            image
        });

        await practitioner.save();
        res.json(practitioner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePractitioner = async (req, res) => {
    try {
        const practitioner = await Practitioner.findById(req.params.id);
        
        if (!practitioner) {
            return res.status(404).json({ message: 'Practitioner not found' });
        }

        if (practitioner.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await practitioner.deleteOne();
        res.json({ message: 'Practitioner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
