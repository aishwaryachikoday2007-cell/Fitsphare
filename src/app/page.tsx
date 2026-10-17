'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Dumbbell,
  Scan,
  Video,
  Utensils,
  ShoppingBag,
  Scale,
  CreditCard,
  Users,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Star,
  Check,
  ArrowRight,
  Flame,
  Activity,
  Award,
  Clock,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import {
  initialEquipment,
  initialTrainers,
  initialMembershipPlans,
  initialSupplements
} from '@/lib/mockData';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const { addToCompare, comparisonIds } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the AI Gym Equipment Recognition work?',
      a: 'Simply snap a photo using your smartphone or upload an image from your device. Our multi-modal vision engine analyzes the machine geometry, cables, and frame to identify the equipment, target muscles (primary & secondary), optimal posture, setup cues, safety precautions, and related demonstration videos.'
    },
    {
      q: 'Does the diet planner cater to Indian vegetarian and vegan diets?',
      a: 'Yes, absolutely! FitSphere AI is specifically calibrated with authentic high-protein Indian staples such as Paneer bhurji, Soya chunk curries (52% protein), Sattu energy shakes, Moong dal khichdi, Greek curd, and sprouted legumes, alongside traditional non-vegetarian options.'
    },
    {
      q: 'How are Amazon India and Flipkart supplement prices verified?',
      a: 'We track authorized product feeds and public seller listings for certified brands (MuscleBlaze, Optimum Nutrition, AS-IT-IS, Avvatar, Fast&Up, Wellcore). We calculate price per kg and protein per rupee transparently so you get the maximum value for your fitness budget.'
    },
    {
      q: 'Can I book personal trainers or reserve seats for group classes?',
      a: 'Yes. You can explore certified trainer profiles (ACE, CSCS, ISSA), check real-time available calendar slots, and confirm appointments with instant prevention of double bookings. Group classes like Sunrise Yoga, HIIT, and Zumba can also be reserved with live seat counters.'
    },
    {
      q: 'Can I switch between Member, Trainer, and Admin perspectives?',
      a: 'Yes! Use the role selector in the top navigation bar to test all user roles instantly without needing multiple logins.'
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
        {/* Ambient neon backdrop glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-lime-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Next-Generation AI Gym & Nutrition Ecosystem</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Train Smarter. <br />
              Eat Better. <br />
              <span className="text-gradient-neon">Get Stronger.</span>
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              FitSphere AI combines real-time gym equipment computer vision, personalized high-protein Indian diet planning, Amazon vs Flipkart supplement price comparison, and certified trainer scheduling in one sleek platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/membership"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-black font-black text-sm tracking-wide shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 group transition-all"
              >
                <span>Start Your Fitness Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/equipment-ai"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700/80 font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all"
              >
                <Scan className="w-4 h-4 text-emerald-400" />
                <span>Explore AI Features</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-800/80 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">50+</div>
                <div className="text-xs text-zinc-400 font-medium">Recognized Gym Machines</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">98.4%</div>
                <div className="text-xs text-zinc-400 font-medium">Vision Accuracy Rate</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">12,500+</div>
                <div className="text-xs text-zinc-400 font-medium">Active Club Members</div>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-emerald-500/30 via-zinc-800 to-zinc-900 shadow-2xl">
              <div className="rounded-[22px] bg-zinc-950 p-6 space-y-6">
                
                {/* Mock Equipment Scanner Preview */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-zinc-800 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
                    alt="Lat Pulldown Machine"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* Scanner overlay line animation */}
                  <div className="absolute inset-x-0 top-1/3 h-0.5 bg-emerald-400 shadow-[0_0_12px_#22c55e] animate-pulse" />

                  {/* Recognition Result Tag */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-zinc-900/95 border border-emerald-500/40 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-black text-white">Lat Pulldown Machine</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                        98.4% Match
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1 flex items-center justify-between">
                      <span>Targets: Latissimus Dorsi, Biceps</span>
                      <Link href="/equipment-ai" className="text-emerald-400 font-bold hover:underline">
                        View Technique →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Sub Features Grid in Card */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                    <div className="flex items-center gap-2 text-emerald-400 mb-1">
                      <Utensils className="w-4 h-4" />
                      <span className="text-xs font-bold">Indian Diet AI</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">160g+ Protein Indian vegetarian thali & macros calibrated.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                    <div className="flex items-center gap-2 text-lime-400 mb-1">
                      <Scale className="w-4 h-4" />
                      <span className="text-xs font-bold">Price Engine</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">Amazon vs Flipkart live ₹/gram comparison.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CORE PLATFORM PILLARS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            Engineered For Results
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Comprehensive Smart Fitness Architecture
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Every feature is designed to eliminate guesswork from your workouts, nutrition, and supplement decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Equipment AI */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Scan className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                AI Equipment Recognition
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Take a quick snap with your smartphone camera. FitSphere instantly reveals muscle anatomy targets, posture setups, safety precautions, and alternative exercises if the machine is occupied.
              </p>
            </div>
            <Link
              href="/equipment-ai"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 mt-6 hover:underline"
            >
              <span>Scan Equipment</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Exercise Library */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                Verified Exercise Video Library
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Step-by-step master demonstrations for every gym machine. Includes breathing cues, warm-up protocols, cool-down stretches, and zero-equipment bodyweight adaptations.
              </p>
            </div>
            <Link
              href="/exercises"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 mt-6 hover:underline"
            >
              <span>Watch Tutorials</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: Indian Nutrition Planner */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 group-hover:scale-110 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-lime-400 transition-colors">
                AI Indian Diet & Macro Planner
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Personalized meal plans built around affordable Indian foods like paneer, soya chunks, roasted chana, dal, and curd. Complete with weekly grocery shopping checklists and hydration tracking.
              </p>
            </div>
            <Link
              href="/nutrition"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-400 mt-6 hover:underline"
            >
              <span>Build Diet Plan</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 4: Supplement Comparison Engine */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Supplement Comparison Engine
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Side-by-side analysis for Amazon India and Flipkart protein powders. Compare price per kg, protein per rupee, third-party lab testing certifications, and verified ingredients.
              </p>
            </div>
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 mt-6 hover:underline"
            >
              <span>Compare Prices</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 5: Certified Trainers & Classes */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                Trainer Scheduling & Studios
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Connect with certified coaches (CSCS, ACE, ISSA). Reserve 1-on-1 sessions or join high-energy group fitness classes including Sunrise Yoga, HIIT Blast, and Zumba.
              </p>
            </div>
            <Link
              href="/trainers"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 mt-6 hover:underline"
            >
              <span>Find a Coach</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 6: Fitness Progress & PR Tracker */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Live Workout & Analytics Tracker
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Log live gym sets, reps, and weights with an automatic rest timer stopwatch. Track bodyweight trends, strength PR progression curves, and community challenge streaks.
              </p>
            </div>
            <Link
              href="/progress"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 mt-6 hover:underline"
            >
              <span>View Analytics</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. POPULAR GYM EQUIPMENT SHOWCASE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-900/40 border-y border-zinc-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Biomechanics Catalog</span>
              <h2 className="text-3xl font-black text-white mt-1">Featured Gym Equipment</h2>
            </div>
            <Link
              href="/equipment-ai"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              <span>Upload Machine Photo to Identify</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialEquipment.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden hover:border-emerald-500/50 transition-all flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-black uppercase text-emerald-400 border border-emerald-500/30">
                    {item.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{item.purpose}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.targetMuscles.map((m, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-zinc-400">
                      Difficulty: <strong className="text-white">{item.difficulty}</strong>
                    </span>
                    <Link
                      href={`/exercises`}
                      className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>Demo Video</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED TRAINERS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">World-Class Coaching</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">Certified Personal Trainers</h2>
            <p className="text-zinc-400 text-sm mt-1">Book 1-on-1 private coaching sessions with instant slot confirmation.</p>
          </div>
          <Link
            href="/trainers"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            <span>View All Trainers & Schedules</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialTrainers.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-zinc-900/70 border border-zinc-800 p-5 flex flex-col justify-between hover:border-zinc-700 transition-all group"
            >
              <div className="space-y-4">
                <div className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-black text-amber-400 border border-amber-400/30">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{t.rating}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {t.name}
                  </h3>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{t.experienceYears} Years Experience</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {t.specialization.slice(0, 2).map((s, i) => (
                      <span key={i} className="text-[9px] font-medium px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">Session</span>
                  <div className="text-xs font-extrabold text-white">₹{t.hourlyFee}/hr</div>
                </div>
                <Link
                  href={`/trainers`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 hover:text-black text-emerald-400 text-xs font-bold border border-emerald-500/30 transition-all"
                >
                  Book Slot
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PROTEIN SUPPLEMENTS & MARKETPLACE COMPARISON */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30 border-y border-zinc-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Value & Purity Engine</span>
              <h2 className="text-3xl font-black text-white mt-1">Amazon vs Flipkart Supplement Hub</h2>
              <p className="text-zinc-400 text-sm mt-1">
                Transparent price per kg and protein per rupee calculations on 100% genuine lab-certified brands.
              </p>
            </div>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              <span>Open Side-by-Side Comparison ({comparisonIds.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialSupplements.slice(0, 3).map((item) => {
              const inTray = comparisonIds.includes(item.id);
              const bestPrice = Math.min(item.priceAmazon, item.priceFlipkart);
              const bestStore = item.priceAmazon <= item.priceFlipkart ? 'Amazon India' : 'Flipkart';
              const proteinPerRupee = Math.round(((item.proteinPerServingG * item.servingsCount) / bestPrice) * 100) / 100;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-zinc-950 border border-zinc-800 p-5 flex flex-col justify-between hover:border-zinc-700 transition-all"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                        {item.brand}
                      </div>
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-zinc-300">
                        {item.proteinPerServingG}g Protein / Scoop
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white line-clamp-1">{item.name}</h3>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                        <div>
                          <div className="text-zinc-400">Amazon.in</div>
                          <div className="font-bold text-white">₹{item.priceAmazon}</div>
                        </div>
                        <div>
                          <div className="text-zinc-400">Flipkart</div>
                          <div className="font-bold text-white">₹{item.priceFlipkart}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-[11px] text-emerald-400 font-medium">
                        Best Value: ₹{bestPrice} on {bestStore} ({proteinPerRupee}g protein / ₹1)
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-zinc-900 flex items-center justify-between gap-2">
                    <button
                      onClick={() => addToCompare(item.id)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        inTray
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800'
                      }`}
                    >
                      {inTray ? 'In Comparison Tray ✓' : '+ Compare Specs'}
                    </button>
                    <Link
                      href={bestStore === 'Amazon India' ? item.amazonUrl : item.flipkartUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black transition-all"
                    >
                      Buy
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. MEMBERSHIP TIERS & PRICING */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Membership Plans</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Transparent Gym Memberships</h2>
          <p className="text-zinc-400 text-sm">
            Zero hidden maintenance fees. Cancel or switch tiers anytime from your member portal.
          </p>

          {/* Billing Switch */}
          <div className="inline-flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                billingCycle === 'annual' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="px-1.5 py-0.2 rounded bg-black/40 text-[9px] font-black uppercase text-lime-300">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialMembershipPlans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : Math.round(plan.annualPrice / 12);
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'bg-zinc-900 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20'
                    : 'bg-zinc-950 border border-zinc-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-wider shadow-lg">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-white">{plan.name}</h3>
                    <p className="text-xs text-zinc-400 mt-1 min-h-[36px]">{plan.tagline}</p>
                  </div>

                  <div className="py-2">
                    <span className="text-3xl font-black text-white">₹{price}</span>
                    <span className="text-xs text-zinc-400 font-medium"> / month</span>
                    {billingCycle === 'annual' && (
                      <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                        Billed annually (₹{plan.annualPrice}/yr)
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-zinc-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800">
                  <Link
                    href={`/membership?plan=${plan.id}&cycle=${billingCycle}`}
                    className={`w-full py-2.5 rounded-xl text-xs font-black tracking-wide flex items-center justify-center transition-all ${
                      plan.popular
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                    }`}
                  >
                    Select {plan.name}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS & SUCCESS STORIES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30 border-y border-zinc-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Real Results</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">Transformations Powered by FitSphere</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                &ldquo;As an Indian vegetarian, getting 140g protein daily without whey bloat always felt impossible. FitSphere AI calculated the exact daily balance of paneer, soya chunks, and curd that fit my calorie budget. Dropped 8 kg while adding 35 kg to my leg press!&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-black text-emerald-400 text-xs">
                  KD
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Karan Dave</div>
                  <div className="text-[10px] text-zinc-400">Software Engineer, Bangalore</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                &ldquo;Walking into a new gym used to be intimidating because I didn’t know how to set up the cable stations and pin-loaded machines. Pointing my phone camera and getting instant setup tips and videos saved me from looking lost.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center font-black text-blue-400 text-xs">
                  PS
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Pooja Sharma</div>
                  <div className="text-[10px] text-zinc-400">Marketing Lead, Mumbai</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                &ldquo;The Amazon vs Flipkart price comparator saved me ₹600 on my Optimum Nutrition whey tub last week alone! Plus booking my weekly sessions with Coach Vik directly in the app is totally seamless.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center font-black text-purple-400 text-xs">
                  AR
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Aniket Roy</div>
                  <div className="text-[10px] text-zinc-400">Powerlifting Athlete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Help & Support</span>
          <h2 className="text-3xl font-black text-white mt-1">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between text-sm font-bold text-white hover:text-emerald-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-emerald-400' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION BANNER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-12">
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-emerald-950 via-zinc-900 to-zinc-950 border border-emerald-500/30 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ready to Upgrade Your Gym Experience?
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Join thousands of athletes and beginners reaching their goals with FitSphere AI. Instant membership activation with digital QR check-in and 1-on-1 coach access.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/membership"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25"
              >
                Claim Your Membership Pass
              </Link>
              <Link
                href="/equipment-ai"
                className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold border border-zinc-700 transition-all"
              >
                Try Equipment Scanner
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
