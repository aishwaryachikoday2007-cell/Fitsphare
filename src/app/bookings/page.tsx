'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Users,
  Clock,
  MapPin,
  CheckCircle2,
  Trash2,
  Plus,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { initialClasses } from '@/lib/mockData';
import { GroupClassItem } from '@/lib/types';

export default function BookingsPage() {
  const { bookings, cancelBooking, addBooking, user } = useApp();
  const [activeTab, setActiveTab] = useState<'myBookings' | 'classes'>('myBookings');
  const [classesList, setClassesList] = useState<GroupClassItem[]>(initialClasses);

  const handleBookClass = (cls: GroupClassItem) => {
    if (cls.bookedCount >= cls.capacity) {
      alert('This class is currently at full capacity. You have been added to the waitlist!');
      return;
    }

    // Add to bookings
    addBooking({
      userId: user.id,
      type: 'class',
      targetId: cls.id,
      targetName: cls.title,
      instructorName: cls.instructor,
      dateTime: cls.dayTime,
      slot: cls.timeSlot,
      status: 'Confirmed',
      price: 0
    });

    // Increment count
    setClassesList((prev) =>
      prev.map((c) => (c.id === cls.id ? { ...c, bookedCount: c.bookedCount + 1 } : c))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Scheduling & Studio Reservations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Bookings & Group Fitness Classes
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Manage your upcoming 1-on-1 personal trainer appointments and reserve seats in yoga, HIIT, spinning, and Zumba studios.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('myBookings')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'myBookings' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            My Appointments ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'classes' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Studio Classes
          </button>
        </div>
      </div>

      {/* Tab 1: My Appointments */}
      {activeTab === 'myBookings' && (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/40 rounded-3xl border border-dashed border-zinc-800 space-y-3">
              <Calendar className="w-10 h-10 text-zinc-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Upcoming Appointments</h3>
              <p className="text-xs text-zinc-400">
                You have no active sessions scheduled. Book a certified trainer or reserve a group class.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <Link
                  href="/trainers"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-black text-xs font-black"
                >
                  Find a Trainer
                </Link>
                <button
                  onClick={() => setActiveTab('classes')}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-white text-xs font-bold"
                >
                  Browse Classes
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 space-y-4 hover:border-zinc-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
                        {b.type === 'trainer' ? '1-on-1 Trainer' : 'Studio Class'}
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        {b.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">{b.targetName}</h3>
                      {b.instructorName && (
                        <div className="text-xs text-zinc-400 mt-0.5">
                          Coach: <strong className="text-zinc-200">{b.instructorName}</strong>
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1.5 text-xs text-zinc-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Date: {b.dateTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Time: {b.slot}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>FitSphere Arena, Main Floor</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-400">
                      {b.price > 0 ? `₹${b.price} (Paid)` : 'Included in Membership'}
                    </span>
                    <button
                      onClick={() => cancelBooking(b.id)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Group Classes Schedule */}
      {activeTab === 'classes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classesList.map((cls) => {
              const isFull = cls.bookedCount >= cls.capacity;
              const isAlreadyBooked = bookings.some(
                (b) => b.type === 'class' && b.targetId === cls.id
              );
              const seatsLeft = cls.capacity - cls.bookedCount;

              return (
                <div
                  key={cls.id}
                  className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 flex flex-col justify-between hover:border-zinc-700 transition-all space-y-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase">
                        {cls.category}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium">
                        Intensity: <strong className="text-white">{cls.difficulty}</strong>
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-white">{cls.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                        <span>Instructor: <strong className="text-zinc-200">{cls.instructor}</strong></span>
                        <span>•</span>
                        <span>Studio: {cls.room}</span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800">
                      {cls.description}
                    </p>

                    {/* Schedule and seats */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                        <div className="text-[10px] text-zinc-400 uppercase">Class Timing</div>
                        <div className="font-bold text-white mt-0.5">{cls.dayTime}</div>
                        <div className="text-[10px] text-emerald-400">{cls.timeSlot}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                        <div className="text-[10px] text-zinc-400 uppercase">Available Seats</div>
                        <div className="font-bold text-white mt-0.5">
                          {cls.bookedCount} / {cls.capacity} Booked
                        </div>
                        <div className="text-[10px] text-emerald-400">
                          {isFull ? 'Full (Waitlist)' : `${seatsLeft} seats remaining`}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-bold">Free for Pro & Elite Members</span>
                    
                    <button
                      onClick={() => handleBookClass(cls)}
                      disabled={isAlreadyBooked}
                      className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        isAlreadyBooked
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          : isFull
                          ? 'bg-amber-500 text-black hover:bg-amber-400'
                          : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
                      }`}
                    >
                      {isAlreadyBooked
                        ? 'Reserved ✓'
                        : isFull
                        ? 'Join Waitlist'
                        : 'Reserve Seat'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
