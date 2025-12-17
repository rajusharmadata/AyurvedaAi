import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaMapMarkerAlt, FaCamera, FaUserShield, FaGlobe } from 'react-icons/fa';


export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    socialLinks: { twitter: '', linkedin: '', github: '' },
    profilePicture: null,
    twoFactorEnabled: false,
  });
  const [errors, setErrors] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const fileInputRef = useRef(null);

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);

  const calculateProfileCompletion = () => {
    const fields = [
      'name',
      'username',
      'email',
      'phone',
      'dob',
      'address',
      'profilePicture',
      'socialLinks.twitter',
      'socialLinks.linkedin',
      'socialLinks.github',
    ];
    const filledFields = fields.filter((field) => {
      if (field.includes('socialLinks')) {
        const [_, key] = field.split('.');
        return profileData.socialLinks[key];
      }
      return profileData[field];
    }).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profileData.name.trim()) newErrors.name = 'Name is required';
    if (!profileData.username.trim()) newErrors.username = 'Username is required';
    if (!profileData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email';
    if (profileData.phone && !profileData.phone.match(/^\+?\d{10,15}$/)) newErrors.phone = 'Invalid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1];
      setProfileData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value },
      }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      if (validateForm()) {
        setIsEditing(false);
      }
    } else {
      setOriginalData({ ...profileData }); // Save original data for cancel
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setProfileData(originalData); // Revert to original data
    setErrors({});
    setIsEditing(false);
    setOriginalData(null);
  };

  const toggleTwoFactor = () => {
    setProfileData((prev) => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.3 } }),
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg mt-8 mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div
            className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-purple-500 flex items-center justify-center text-4xl text-white overflow-hidden transition-transform hover:scale-105 cursor-pointer"
            onClick={() => isEditing && fileInputRef.current.click()}
            role="button"
            aria-label="Profile picture"
          >
            {profileData.profilePicture ? (
              <img src={profileData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              profileData.name ? profileData.name[0].toUpperCase() : 'U'
            )}
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <FaCamera className="text-white text-2xl" />
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{profileData.name || 'My Profile'}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">@{profileData.username || 'N/A'}</p>
          </div>
        </div>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <motion.button
            onClick={toggleEdit}
            className="bg-gradient-to-r from-teal-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </motion.button>
          {isEditing && (
            <motion.button
              onClick={handleCancel}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          )}
        </div>
      </div>

      {/* Profile Completion Progress */}
      <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Completion</span>
          <span className="text-sm font-medium text-teal-600 dark:text-teal-400">{calculateProfileCompletion()}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-teal-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${calculateProfileCompletion()}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Edit or View Mode */}
      <AnimatePresence>
        {isEditing ? (
          <motion.form
            key="edit-form"
            className="space-y-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Personal Info Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: 'name', label: 'Full Name', type: 'text', error: errors.name, icon: FaUser },
                  { name: 'username', label: 'Username', type: 'text', error: errors.username, icon: FaUser },
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    variants={fieldVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    className="relative"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
                    <div className="relative">
                      <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={field.type}
                        name={field.name}
                        value={profileData[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.label}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 transition-all duration-300"
                        aria-invalid={field.error ? 'true' : 'false'}
                      />
                    </div>
                    {field.error && <p className="text-red-500 text-sm mt-1">{field.error}</p>}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: 'email', label: 'Email Address', type: 'email', error: errors.email, icon: FaEnvelope },
                  { name: 'phone', label: 'Phone Number', type: 'tel', error: errors.phone, icon: FaPhone },
                  { name: 'dob', label: 'Date of Birth', type: 'date', error: null, icon: FaCalendar },
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    variants={fieldVariants}
                    custom={index + 2}
                    initial="hidden"
                    animate="visible"
                    className="relative"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
                    <div className="relative">
                      <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={field.type}
                        name={field.name}
                        value={profileData[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.label}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 transition-all duration-300"
                        aria-invalid={field.error ? 'true' : 'false'}
                      />
                    </div>
                    {field.error && <p className="text-red-500 text-sm mt-1">{field.error}</p>}
                  </motion.div>
                ))}
                <motion.div
                  variants={fieldVariants}
                  custom={5}
                  initial="hidden"
                  animate="visible"
                  className="col-span-1 sm:col-span-2"
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400" />
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Enter your address"
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Links Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Social Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {['twitter', 'linkedin', 'github'].map((platform, index) => (
                  <motion.div
                    key={platform}
                    variants={fieldVariants}
                    custom={index + 6}
                    initial="hidden"
                    animate="visible"
                    className="relative"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </label>
                    <div className="relative group">
                      <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name={`socialLinks.${platform}`}
                        value={profileData.socialLinks[platform]}
                        onChange={handleInputChange}
                        placeholder={`Your ${platform} URL`}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 transition-all duration-300"
                      />
                      <div className="absolute hidden group-hover:block text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Enter your {platform} profile URL
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Security Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Security</h3>
              <motion.div
                variants={fieldVariants}
                custom={9}
                initial="hidden"
                animate="visible"
                className="flex items-center space-x-4"
              >
                <FaUserShield className="text-teal-500 text-xl" />
                <div className="flex items-center justify-between w-full">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Two-Factor Authentication</label>
                  <button
                    type="button"
                    onClick={toggleTwoFactor}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-200 ${
                      profileData.twoFactorEnabled ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-checked={profileData.twoFactorEnabled}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                        profileData.twoFactorEnabled ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="view-mode"
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md space-y-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: FaUser, value: profileData.name, label: 'Name' },
                  { icon: FaUser, value: `@${profileData.username}`, label: 'Username' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center space-x-3"
                    variants={fieldVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                  >
                    <item.icon className="text-teal-500 text-lg" />
                    <p className="text-gray-700 dark:text-gray-300">{item.value || 'N/A'}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: FaEnvelope, value: profileData.email, label: 'Email' },
                  { icon: FaPhone, value: profileData.phone, label: 'Phone' },
                  { icon: FaCalendar, value: profileData.dob, label: 'Date of Birth' },
                  { icon: FaMapMarkerAlt, value: profileData.address, label: 'Address', span: true },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className={`${item.span ? 'col-span-1 sm:col-span-2' : ''} flex items-center space-x-3`}
                    variants={fieldVariants}
                    custom={index + 2}
                    initial="hidden"
                    animate="visible"
                  >
                    <item.icon className="text-teal-500 text-lg" />
                    <p className="text-gray-700 dark:text-gray-300">{item.value || 'N/A'}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Social Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: FaGlobe, value: profileData.socialLinks.twitter, label: 'Twitter' },
                  { icon: FaGlobe, value: profileData.socialLinks.linkedin, label: 'LinkedIn' },
                  { icon: FaGlobe, value: profileData.socialLinks.github, label: 'GitHub' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center space-x-3"
                    variants={fieldVariants}
                    custom={index + 6}
                    initial="hidden"
                    animate="visible"
                  >
                    <item.icon className="text-teal-500 text-lg" />
                    <p className="text-gray-700 dark:text-gray-300">{item.value || 'N/A'}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Security</h3>
              <motion.div
                className="flex items-center space-x-3"
                variants={fieldVariants}
                custom={9}
                initial="hidden"
                animate="visible"
              >
                <FaUserShield className="text-teal-500 text-lg" />
                <p className="text-gray-700 dark:text-gray-300">
                  Two-Factor Authentication: {profileData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}