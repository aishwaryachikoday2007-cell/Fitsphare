'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  Plus,
  Star,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function TrainerDashboardPage() {
  const { user, bookings, showToast } = useApp();

  const [availableSlots, setAvailableSlots] = useState([
    { time: '07:00 AM', active: true },
    { time: '09:00 AM', active: true },
    { time: '11:00 AM', active: false },
    { time: '05:00 PM', active: true },
    { time: '06:30 PM', active: true },
    { time: '08:00 PM', active: true }
  ]);

  const [clientRoster, setClientRoster] = useState([
    {
      name: 'Devansh Roy',
      goal: 'Muscle Gain (PPL)',
      tier: 'Premium Member',
      lastSession: 'Yesterday',
      notes: 'Working on knee stability on Leg Press. Good progress on bench arch.'
    },
    {
      name: 'Rhea Kapoor',
      goal: 'Athletic Conditioning',
      tier: 'Elite Member',
      lastSession: '3 days ago',
      notes: 'Pre-exhausting posterior delts before heavy compound rows.'
    },
    {
      name: 'Arjun Mehra',
      goal: 'Powerlifting Meet Prep',
      tier: 'Pro Member',
      lastSession: '5 days ago',
      notes: 'Calibrated deadlift opener to 140kg. Target 150kg next month.'
    }
  ]);

  const toggleSlot = (idx: number) => {
    setAvailableSlots((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, active: !s.active } : s))
    );
    showToast({
      type: 'info',
      message: 'Updated your calendar availability.'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-950/80 via-zinc-900 to-zinc-950 border border-blue-500/30 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/40">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Certified Master Coach Portal</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          Coach Console — {user.name}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
          Manage your daily 1-on-1 personal training roster, update client biomechanics notes, and control live calendar booking slots.
        </p>
      </div>

      {/* Grid: Schedule (8 Cols) + Availability & Quick Stats (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Client Roster & Upcoming Sessions (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Confirmed Sessions */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h2 className="text-base font-black text-white flex items-center justify-between">
              <span>Upcoming Client Appointments</span>
              <span className="text-xs text-blue-400 font-bold">{bookings.length} Booked</span>
            </h2>

            <div className="space-y-3">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-black text-[10px]">
                        {b.slot}
                      </span>
                      <strong className="text-white text-sm">Client: Devansh Roy</strong>
                    </div>
                    <div className="text-zinc-400">
                      Session: {b.targetName} • Date: {b.dateTime}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        showToast({
                          type: 'success',
                          title: 'Session Checked-in',
                          message: 'Marked Devansh Roy as present on the training floor.'
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400"
                    >
                      Start Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Client Roster with Progress Notes */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h2 className="text-base font-black text-white">Assigned Athletes & Biomechanics Notes</h2>

            <div className="space-y-3">
              {clientRoster.map((client, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-white text-sm">{client.name}</strong>
                      <span className="text-zinc-500 ml-2">({client.tier})</span>
                    </div>
                    <span className="text-[11px] text-zinc-400">Goal: {client.goal}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <strong className="text-blue-400 block mb-0.5">Trainer Notes:</strong>
                    {client.notes}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar: Availability Slot Toggles & Stats (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Availability Slot Manager */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Manage Booking Slots</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Toggle slots on or off. Disabled slots are immediately blocked in the member booking directory.
            </p>

            <div className="space-y-2 text-xs">
              {availableSlots.map((slot, idx) => (
                <div
                  key={slot.time}
                  onClick={() => toggleSlot(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border transition-all ${
                    slot.active
                      ? 'bg-zinc-950 border-emerald-500/40 text-white'
                      : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 line-through'
                  }`}
                >
                  <span className="font-mono font-bold">{slot.time}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      slot.active
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {slot.active ? 'Available' : 'Blocked'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Coach Performance Summary */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3 text-xs">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              <span>Coach Rating & Metrics</span>
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between p-2 rounded-lg bg-zinc-950 text-zinc-300">
                <span className="text-zinc-400">Member Rating:</span>
                <span className="font-bold text-amber-400">4.95 / 5.0 (142 reviews)</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-zinc-950 text-zinc-300">
                <span className="text-zinc-400">Monthly Completed:</span>
                <span className="font-bold text-white">48 Sessions</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-zinc-950 text-zinc-300">
                <span className="text-zinc-400">Hourly Rate:</span>
                <span className="font-bold text-emerald-400">₹1,200 / hr</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
