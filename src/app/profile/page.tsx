'use client';

import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  CreditCard,
  Trash2,
  Save,
  Moon,
  Sun,
  Key,
  UserCheck
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ProfilePage() {
  const { user, updateUser, role, switchRole, isDarkTheme, toggleTheme, showToast } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [weight, setWeight] = useState(user.weightKg);
  const [height, setHeight] = useState(user.heightCm);
  const [goal, setGoal] = useState(user.fitnessGoal);
  const [diet, setDiet] = useState(user.dietaryPreference);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      email,
      phone,
      weightKg: Number(weight),
      heightCm: Number(height),
      fitnessGoal: goal as any,
      dietaryPreference: diet as any
    });
    showToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your personal biometrics and preferences have been safely saved.'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
          <User className="w-3.5 h-3.5" />
          <span>Account Settings & Identity</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Member Profile & Preferences
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Update your biometric measurements, fitness goals, and switch system role perspectives.
        </p>
      </div>

      {/* Quick Role Switcher Pill */}
      <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Current Role Perspective</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Easily toggle between perspectives to test member, coach, admin, and guest experiences.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            {role}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          <button
            type="button"
            onClick={() => switchRole('member')}
            className={`py-2 rounded-xl text-xs font-bold border transition-all ${
              role === 'member'
                ? 'bg-emerald-500 text-black border-emerald-500 font-black'
                : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-600'
            }`}
          >
            Member (Devansh)
          </button>
          <button
            type="button"
            onClick={() => switchRole('trainer')}
            className={`py-2 rounded-xl text-xs font-bold border transition-all ${
              role === 'trainer'
                ? 'bg-blue-500 text-black border-blue-500 font-black'
                : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-600'
            }`}
          >
            Trainer (Vikram)
          </button>
          <button
            type="button"
            onClick={() => switchRole('admin')}
            className={`py-2 rounded-xl text-xs font-bold border transition-all ${
              role === 'admin'
                ? 'bg-purple-500 text-black border-purple-500 font-black'
                : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-600'
            }`}
          >
            Admin Console
          </button>
          <button
            type="button"
            onClick={() => switchRole('guest')}
            className={`py-2 rounded-xl text-xs font-bold border transition-all ${
              role === 'guest'
                ? 'bg-zinc-700 text-white border-zinc-500 font-black'
                : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-600'
            }`}
          >
            Public Guest
          </button>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-6">
        <h2 className="text-base font-black text-white">Personal Biometrics & Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-zinc-400 font-bold block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-zinc-400 font-bold block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-zinc-400 font-bold block mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-zinc-400 font-bold block mb-1">Primary Fitness Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Muscle Gain">Muscle Gain (Hypertrophy)</option>
              <option value="Fat Loss">Fat Loss (Leaning Out)</option>
              <option value="Strength & Conditioning">Strength & Conditioning</option>
              <option value="General Health">General Health</option>
            </select>
          </div>

          <div>
            <label className="text-zinc-400 font-bold block mb-1">Current Bodyweight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-zinc-400 font-bold block mb-1">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold flex items-center gap-2"
            >
              {isDarkTheme ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-300" />}
              <span>{isDarkTheme ? 'Theme: Dark' : 'Theme: Light'}</span>
            </button>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>

      {/* Account Deletion / Data Privacy Card */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-rose-500/20 space-y-3">
        <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
          <Trash2 className="w-4 h-4" />
          <span>Account Deletion & Data Privacy</span>
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          In compliance with modern digital privacy policies, you can request full erasure of all workout history, progress photos, and biometric logs from our servers at any time.
        </p>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to request data deletion?')) {
              showToast({
                type: 'info',
                title: 'Data Deletion Requested',
                message: 'Your request has been registered in audit logs.'
              });
            }
          }}
          className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold"
        >
          Request Data Deletion
        </button>
      </div>

    </div>
  );
}
