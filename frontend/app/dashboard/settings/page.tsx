'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api';

type Tab = 'profile' | 'password' | 'notifications';

export default function SettingsPage() {
  const { user, setUser } = useAuth();
  const [tab, setTab] = useState<Tab>('profile');

  // Profile
  const [fullName, setFullName] = useState(user?.fullName ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');

  // Password
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passSaving, setPassSaving] = useState(false);

  // Notifications (local state only for now)
  const [notifs, setNotifs] = useState({
    emailNewFollowers: true,
    emailNewComments: true,
    emailNewLikes: false,
    weeklyDigest: true,
    marketingEmails: false,
  });

  const handleProfileSave = async () => {
    setProfileSaving(true);
    setProfileMsg('');
    try {
      const res = await apiClient.updateProfile({ fullName, bio } as any);
      if (res.success) {
        setUser({ ...user!, fullName, bio });
        setProfileMsg('Profile updated successfully!');
      } else {
        setProfileMsg(res.error || 'Failed to update profile');
      }
    } catch {
      setProfileMsg('Failed to update profile');
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSave = async () => {
    if (newPass !== confirmPass) { setPassMsg("Passwords don't match"); return; }
    if (newPass.length < 6) { setPassMsg('Password must be at least 6 characters'); return; }
    setPassSaving(true);
    setPassMsg('');
    try {
      const res = await apiClient.updatePassword(currentPass, newPass);
      if (res.success) {
        setPassMsg('Password updated successfully!');
        setCurrentPass(''); setNewPass(''); setConfirmPass('');
      } else {
        setPassMsg(res.error || 'Failed to update password');
      }
    } catch {
      setPassMsg('Failed to update password');
    } finally {
      setPassSaving(false);
    }
  };

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {(['profile', 'password', 'notifications'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {tab === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col gap-6">
          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
              {user ? getInitials(user.fullName) : '?'}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{user?.fullName}</p>
              <p className="text-sm text-slate-400">@{user?.username}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-slate-50 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Email</label>
              <input
                type="email"
                value={user?.email ?? ''}
                disabled
                className="w-full border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-400 bg-slate-50 cursor-not-allowed"
              />
              <p className="text-xs text-slate-400 mt-1">Email cannot be changed</p>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                maxLength={300}
                placeholder="Tell your readers about yourself..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-slate-50 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white resize-none"
              />
              <p className="text-xs text-slate-300 text-right">{bio.length}/300</p>
            </div>
          </div>

          {profileMsg && (
            <p className={`text-sm font-medium ${profileMsg.includes('success') ? 'text-emerald-600' : 'text-red-500'}`}>
              {profileMsg}
            </p>
          )}

          <button
            onClick={handleProfileSave}
            disabled={profileSaving}
            className="self-start px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors disabled:opacity-50"
          >
            {profileSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}

      {/* Password Tab */}
      {tab === 'password' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col gap-5">
          <h2 className="text-base font-semibold text-slate-800">Change Password</h2>

          {(['Current Password', 'New Password', 'Confirm New Password'] as const).map((label, i) => {
            const val = [currentPass, newPass, confirmPass][i];
            const setter = [setCurrentPass, setNewPass, setConfirmPass][i];
            return (
              <div key={label}>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">{label}</label>
                <input
                  type="password"
                  value={val}
                  onChange={(e) => setter(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-slate-50 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white"
                />
              </div>
            );
          })}

          {passMsg && (
            <p className={`text-sm font-medium ${passMsg.includes('success') ? 'text-emerald-600' : 'text-red-500'}`}>
              {passMsg}
            </p>
          )}

          <button
            onClick={handlePasswordSave}
            disabled={passSaving}
            className="self-start px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors disabled:opacity-50"
          >
            {passSaving ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      )}

      {/* Notifications Tab */}
      {tab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col gap-5">
          <h2 className="text-base font-semibold text-slate-800">Email Notifications</h2>
          <div className="flex flex-col gap-4">
            {(Object.keys(notifs) as (keyof typeof notifs)[]).map((key) => {
              const labels: Record<keyof typeof notifs, string> = {
                emailNewFollowers: 'New followers',
                emailNewComments: 'New comments on your posts',
                emailNewLikes: 'Likes on your posts',
                weeklyDigest: 'Weekly performance digest',
                marketingEmails: 'Product updates & news',
              };
              return (
                <label key={key} className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                    {labels[key]}
                  </span>
                  <button
                    role="switch"
                    aria-checked={notifs[key]}
                    onClick={() => setNotifs((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      notifs[key] ? 'bg-blue-500' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                        notifs[key] ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </label>
              );
            })}
          </div>
          <button className="self-start mt-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors">
            Save Preferences
          </button>
        </div>
      )}

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-red-600 mb-2">Danger Zone</h2>
        <p className="text-xs text-slate-400 mb-4">
          Once you delete your account, there is no going back. All your posts and data will be permanently removed.
        </p>
        <button className="px-5 py-2 text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 rounded-xl transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
