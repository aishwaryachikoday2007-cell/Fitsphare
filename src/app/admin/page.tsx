'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Dumbbell,
  Calendar,
  Activity,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { initialEquipment } from '@/lib/mockData';

export default function AdminPage() {
  const { equipmentCatalog, addEquipment, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'equipment' | 'occupancy'>('overview');

  // New Equipment Modal
  const [newEquipName, setNewEquipName] = useState('');
  const [newEquipCategory, setNewEquipCategory] = useState<'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Cardio' | 'Functional'>('Back');
  const [newEquipPurpose, setNewEquipPurpose] = useState('');

  const [membersList, setMembersList] = useState([
    { id: 'usr-1', name: 'Devansh Roy', email: 'devansh.roy@fitsphere.ai', tier: 'FitSphere Pro', status: 'Active', joined: '2026-01-15' },
    { id: 'usr-2', name: 'Rhea Kapoor', email: 'rhea.k@fitsphere.ai', tier: 'Elite Athlete', status: 'Active', joined: '2026-02-10' },
    { id: 'usr-3', name: 'Arjun Mehra', email: 'arjun.m@fitsphere.ai', tier: 'Basic Access', status: 'Expiring Soon', joined: '2026-03-01' },
    { id: 'usr-4', name: 'Pooja Nair', email: 'pooja.n@fitsphere.ai', tier: 'FitSphere Pro', status: 'Active', joined: '2026-03-12' },
    { id: 'usr-5', name: 'Karan Dave', email: 'karan.d@fitsphere.ai', tier: 'Basic Access', status: 'Expired', joined: '2025-11-20' }
  ]);

  const handleCreateEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEquipName.trim()) return;

    addEquipment({
      id: `equip-${Date.now()}`,
      name: newEquipName.trim(),
      aliases: [newEquipName.trim()],
      category: newEquipCategory,
      targetMuscles: ['Target Muscle Group'],
      secondaryMuscles: ['Stabilizers'],
      difficulty: 'Intermediate',
      purpose: newEquipPurpose || 'General strength and athletic hypertrophy development.',
      benefits: ['Effective muscle isolation', 'Fixed track biomechanical safety'],
      setupSteps: ['Adjust seat height to match joint axis', 'Select appropriate pin stack'],
      postureGrip: 'Firm neutral grip; maintain upright spine and braced core.',
      commonMistakes: ['Using momentum', 'Cutting range of motion'],
      safetyPrecautions: ['Verify pin latch before lifting'],
      alternatives: ['Dumbbell Alternative'],
      videoEmbedUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc',
      imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
      confidenceSample: 98.0
    });

    setNewEquipName('');
    setNewEquipPurpose('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Platform Operations & Gym Administration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Administration Control Center
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Live turnstile occupancy, member roster management, AI vision equipment registry, and supplement feed monitoring.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'overview' ? 'bg-purple-500 text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('occupancy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'occupancy' ? 'bg-purple-500 text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sensors & Occupancy
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'members' ? 'bg-purple-500 text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Members ({membersList.length})
          </button>
          <button
            onClick={() => setActiveTab('equipment')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'equipment' ? 'bg-purple-500 text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Equipment Registry ({equipmentCatalog.length})
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 4 Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-zinc-400">Total Active Members</span>
              <div className="text-2xl font-black text-white">1,248</div>
              <div className="text-[11px] text-emerald-400 font-bold">+18 new this week</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-zinc-400">Monthly Recurring Revenue</span>
              <div className="text-2xl font-black text-white">₹34,82,000</div>
              <div className="text-[11px] text-emerald-400 font-bold">+12% vs last month</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-zinc-400">Live Gym Floor Occupancy</span>
              <div className="text-2xl font-black text-amber-400">64% Capacity</div>
              <div className="text-[11px] text-zinc-400">128 members checked in</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-zinc-400">AI Vision Scans Logged</span>
              <div className="text-2xl font-black text-purple-400">8,412</div>
              <div className="text-[11px] text-emerald-400 font-bold">98.4% success rate</div>
            </div>
          </div>

          {/* Quick System Health Box */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Integration & Feed Health Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Amazon India Affiliate Feed</div>
                  <div className="text-[10px] text-zinc-400">Refreshed 09:30 AM IST</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Flipkart Affiliate API</div>
                  <div className="text-[10px] text-zinc-400">Refreshed 09:30 AM IST</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Computer Vision Service</div>
                  <div className="text-[10px] text-zinc-400">Model: Gemini Vision + Local</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OCCUPANCY & SENSORS */}
      {activeTab === 'occupancy' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-white">
                  Real-Time Gym Floor Occupancy & Crowd Sensors
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Live readings from RFID turnstiles and overhead optical occupancy sensors.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-emerald-400">Live Reading: 128 / 200 Max</span>
              </div>
            </div>

            {/* Visual Occupancy Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-white">
                <span>Current Load: Moderate (64%)</span>
                <span>200 Person Fire Safety Limit</span>
              </div>
              <div className="w-full h-4 rounded-full bg-zinc-950 border border-zinc-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 w-[64%]" />
              </div>
            </div>

            {/* Peak Hours Forecast */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-center text-xs pt-4 border-t border-zinc-800">
              {[
                { time: '06 AM', pct: 40, busy: 'Light' },
                { time: '07 AM', pct: 85, busy: 'Peak' },
                { time: '09 AM', pct: 60, busy: 'Moderate' },
                { time: '12 PM', pct: 25, busy: 'Quiet' },
                { time: '04 PM', pct: 45, busy: 'Light' },
                { time: '06 PM', pct: 92, busy: 'Peak' },
                { time: '08 PM', pct: 75, busy: 'Busy' },
                { time: '10 PM', pct: 20, busy: 'Quiet' }
              ].map((slot) => (
                <div key={slot.time} className="p-2 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="font-mono text-zinc-400 text-[10px]">{slot.time}</div>
                  <div className="font-bold text-white mt-1">{slot.pct}%</div>
                  <div
                    className={`text-[9px] font-bold ${
                      slot.busy === 'Peak'
                        ? 'text-rose-400'
                        : slot.busy === 'Busy'
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {slot.busy}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MEMBERS ROSTER */}
      {activeTab === 'members' && (
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Registered Club Members
            </h3>
            <span className="text-xs text-zinc-400">{membersList.length} Accounts Listed</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-400 uppercase text-[10px]">
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Plan Tier</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Member Since</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {membersList.map((m) => (
                  <tr key={m.id} className="hover:bg-zinc-800/30">
                    <td className="p-3.5 font-bold text-white">{m.name}</td>
                    <td className="p-3.5 text-zinc-400">{m.email}</td>
                    <td className="p-3.5 text-zinc-300">{m.tier}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.status === 'Active'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : m.status === 'Expiring Soon'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-zinc-400">{m.joined}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() =>
                          showToast({
                            type: 'info',
                            message: `Renewed access voucher sent to ${m.email}.`
                          })
                        }
                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-bold"
                      >
                        Renew
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: EQUIPMENT REGISTRY */}
      {activeTab === 'equipment' && (
        <div className="space-y-6">
          {/* Add Machine Form */}
          <form
            onSubmit={handleCreateEquipment}
            className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4"
          >
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Register New Gym Machine into AI Vision Catalog</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <input
                type="text"
                placeholder="Machine Name (e.g. Standing T-Bar Row)"
                value={newEquipName}
                onChange={(e) => setNewEquipName(e.target.value)}
                className="bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white"
              />
              <select
                value={newEquipCategory}
                onChange={(e) => setNewEquipCategory(e.target.value as any)}
                className="bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white"
              >
                <option value="Back">Back</option>
                <option value="Chest">Chest</option>
                <option value="Legs">Legs</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Arms">Arms</option>
                <option value="Core">Core</option>
              </select>
              <button
                type="submit"
                disabled={!newEquipName.trim()}
                className="py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider disabled:opacity-40"
              >
                Add Machine to Database
              </button>
            </div>
          </form>

          {/* Catalog Listing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipmentCatalog.map((eq) => (
              <div
                key={eq.id}
                className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={eq.imageUrl} alt={eq.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <strong className="text-white block">{eq.name}</strong>
                    <span className="text-[10px] text-emerald-400">{eq.category} • {eq.difficulty}</span>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">ID: {eq.id}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
