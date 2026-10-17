'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Video,
  Search,
  Filter,
  Play,
  Bookmark,
  CheckCircle2,
  Wind,
  Flame,
  Snowflake,
  Dumbbell,
  Clock,
  X,
  Plus
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ExerciseItem } from '@/lib/types';

export default function ExercisesPage() {
  const { exerciseCatalog, user, toggleSaveExercise } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [activeExerciseModal, setActiveExerciseModal] = useState<ExerciseItem | null>(null);

  const muscleCategories = ['All', 'Back', 'Chest', 'Legs', 'Arms', 'Shoulders'];
  const difficultyLevels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredExercises = exerciseCatalog.filter((ex) => {
    const matchesSearch =
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.equipment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMuscle =
      selectedMuscle === 'All' || ex.muscleGroup.toLowerCase().includes(selectedMuscle.toLowerCase());

    const matchesLevel = selectedLevel === 'All' || ex.level === selectedLevel;

    return matchesSearch && matchesMuscle && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold mb-2">
            <Video className="w-3.5 h-3.5" />
            <span>Biomechanics & Movement Archive</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Exercise Video Library
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Master strict execution for gym machines and free weights. Each demonstration includes breathing cadences, warm-up guidance, and zero-equipment variations.
          </p>
        </div>

        <Link
          href="/equipment-ai"
          className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-bold flex items-center gap-2 self-start md:self-auto"
        >
          <span>Identify Machine First</span>
          <Dumbbell className="w-4 h-4 text-emerald-400" />
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercise by name, machine, or muscle (e.g. Lat, Chest, Row)..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Muscle Category Selector */}
          <div className="md:col-span-4 flex items-center gap-1 overflow-x-auto no-scrollbar">
            {muscleCategories.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMuscle(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  selectedMuscle === m
                    ? 'bg-emerald-500 text-black'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Difficulty Dropdown */}
          <div className="md:col-span-2">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-emerald-500"
            >
              {difficultyLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  Level: {lvl}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((ex) => {
          const isSaved = user.savedExerciseIds.includes(ex.id);
          return (
            <div
              key={ex.id}
              className="group rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail with Play Overlay */}
                <div
                  onClick={() => setActiveExerciseModal(ex)}
                  className="relative aspect-video overflow-hidden cursor-pointer bg-zinc-950 group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ex.thumbnail}
                    alt={ex.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-bold text-zinc-300 border border-zinc-700">
                    {ex.durationMin} mins
                  </div>

                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    {ex.level}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3
                      onClick={() => setActiveExerciseModal(ex)}
                      className="text-base font-bold text-white group-hover:text-emerald-400 cursor-pointer transition-colors"
                    >
                      {ex.title}
                    </h3>
                    <div className="text-xs text-zinc-400 mt-1">
                      Target: <strong className="text-zinc-200">{ex.muscleGroup}</strong> • {ex.equipment}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-zinc-400 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80">
                    <div>
                      Sets: <strong className="text-white">{ex.setsRecommended}</strong>
                    </div>
                    <div>•</div>
                    <div>
                      Reps: <strong className="text-white">{ex.repsRecommended}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-5 pt-0 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveExerciseModal(ex)}
                  className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-all text-center"
                >
                  Step-by-Step Cues
                </button>
                <button
                  onClick={() => toggleSaveExercise(ex.id)}
                  className={`p-2 rounded-xl border transition-all ${
                    isSaved
                      ? 'bg-emerald-500 text-black border-emerald-500'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                  title={isSaved ? 'Saved to library' : 'Save to library'}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-16 bg-zinc-900/40 rounded-2xl border border-dashed border-zinc-800">
          <p className="text-sm text-zinc-400">No exercises found matching your search filters.</p>
        </div>
      )}

      {/* Video Demonstration Modal */}
      {activeExerciseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                  {activeExerciseModal.level} • {activeExerciseModal.muscleGroup}
                </span>
                <h2 className="text-base sm:text-lg font-black text-white">{activeExerciseModal.title}</h2>
              </div>
              <button
                onClick={() => setActiveExerciseModal(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs">
              
              {/* Video Embed */}
              <div className="aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-black shadow-lg">
                <iframe
                  src={activeExerciseModal.videoEmbedUrl}
                  title={activeExerciseModal.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Step By Step Instructions */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Execution Checklist</span>
                </h3>
                <div className="space-y-2">
                  {activeExerciseModal.stepByStep.map((s, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-zinc-300 leading-normal">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Breathing & Warmup Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Warm-Up</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">{activeExerciseModal.warmUpAdvice}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Wind className="w-3.5 h-3.5" />
                    <span>Breathing Cue</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">{activeExerciseModal.breathingTechnique}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <Snowflake className="w-3.5 h-3.5" />
                    <span>Cool-Down</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">{activeExerciseModal.coolDownAdvice}</p>
                </div>
              </div>

              {/* Bodyweight Alternative */}
              {activeExerciseModal.bodyweightAlternative && (
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                  <h4 className="font-bold text-white uppercase text-[11px]">
                    No Machine Available? Equipment-Free Variation:
                  </h4>
                  <p className="text-zinc-300">{activeExerciseModal.bodyweightAlternative}</p>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between">
              <button
                onClick={() => toggleSaveExercise(activeExerciseModal.id)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold"
              >
                {user.savedExerciseIds.includes(activeExerciseModal.id) ? 'Saved in Library ✓' : 'Bookmark Exercise'}
              </button>
              <Link
                href="/workouts"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black"
              >
                Log into Routine
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
