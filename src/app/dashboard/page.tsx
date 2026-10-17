'use client';

import React from 'react';
import Link from 'next/link';
import {
  Dumbbell,
  Utensils,
  Calendar,
  CreditCard,
  Droplets,
  Scan,
  Video,
  Scale,
  Award,
  TrendingDown,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function MemberDashboardPage() {
  const { user, activeWorkoutRoutine, activeMealPlan, bookings, logWater, equipmentCatalog, exerciseCatalog } = useApp();

  const todayWorkout = activeWorkoutRoutine[0];
  const totalSets = todayWorkout?.exercises.flatMap((e) => e.loggedSets).length || 1;
  const completedSets = todayWorkout?.exercises.flatMap((e) => e.loggedSets).filter((s) => s.completed).length || 0;
  const workoutPercent = Math.round((completedSets / totalSets) * 100);

  const upcomingBooking = bookings[0];

  const savedEquipmentItems = equipmentCatalog.filter((item) =>
    user.savedEquipmentIds.includes(item.id)
  );

  const savedExercises = exerciseCatalog.filter((item) =>
    user.savedExerciseIds.includes(item.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{user.membershipTier} Member Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Welcome back, {user.name}! 💪
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg">
              Goal: <strong className="text-zinc-200">{user.fitnessGoal}</strong> • Current Streak: <strong className="text-amber-400">{user.streakDays} Days 🔥</strong> • Digital Pass: <strong className="text-emerald-400 font-mono">{user.memberId}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/workouts"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Start Today&apos;s Workout</span>
            </Link>
            <Link
              href="/equipment-ai"
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold border border-zinc-700 transition-all flex items-center gap-2"
            >
              <Scan className="w-4 h-4 text-emerald-400" />
              <span>Scan Machine</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary 4-Metric Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Workout Completion */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-bold uppercase tracking-wider">Today&apos;s Workout</span>
            <Dumbbell className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{workoutPercent}% Done</div>
          <div className="w-full h-2 rounded-full bg-zinc-950 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${workoutPercent}%` }}
            />
          </div>
          <div className="text-[10px] text-zinc-400">
            {completedSets} of {totalSets} working sets completed
          </div>
        </div>

        {/* Daily Indian Macros */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-bold uppercase tracking-wider">Protein Target</span>
            <Utensils className="w-4 h-4 text-lime-400" />
          </div>
          <div className="text-2xl font-black text-lime-400">{activeMealPlan.totalProtein}g</div>
          <div className="text-[11px] text-zinc-300">
            Calibrated: {activeMealPlan.totalCalories} kcal daily budget
          </div>
          <Link href="/nutrition" className="text-[10px] font-bold text-lime-400 hover:underline block">
            View Indian Meal Schedule →
          </Link>
        </div>

        {/* Hydration Tracker */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-bold uppercase tracking-wider">Water Intake</span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400 font-mono">
            {user.dailyWaterLoggedLiters}L / {user.dailyWaterTargetLiters}L
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => logWater(0.25)}
              className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold text-cyan-300"
            >
              +250ml
            </button>
            <button
              onClick={() => logWater(0.5)}
              className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold text-cyan-300"
            >
              +500ml
            </button>
          </div>
        </div>

        {/* Membership Status */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-bold uppercase tracking-wider">Club Access Pass</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-white">{user.membershipTier} Tier</div>
          <div className="text-[11px] text-emerald-400">
            Valid until {user.membershipExpiry}
          </div>
          <Link href="/membership" className="text-[10px] font-bold text-zinc-400 hover:text-white block">
            Manage or Renew Pass →
          </Link>
        </div>

      </div>

      {/* Main Dual Grid: Today's Schedule & Up Next (8 Cols) + Bookings & Saved (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Today's Workout Focus */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Today&apos;s Split
                </span>
                <h3 className="text-base font-black text-white">{todayWorkout.dayName}</h3>
                <p className="text-xs text-zinc-400">{todayWorkout.focus}</p>
              </div>
              <Link
                href="/workouts"
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <span>Live Tracker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {todayWorkout.exercises.slice(0, 4).map((ex, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{ex.exerciseName}</div>
                    <div className="text-[10px] text-zinc-400">
                      {ex.targetSets} Sets × {ex.targetReps}
                    </div>
                  </div>
                  {ex.completed ? (
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                      ✓
                    </span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-zinc-700" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Today's Nutrition Overview */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-lime-400 tracking-wider">
                  Nutritional Breakdown
                </span>
                <h3 className="text-base font-black text-white">Today&apos;s High-Protein Indian Diet</h3>
              </div>
              <Link
                href="/nutrition"
                className="text-xs text-lime-400 hover:underline font-bold"
              >
                Full Weekly Plan →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Breakfast</span>
                <div className="text-xs font-bold text-white truncate">{activeMealPlan.breakfast.title}</div>
                <div className="text-[10px] text-emerald-400">{activeMealPlan.breakfast.proteinG}g Protein</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Lunch</span>
                <div className="text-xs font-bold text-white truncate">{activeMealPlan.lunch.title}</div>
                <div className="text-[10px] text-emerald-400">{activeMealPlan.lunch.proteinG}g Protein</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Dinner</span>
                <div className="text-xs font-bold text-white truncate">{activeMealPlan.dinner.title}</div>
                <div className="text-[10px] text-emerald-400">{activeMealPlan.dinner.proteinG}g Protein</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Appointments & Saved Equipment (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Upcoming Appointment Card */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Next Upcoming Session</span>
            </h3>

            {upcomingBooking ? (
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase">
                    {upcomingBooking.type === 'trainer' ? '1-on-1 PT' : 'Studio Class'}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">{upcomingBooking.status}</span>
                </div>
                <div className="text-sm font-bold text-white">{upcomingBooking.targetName}</div>
                <div className="text-xs text-zinc-400">
                  {upcomingBooking.instructorName ? `Coach: ${upcomingBooking.instructorName}` : ''}
                </div>
                <div className="text-xs text-zinc-300 font-mono pt-1">
                  📅 {upcomingBooking.dateTime} ({upcomingBooking.slot})
                </div>
                <Link
                  href="/bookings"
                  className="text-xs text-blue-400 hover:underline font-bold block pt-1"
                >
                  Manage Appointments →
                </Link>
              </div>
            ) : (
              <div className="text-xs text-zinc-400 text-center py-4">
                No appointments booked for today.
              </div>
            )}
          </div>

          {/* Saved Equipment for Quick Scan */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-emerald-400" />
                <span>Saved Equipment Routine</span>
              </h3>
              <Link href="/equipment-ai" className="text-xs text-emerald-400 hover:underline">
                Scan +
              </Link>
            </div>

            <div className="space-y-2.5 text-xs">
              {savedEquipmentItems.slice(0, 3).map((eq) => (
                <div
                  key={eq.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={eq.imageUrl} alt={eq.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white truncate">{eq.name}</div>
                    <div className="text-[10px] text-zinc-400">{eq.targetMuscles.join(', ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
