'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Star,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  Filter,
  X,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { initialTrainers } from '@/lib/mockData';
import { TrainerItem } from '@/lib/types';

export default function TrainersPage() {
  const { addBooking, bookings } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [selectedTrainerForBooking, setSelectedTrainerForBooking] = useState<TrainerItem | null>(null);
  
  // Slot booking state
  const [bookingDate, setBookingDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('');

  const specializations = [
    'All',
    'Hypertrophy',
    'Weight Loss',
    'Powerlifting',
    'Yoga & Mobility'
  ];

  const filteredTrainers = initialTrainers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.languages.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.bio.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpec =
      selectedSpecialization === 'All' ||
      t.specialization.some((s) => s.toLowerCase().includes(selectedSpecialization.toLowerCase()));

    return matchesSearch && matchesSpec;
  });

  const handleConfirmBooking = () => {
    if (!selectedTrainerForBooking || !selectedSlot) return;

    // Check for double booking
    const alreadyBooked = bookings.some(
      (b) =>
        b.type === 'trainer' &&
        b.targetId === selectedTrainerForBooking.id &&
        b.dateTime === bookingDate &&
        b.slot === selectedSlot
    );

    if (alreadyBooked) {
      alert('This slot is already booked for this date! Please choose another available time.');
      return;
    }

    addBooking({
      userId: 'usr-member-demo',
      type: 'trainer',
      targetId: selectedTrainerForBooking.id,
      targetName: `1-on-1 Coaching Session`,
      instructorName: selectedTrainerForBooking.name,
      dateTime: bookingDate,
      slot: selectedSlot,
      status: 'Confirmed',
      price: selectedTrainerForBooking.hourlyFee
    });

    setSelectedTrainerForBooking(null);
    setSelectedSlot('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Master Coach Roster</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Personal Trainer Directory & Scheduling
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Book 1-on-1 private gym sessions with certified biomechanists, nutritionists, and powerlifting coaches. Real-time calendar slot reservation.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by trainer name, language, or specialty..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Specialization Filter */}
          <div className="md:col-span-6 flex items-center gap-1 overflow-x-auto no-scrollbar">
            {specializations.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialization(spec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  selectedSpecialization === spec
                    ? 'bg-emerald-500 text-black'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Trainers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTrainers.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 flex flex-col justify-between hover:border-zinc-700 transition-all space-y-5 group"
          >
            <div className="space-y-4">
              
              {/* Profile Top Row */}
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {t.name}
                    </h3>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{t.rating}</span>
                      <span className="text-[10px] text-zinc-500">({t.reviewCount})</span>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-400 mt-0.5">
                    {t.experienceYears} Years Exp • Speaks: {t.languages.join(', ')}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {t.specialization.map((s, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-950 text-emerald-400 border border-zinc-800">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio & Approach */}
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800/80">
                {t.bio}
              </p>

              {/* Qualifications */}
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold text-zinc-400">Certifications:</div>
                <div className="flex flex-wrap gap-1.5">
                  {t.qualifications.map((q, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {q}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Booking Action */}
            <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-zinc-400 font-semibold">1-on-1 Rate</span>
                <div className="text-base font-black text-white">₹{t.hourlyFee} <span className="text-xs font-normal text-zinc-400">/ session</span></div>
              </div>

              <button
                onClick={() => {
                  setSelectedTrainerForBooking(t);
                  setSelectedSlot(t.availableSlots[0]);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black tracking-wide transition-all shadow-md shadow-emerald-500/20"
              >
                Schedule Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Slot Selection Modal */}
      {selectedTrainerForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-800 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedTrainerForBooking.photo}
                    alt={selectedTrainerForBooking.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">{selectedTrainerForBooking.name}</h3>
                  <div className="text-xs text-emerald-400 font-semibold">₹{selectedTrainerForBooking.hourlyFee} / 60-min session</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedTrainerForBooking(null)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Date Selection */}
              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Select Training Day:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Today', 'Tomorrow', 'This Saturday'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setBookingDate(d)}
                      className={`py-2 rounded-xl font-bold border transition-all ${
                        bookingDate === d
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Available Calendar Time Slots:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedTrainerForBooking.availableSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 rounded-xl font-mono text-center border transition-all ${
                          isSelected
                            ? 'bg-emerald-500 text-black border-emerald-500 font-black'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Booking Summary Box */}
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5 text-zinc-300">
                <div className="flex justify-between">
                  <span>Selected Date:</span>
                  <strong className="text-white">{bookingDate}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Selected Slot:</span>
                  <strong className="text-white">{selectedSlot || 'Select above'}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <strong className="text-white">FitSphere Arena — Personal Training Floor</strong>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmBooking}
                disabled={!selectedSlot}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-all disabled:opacity-40"
              >
                Confirm Appointment & Reserve
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
