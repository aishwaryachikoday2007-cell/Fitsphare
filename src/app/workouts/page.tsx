'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Dumbbell,
  Play,
  RotateCcw,
  Check,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  Flame,
  Plus,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '@/context/AppContext';
import { sampleWorkoutRoutine } from '@/lib/mockData';
import { WorkoutDay } from '@/lib/types';

export default function WorkoutsPage() {
  const { activeWorkoutRoutine, toggleExerciseSet, showToast } = useApp();
  const [selectedSplit, setSelectedSplit] = useState<'PPL' | 'UpperLower' | 'FullBody'>('PPL');
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [restSeconds, setRestSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerLeft, setTimerLeft] = useState(60);

  const activeDay = activeWorkoutRoutine[activeDayIndex] || activeWorkoutRoutine[0];

  // Rest Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerLeft > 0) {
      interval = setInterval(() => {
        setTimerLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      showToast({
        type: 'info',
        title: 'Rest Time Complete!',
        message: 'Get ready for your next set. Stay focused!'
      });
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerLeft, showToast]);

  const startTimer = (secs: number) => {
    setRestSeconds(secs);
    setTimerLeft(secs);
    setIsTimerRunning(true);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerLeft(restSeconds);
  };

  const handleSetToggle = (exerciseIdx: number, setIdx: number) => {
    toggleExerciseSet(activeDayIndex, exerciseIdx, setIdx);
    // Start rest timer automatically on set completion
    startTimer(60);

    // Check if whole day completed
    const day = activeWorkoutRoutine[activeDayIndex];
    const totalSets = day.exercises.flatMap((e) => e.loggedSets).length;
    const completedSets = day.exercises.flatMap((e) => e.loggedSets).filter((s) => s.completed).length + 1;

    if (completedSets === totalSets) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      showToast({
        type: 'success',
        title: 'Workout Crushed! 🏆',
        message: `You completed all sets in "${day.dayName}". Great job!`
      });
    }
  };

  // Calculate day completion progress
  const totalSets = activeDay?.exercises.flatMap((e) => e.loggedSets).length || 1;
  const completedSets = activeDay?.exercises.flatMap((e) => e.loggedSets).filter((s) => s.completed).length || 0;
  const progressPercent = Math.round((completedSets / totalSets) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Progressive Overload Periodization</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Daily Workout Routine Planner
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Execute and track your workouts in real time. Log your actual weights, repetitions, and take timed rest intervals between sets.
          </p>
        </div>

        {/* Training Split Selector */}
        <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800">
          <button
            onClick={() => setSelectedSplit('PPL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedSplit === 'PPL' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Push / Pull / Legs
          </button>
          <button
            onClick={() => setSelectedSplit('UpperLower')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedSplit === 'UpperLower' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Upper / Lower
          </button>
          <button
            onClick={() => setSelectedSplit('FullBody')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedSplit === 'FullBody' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Full Body 3x
          </button>
        </div>
      </div>

      {/* Routine Days Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {activeWorkoutRoutine.map((day, idx) => (
          <button
            key={idx}
            onClick={() => setActiveDayIndex(idx)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeDayIndex === idx
                ? 'bg-zinc-900 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
              Session {idx + 1} • {day.estimatedMinutes} Mins
            </div>
            <div className="text-sm font-black text-white">{day.dayName}</div>
            <div className="text-xs text-zinc-400 mt-1">{day.focus}</div>
          </button>
        ))}
      </div>

      {/* Main Grid: Active Workout Log (8 Cols) + Rest Timer & PR tracker (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Workout Log */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 space-y-6">
            
            {/* Session Status & Progress */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
              <div>
                <h2 className="text-xl font-black text-white">{activeDay.dayName}</h2>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Focus: <span className="text-zinc-200">{activeDay.focus}</span>
                </div>
              </div>

              {/* Progress pill */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs font-bold text-white">{completedSets} of {totalSets} Sets Completed</div>
                  <div className="text-[10px] text-zinc-400">{progressPercent}% session volume</div>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-zinc-800 flex items-center justify-center font-black text-xs text-emerald-400 bg-zinc-950">
                  {progressPercent}%
                </div>
              </div>
            </div>

            {/* Exercise List */}
            <div className="space-y-6">
              {activeDay.exercises.map((ex, exIdx) => (
                <div
                  key={ex.exerciseId}
                  className="rounded-xl bg-zinc-950 border border-zinc-800/80 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">{ex.exerciseName}</h3>
                      <div className="text-[11px] text-zinc-400">
                        Target: {ex.targetSets} Sets × {ex.targetReps} Reps
                      </div>
                    </div>
                    {ex.completed && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        Exercise Completed ✓
                      </span>
                    )}
                  </div>

                  {/* Sets table */}
                  <div className="space-y-1.5 pt-1">
                    <div className="grid grid-cols-12 text-[10px] uppercase font-bold text-zinc-400 px-3 pb-1">
                      <div className="col-span-2">Set</div>
                      <div className="col-span-4">Weight (kg)</div>
                      <div className="col-span-4">Reps</div>
                      <div className="col-span-2 text-right">Done</div>
                    </div>

                    {ex.loggedSets.map((s, sIdx) => (
                      <div
                        key={s.setNumber}
                        className={`grid grid-cols-12 items-center px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                          s.completed
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                            : 'bg-zinc-900 border border-zinc-800/80 text-zinc-300'
                        }`}
                      >
                        <div className="col-span-2 font-mono text-zinc-400">
                          #{s.setNumber}
                        </div>
                        <div className="col-span-4 flex items-center gap-1">
                          <input
                            type="number"
                            defaultValue={s.weightKg}
                            className="w-16 bg-zinc-950 border border-zinc-700/80 rounded px-2 py-1 text-xs text-white"
                          />
                          <span className="text-[10px] text-zinc-400">kg</span>
                        </div>
                        <div className="col-span-4 flex items-center gap-1">
                          <input
                            type="number"
                            defaultValue={s.reps}
                            className="w-14 bg-zinc-950 border border-zinc-700/80 rounded px-2 py-1 text-xs text-white"
                          />
                          <span className="text-[10px] text-zinc-400">reps</span>
                        </div>
                        <div className="col-span-2 text-right">
                          <button
                            onClick={() => handleSetToggle(exIdx, sIdx)}
                            className={`p-1.5 rounded-lg border transition-all ${
                              s.completed
                                ? 'bg-emerald-500 text-black border-emerald-500'
                                : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Sidebar: Rest Timer, Rest Cues & PRs */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Rest Stopwatch Widget */}
          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 space-y-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Interval Rest Timer</span>
            </h3>

            {/* Timer Display */}
            <div className="text-center py-4 bg-zinc-950 rounded-2xl border border-zinc-800">
              <div className="text-5xl font-black font-mono text-white tracking-widest">
                00:{timerLeft < 10 ? `0${timerLeft}` : timerLeft}
              </div>
              <div className="text-xs text-zinc-400 mt-2">
                {isTimerRunning ? 'Recovery in progress...' : 'Timer paused'}
              </div>
            </div>

            {/* Quick timer preset buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => startTimer(45)}
                className="py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold"
              >
                45s
              </button>
              <button
                onClick={() => startTimer(60)}
                className="py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold"
              >
                60s
              </button>
              <button
                onClick={() => startTimer(90)}
                className="py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold"
              >
                90s
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black"
              >
                {isTimerRunning ? 'Pause Rest' : 'Resume Timer'}
              </button>
              <button
                onClick={resetTimer}
                className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Today's Target Volume Box */}
          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Session Target Metrics</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-zinc-950 text-zinc-300">
                <span className="text-zinc-400">Total Exercises:</span>
                <span className="font-bold text-white">{activeDay.exercises.length} Exercises</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-zinc-950 text-zinc-300">
                <span className="text-zinc-400">Target Working Sets:</span>
                <span className="font-bold text-white">{totalSets} Sets</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-zinc-950 text-zinc-300">
                <span className="text-zinc-400">Rest Between Sets:</span>
                <span className="font-bold text-white">60-90 Seconds</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-zinc-950 text-zinc-300">
                <span className="text-zinc-400">Est. Calories Burned:</span>
                <span className="font-bold text-emerald-400">~380 kcal</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
