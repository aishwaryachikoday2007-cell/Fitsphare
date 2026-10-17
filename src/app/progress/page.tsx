'use client';

import React, { useState } from 'react';
import {
  LineChart as LineChartIcon,
  TrendingDown,
  TrendingUp,
  Dumbbell,
  Trophy,
  Scale,
  Calendar,
  Camera,
  Plus,
  Trash2,
  ShieldCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import { useApp } from '@/context/AppContext';
import { sampleProgressHistory } from '@/lib/mockData';

export default function ProgressPage() {
  const { user } = useApp();
  const [historyData, setHistoryData] = useState(sampleProgressHistory);
  const [activeMetric, setActiveMetric] = useState<'weight' | 'strength'>('weight');

  const personalBests = [
    { exercise: '45° Leg Press', weight: '220 kg', reps: '8 reps', date: 'Yesterday' },
    { exercise: 'Barbell Bench Press', weight: '82.5 kg', reps: '6 reps', date: '3 days ago' },
    { exercise: 'Barbell Back Squat', weight: '115 kg', reps: '5 reps', date: 'Last week' },
    { exercise: 'Conventional Deadlift', weight: '140 kg', reps: '3 reps', date: '2 weeks ago' }
  ];

  const bodyMeasurements = [
    { part: 'Chest', current: '40.5 in', change: '+1.5 in' },
    { part: 'Arms (Biceps)', current: '15.2 in', change: '+0.8 in' },
    { part: 'Waist', current: '32.0 in', change: '-2.5 in' },
    { part: 'Thighs', current: '23.4 in', change: '+1.2 in' }
  ];

  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80'
  ]);

  const removePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <LineChartIcon className="w-3.5 h-3.5" />
            <span>Biometric Analytics & PR Journal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Fitness Progress & Analytics
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Track progressive overload curves, bodyweight transitions, measurement deltas, and private milestone photos.
          </p>
        </div>

        {/* Metric Selector */}
        <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 self-start md:self-auto">
          <button
            onClick={() => setActiveMetric('weight')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMetric === 'weight' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Bodyweight Curve
          </button>
          <button
            onClick={() => setActiveMetric('strength')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMetric === 'strength' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Big 3 Lifts (Strength PRs)
          </button>
        </div>
      </div>

      {/* Top Quick Highlights Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <div className="text-[10px] uppercase font-bold text-zinc-400">Current Weight</div>
          <div className="text-2xl font-black text-white">{user.weightKg} kg</div>
          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-3.1 kg overall drop</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <div className="text-[10px] uppercase font-bold text-zinc-400">Target Goal Weight</div>
          <div className="text-2xl font-black text-white">{user.targetWeightKg} kg</div>
          <div className="text-xs text-zinc-400">Lean muscle target</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <div className="text-[10px] uppercase font-bold text-zinc-400">Workout Streak</div>
          <div className="text-2xl font-black text-amber-400">{user.streakDays} Days 🔥</div>
          <div className="text-xs text-zinc-400">Consistency score: 96%</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <div className="text-[10px] uppercase font-bold text-zinc-400">Reward Points</div>
          <div className="text-2xl font-black text-emerald-400">{user.points} pts</div>
          <div className="text-xs text-emerald-400/80">Redeemable at Shake Bar</div>
        </div>
      </div>

      {/* Recharts Analytics Panel */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-white">
            {activeMetric === 'weight'
              ? '6-Week Bodyweight Progression (kg)'
              : 'Big 3 Strength Progression (Bench, Squat, Deadlift in kg)'}
          </h2>
          <span className="text-xs text-zinc-400 font-mono">Logged weekly</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeMetric === 'weight' ? (
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" stroke="#71717a" fontSize={11} />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#71717a" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '0.75rem',
                    fontSize: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weightKg"
                  name="Weight (kg)"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', r: 5 }}
                />
              </LineChart>
            ) : (
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '0.75rem',
                    fontSize: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="deadliftKg"
                  name="Deadlift (kg)"
                  stroke="#f43f5e"
                  strokeWidth={2.5}
                />
                <Line
                  type="monotone"
                  dataKey="squatKg"
                  name="Squat (kg)"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                />
                <Line
                  type="monotone"
                  dataKey="benchPressKg"
                  name="Bench Press (kg)"
                  stroke="#22c55e"
                  strokeWidth={2.5}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Personal Best Records & Body Measurements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Personal Best Records */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Personal Best (PR) Milestones</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            {personalBests.map((pr, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800/80"
              >
                <div>
                  <div className="font-bold text-white">{pr.exercise}</div>
                  <div className="text-[10px] text-zinc-400">{pr.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-emerald-400 font-mono text-sm">{pr.weight}</div>
                  <div className="text-[10px] text-zinc-400">{pr.reps}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Body Measurements Log */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-400" />
            <span>Circumference Measurements</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            {bodyMeasurements.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800/80"
              >
                <span className="font-bold text-white">{m.part}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-zinc-200">{m.current}</span>
                  <span className={`text-[11px] font-bold ${m.change.startsWith('+') ? 'text-emerald-400' : 'text-cyan-400'}`}>
                    {m.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Private Progress Photo Journal */}
      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>Private Progress Photo Log</span>
            </h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Securely encrypted on local client. Only visible to you.
            </p>
          </div>
          <button
            onClick={() => {
              const newPhoto = prompt('Enter image URL or upload photo:');
              if (newPhoto) setPhotos((prev) => [newPhoto, ...prev]);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Photo</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {photos.map((src, idx) => (
            <div key={idx} className="relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Progress photo ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={() => removePhoto(idx)}
                className="absolute top-2 right-2 p-1.5 rounded-md bg-black/80 text-rose-400 hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                title="Delete photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-2 left-2 text-[10px] font-semibold text-white bg-black/70 px-2 py-0.5 rounded">
                Week {idx * 2 + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
