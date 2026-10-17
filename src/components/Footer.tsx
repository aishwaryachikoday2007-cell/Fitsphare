import React from 'react';
import Link from 'next/link';
import { Dumbbell, ShieldCheck, Heart, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs">
      {/* Upper Footer: Main Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-lime-400 flex items-center justify-center text-black font-black">
                <Dumbbell className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                FITSPHERE <span className="text-emerald-400">AI</span>
              </span>
            </Link>
            <p className="text-zinc-400 leading-relaxed text-sm max-w-sm">
              The premier all-in-one smart gym platform. Combining computer vision equipment recognition, personalized Indian macro planning, live Amazon/Flipkart supplement comparisons, and 1-on-1 certified trainer bookings.
            </p>
            <div className="flex items-center gap-3 pt-2 text-zinc-400 text-xs">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Trainers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Made for Indian Fitness</span>
              </div>
            </div>
          </div>

          {/* Platform Exploration */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/equipment-ai" className="hover:text-emerald-400 transition-colors">
                  AI Equipment Vision
                </Link>
              </li>
              <li>
                <Link href="/exercises" className="hover:text-emerald-400 transition-colors">
                  Exercise Video Library
                </Link>
              </li>
              <li>
                <Link href="/workouts" className="hover:text-emerald-400 transition-colors">
                  Smart Workout Planner
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="hover:text-emerald-400 transition-colors">
                  AI Indian Diet Builder
                </Link>
              </li>
              <li>
                <Link href="/supplements" className="hover:text-emerald-400 transition-colors">
                  Protein Store Catalog
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-emerald-400 transition-colors">
                  Supplement Compare Engine
                </Link>
              </li>
            </ul>
          </div>

          {/* Gym & Club */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Gym Club</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/membership" className="hover:text-emerald-400 transition-colors">
                  Membership Plans & Passes
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="hover:text-emerald-400 transition-colors">
                  Personal Trainer Directory
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:text-emerald-400 transition-colors">
                  Group Classes & Studios
                </Link>
              </li>
              <li>
                <Link href="/progress" className="hover:text-emerald-400 transition-colors">
                  Fitness Analytics Tracker
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-emerald-400 transition-colors">
                  Challenges & Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Gym Location</h4>
            <div className="space-y-2 text-zinc-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>FitSphere Arena, Sector 44, Tech Boulevard, Bangalore, Karnataka - 560034</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 (080) 4123-9900</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@fitsphere.ai</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Open 24/7 for Elite Members</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Affiliate & Medical Disclaimers */}
      <div className="bg-zinc-900/60 border-t border-zinc-800/80 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3 text-[11px] text-zinc-400 leading-relaxed">
          <p>
            <strong className="text-zinc-300">Affiliate Disclosure:</strong> FitSphere AI participates in the Amazon Services LLC Associates Program and Flipkart Affiliate Program. When you purchase supplements through our verified comparison links, we may earn an affiliate commission at zero additional cost to you. Sourced prices and availability are updated periodically.
          </p>
          <p>
            <strong className="text-zinc-300">Health & Medical Disclaimer:</strong> The exercise routines, biomechanical equipment guides, and personalized Indian diet calculations provided by FitSphere AI are intended strictly for educational and athletic guidance. Always consult a qualified physician or registered dietitian before starting any strenuous exercise regime or altering your diet, especially if you have pre-existing cardiovascular, orthopedic, or metabolic conditions.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between border-t border-zinc-800 text-zinc-400 text-xs gap-2">
            <span>© 2026 FitSphere AI Technologies Inc. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-emerald-400">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-emerald-400">Terms of Service</Link>
              <Link href="/admin" className="hover:text-emerald-400 flex items-center gap-1">
                Admin Console <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
