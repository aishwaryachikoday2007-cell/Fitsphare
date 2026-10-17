'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Dumbbell,
  Scan,
  Video,
  Calendar,
  Utensils,
  ShoppingBag,
  Scale,
  CreditCard,
  Users,
  LineChart,
  MessageSquare,
  ShieldAlert,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  UserCheck
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, switchRole, isDarkTheme, toggleTheme, comparisonIds } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Dumbbell },
    { href: '/equipment-ai', label: 'Equipment AI', icon: Scan, badge: 'AI' },
    { href: '/exercises', label: 'Exercises', icon: Video },
    { href: '/workouts', label: 'Workouts', icon: Calendar },
    { href: '/nutrition', label: 'Diet Planner', icon: Utensils },
    { href: '/supplements', label: 'Supplements', icon: ShoppingBag },
    { href: '/compare', label: 'Compare', icon: Scale, count: comparisonIds.length },
    { href: '/membership', label: 'Membership', icon: CreditCard },
    { href: '/trainers', label: 'Trainers', icon: Users },
    { href: '/bookings', label: 'Bookings', icon: Calendar },
    { href: '/progress', label: 'Progress', icon: LineChart },
    { href: '/community', label: 'Community', icon: MessageSquare }
  ];

  const roleLabels: Record<string, { label: string; color: string }> = {
    member: { label: 'Member', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    trainer: { label: 'Trainer', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    admin: { label: 'Admin', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    guest: { label: 'Guest', color: 'bg-zinc-700/40 text-zinc-300 border-zinc-600' }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-zinc-950/85 border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-green-500 to-lime-400 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5 h-5 text-black font-extrabold" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                FITSPHERE <span className="text-emerald-400 font-extrabold">AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Smart Gym & Fitness</span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Priority set) */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 8).map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-emerald-400 bg-emerald-500/10 font-bold border border-emerald-500/20'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider rounded bg-emerald-500 text-black">
                      {link.badge}
                    </span>
                  )}
                  {link.count !== undefined && link.count > 0 && (
                    <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* More dropdown for remaining desktop tabs */}
            <div className="relative group">
              <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/60 flex items-center gap-1">
                <span>More</span>
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 py-2 bg-zinc-900/95 border border-zinc-800 rounded-xl shadow-2xl backdrop-blur-xl hidden group-hover:block transition-all">
                {navLinks.slice(8).map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/80 transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Right Action Controls: Role Switcher, Theme Toggle, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border shadow-sm transition-all ${
                  roleLabels[role]?.color || roleLabels.member.color
                }`}
                title="Switch perspective between Member, Trainer, Admin, Guest"
              >
                <UserCheck className="w-3 h-3" />
                <span className="capitalize">{roleLabels[role]?.label || role}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {roleDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setRoleDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-52 py-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 backdrop-blur-xl">
                    <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400 border-b border-zinc-800">
                      Switch Active Role
                    </div>
                    <button
                      onClick={() => { switchRole('member'); setRoleDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-emerald-500/10 hover:text-emerald-400 flex items-center justify-between"
                    >
                      <span>🏋️ Member (Devansh)</span>
                      {role === 'member' && <span className="text-emerald-400">✓</span>}
                    </button>
                    <button
                      onClick={() => { switchRole('trainer'); setRoleDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-blue-500/10 hover:text-blue-400 flex items-center justify-between"
                    >
                      <span>🥊 Trainer (Vikram)</span>
                      {role === 'trainer' && <span className="text-blue-400">✓</span>}
                    </button>
                    <button
                      onClick={() => { switchRole('admin'); setRoleDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-purple-500/10 hover:text-purple-400 flex items-center justify-between"
                    >
                      <span>⚙️ Admin Dashboard</span>
                      {role === 'admin' && <span className="text-purple-400">✓</span>}
                    </button>
                    <button
                      onClick={() => { switchRole('guest'); setRoleDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 text-zinc-400 flex items-center justify-between"
                    >
                      <span>👀 Guest / Public</span>
                      {role === 'guest' && <span className="text-zinc-200">✓</span>}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
              title={isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDarkTheme ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-200" />}
            </button>

            {/* Direct Portal / Dashboard Link */}
            {role === 'trainer' ? (
              <Link
                href="/trainer/dashboard"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold hover:bg-blue-600/30 transition-all"
              >
                <span>Trainer Portal</span>
              </Link>
            ) : role === 'admin' ? (
              <Link
                href="/admin"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 text-xs font-bold hover:bg-purple-600/30 transition-all"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Admin Console</span>
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black tracking-wide shadow-md shadow-emerald-500/20 transition-all"
              >
                <span>Dashboard</span>
              </Link>
            )}

            {/* User Profile Avatar */}
            <Link href="/profile" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full border border-emerald-500/40 overflow-hidden relative group-hover:ring-2 ring-emerald-500 transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-zinc-800 bg-zinc-950/95 px-4 pt-3 pb-6 space-y-1 backdrop-blur-2xl">
          <div className="grid grid-cols-2 gap-1 mb-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-zinc-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-emerald-500 text-black text-xs font-black uppercase tracking-wider"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
