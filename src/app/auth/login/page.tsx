'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dumbbell, Lock, Mail, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/lib/types';

export default function LoginPage() {
  const router = useRouter();
  const { switchRole, showToast } = useApp();
  const [email, setEmail] = useState('devansh.roy@fitsphere.ai');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole('member');
    router.push('/dashboard');
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    switchRole(role);
    if (role === 'trainer') router.push('/trainer/dashboard');
    else if (role === 'admin') router.push('/admin');
    else router.push('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-2xl backdrop-blur-xl">
        
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-lime-400 flex items-center justify-center text-black font-black">
              <Dumbbell className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-black text-white">FITSPHERE <span className="text-emerald-400">AI</span></span>
          </Link>
          <h2 className="text-2xl font-black text-white">Sign In to FitSphere</h2>
          <p className="text-xs text-zinc-400">
            Access your personalized workout programs and digital QR check-in pass.
          </p>
        </div>

        {/* Quick Demo Switcher */}
        <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
          <div className="text-[10px] font-bold uppercase text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fast Evaluator Demo Login:</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('member')}
              className="py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold"
            >
              Member
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('trainer')}
              className="py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[11px] font-bold"
            >
              Trainer
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[11px] font-bold"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="text-zinc-400 font-bold block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl pl-9 pr-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-400 font-bold block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl pl-9 pr-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 text-black font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <span>Sign In to Member Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-zinc-400 pt-2 border-t border-zinc-800">
          Don&apos;t have a membership yet?{' '}
          <Link href="/membership" className="text-emerald-400 font-bold hover:underline">
            Choose a Membership Tier
          </Link>
        </div>

      </div>
    </div>
  );
}
