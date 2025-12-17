import User from '../module/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.findOne({ name });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserDashboard = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.findOne({ name });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add your dashboard data logic here
    const dashboardData = {
      totalChats: 0,
      recentChats: [],
      preferences: user.preferences || {}
    };

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


