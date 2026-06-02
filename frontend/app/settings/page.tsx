'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import ToggleSwitch from '@/components/dashboard/ToggleSwitch';
import { User, NotificationSettings } from '@/types';

export default function SettingsPage() {
  // Profile form state
  const [profileData, setProfileData] = useState<Partial<User>>({
    fullName: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    bio: 'This is a test account',
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification settings state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNewFollowers: true,
    emailNewComments: true,
    emailNewLikes: false,
    weeklyDigest: true,
    marketingEmails: false,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (setting: keyof NotificationSettings, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      // Simulate save
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    try {
      setSaving(true);
      // Simulate save
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    try {
      setSaving(true);
      // Simulate save
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessage({ type: 'success', text: 'Notification settings updated!' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#f7f7f9]">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[#787882]">Loading settings...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f7f7f9]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-[#d2d2da] px-8 py-4">
          <h1 className="text-xl font-bold text-[#14141e]">Settings</h1>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-auto">
          {/* Message Alert */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-[#eaf8f0] text-[#27a064] border border-[#27a064]'
                  : 'bg-[#fbeaf0] text-[#993556] border border-[#993556]'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="max-w-4xl space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-[10px] border border-[#d2d2da] p-6">
              <h2 className="text-base font-bold text-[#14141e] mb-6">Profile</h2>

              <div className="space-y-5">
                {/* Avatar */}
                <div className="flex items-start gap-4">
                  <div className="w-[72px] h-[72px] rounded-full bg-[#e6f1fb] flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-[#0c447c]">
                      {profileData.fullName
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase() || 'NN'}
                    </span>
                  </div>
                  <button className="px-6 py-1.5 border border-[#d2d2da] rounded-[7px] text-[12px] font-normal text-[#14141e] hover:bg-gray-50 transition-colors">
                    Change photo
                  </button>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-medium text-[#787882] mb-2">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    value={profileData.fullName || ''}
                    onChange={(e) => handleProfileChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d2d2da] rounded-[7px] bg-[#fafafc] text-[13px] font-normal text-[#14141e] focus:outline-none focus:ring-2 focus:ring-[#378add]"
                    placeholder="Your full name"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-[10px] font-medium text-[#787882] mb-2">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    value={profileData.username || ''}
                    onChange={(e) => handleProfileChange('username', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d2d2da] rounded-[7px] bg-[#fafafc] text-[13px] font-normal text-[#14141e] focus:outline-none focus:ring-2 focus:ring-[#378add]"
                    placeholder="@username"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-[10px] font-medium text-[#787882] mb-2">BIO</label>
                  <input
                    type="text"
                    value={profileData.bio || ''}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d2d2da] rounded-[7px] bg-[#fafafc] text-[13px] font-normal text-[#14141e] focus:outline-none focus:ring-2 focus:ring-[#378add]"
                    placeholder="Your bio"
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="w-full py-2.5 bg-[#378add] rounded-[9px] text-white text-[14px] font-medium hover:bg-[#2668b8] disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </div>

            {/* Account Section */}
            <div className="bg-white rounded-[10px] border border-[#d2d2da] p-6">
              <h2 className="text-base font-bold text-[#14141e] mb-6">Account</h2>

              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-[10px] font-medium text-[#787882] mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={profileData.email || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-[#d2d2da] rounded-[7px] bg-[#fafafc] text-[13px] font-normal text-[#14141e] cursor-not-allowed"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[10px] font-medium text-[#787882] mb-2">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    readOnly
                    value="••••••••••"
                    className="w-full px-3 py-2 border border-[#d2d2da] rounded-[7px] bg-[#fafafc] text-[13px] font-normal text-[#14141e] cursor-not-allowed"
                  />
                </div>

                {/* Current Password */}
                <div>
                  <label className="block text-[10px] font-medium text-[#787882] mb-2">
                    CURRENT PASSWORD
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d2d2da] rounded-[7px] bg-[#fafafc] text-[13px] font-normal text-[#14141e] focus:outline-none focus:ring-2 focus:ring-[#378add]"
                    placeholder="Enter current password"
                  />
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-[10px] font-medium text-[#787882] mb-2">
                    NEW PASSWORD
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d2d2da] rounded-[7px] bg-[#fafafc] text-[13px] font-normal text-[#14141e] focus:outline-none focus:ring-2 focus:ring-[#378add]"
                    placeholder="Enter new password"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[10px] font-medium text-[#787882] mb-2">
                    CONFIRM PASSWORD
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d2d2da] rounded-[7px] bg-[#fafafc] text-[13px] font-normal text-[#14141e] focus:outline-none focus:ring-2 focus:ring-[#378add]"
                    placeholder="Confirm new password"
                  />
                </div>

                {/* Change Password Button */}
                <button
                  onClick={handleChangePassword}
                  disabled={saving || !passwordData.currentPassword || !passwordData.newPassword}
                  className="w-full py-2.5 bg-[#378add] rounded-[9px] text-white text-[14px] font-medium hover:bg-[#2668b8] disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Updating...' : 'Change password'}
                </button>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-white rounded-[10px] border border-[#d2d2da] p-6">
              <h2 className="text-base font-bold text-[#14141e] mb-6">Notifications</h2>

              <div className="space-y-2">
                <ToggleSwitch
                  id="emailNewFollowers"
                  label="Email new followers"
                  checked={notifications.emailNewFollowers}
                  onChange={(checked) => handleNotificationChange('emailNewFollowers', checked)}
                />
                <ToggleSwitch
                  id="emailNewComments"
                  label="Email new comments"
                  checked={notifications.emailNewComments}
                  onChange={(checked) => handleNotificationChange('emailNewComments', checked)}
                />
                <ToggleSwitch
                  id="emailNewLikes"
                  label="Email new likes"
                  checked={notifications.emailNewLikes}
                  onChange={(checked) => handleNotificationChange('emailNewLikes', checked)}
                />
                <ToggleSwitch
                  id="weeklyDigest"
                  label="Weekly digest"
                  checked={notifications.weeklyDigest}
                  onChange={(checked) => handleNotificationChange('weeklyDigest', checked)}
                />
                <ToggleSwitch
                  id="marketingEmails"
                  label="Marketing emails"
                  checked={notifications.marketingEmails}
                  onChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                />
              </div>

              {/* Save Notifications Button */}
              <button
                onClick={handleSaveNotifications}
                disabled={saving}
                className="w-full mt-6 py-2.5 bg-[#378add] rounded-[9px] text-white text-[14px] font-medium hover:bg-[#2668b8] disabled:opacity-50 transition-colors"
              >
                {saving ? 'Saving...' : 'Save settings'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
