'use client';

import React, { useState } from 'react';
import {
  Utensils,
  Sparkles,
  Droplets,
  ShoppingCart,
  Check,
  RefreshCw,
  Plus,
  Info,
  Flame,
  Award,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { sampleMealPlan } from '@/lib/mockData';
import { DailyMealPlan } from '@/lib/types';

export default function NutritionPage() {
  const { activeMealPlan, updateMealPlan, user, logWater, showToast } = useApp();
  
  // Customization inputs
  const [goal, setGoal] = useState<'Muscle Gain' | 'Fat Loss' | 'General Health'>(user.fitnessGoal as 'Muscle Gain' | 'Fat Loss' | 'General Health');
  const [dietType, setDietType] = useState<'Vegetarian' | 'Vegan' | 'Eggetarian' | 'Non-Vegetarian'>(user.dietaryPreference);
  const [budgetTier, setBudgetTier] = useState<'Budget Friendly (Affordable Indian)' | 'Premium High-Protein'>('Budget Friendly (Affordable Indian)');
  const [isGenerating, setIsGenerating] = useState(false);

  // Grocery check state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleGrocery = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const groceryList = [
    'Rolled Oats (1 kg)',
    'Low-Fat Paneer (500g)',
    'Soya Chunks / Nutrela (1 kg box - ~₹120)',
    'Yellow Moong Dal (1 kg)',
    'Fresh Curd / Dahi (500g)',
    'Brown Rice or Multigrain Atta',
    'Roasted Chana with skin (500g)',
    'Eggs (Tray of 30) or Tofu',
    'Green Veggies (Broccoli, Spinach, Capsicum)',
    'Chia Seeds & Flaxseeds',
    'Whey Protein Tub (1 kg)'
  ];

  const handleRegeneratePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Calibrate macros based on goal
      let cal = 2450;
      let p = 165;
      let c = 260;
      let f = 65;

      if (goal === 'Fat Loss') {
        cal = 1850;
        p = 150;
        c = 170;
        f = 50;
      } else if (goal === 'General Health') {
        cal = 2100;
        p = 120;
        c = 240;
        f = 58;
      }

      const regenerated: DailyMealPlan = {
        ...sampleMealPlan,
        id: `plan-${Date.now()}`,
        dayName: `${goal} Indian Meal Plan (${dietType})`,
        totalCalories: cal,
        totalProtein: p,
        totalCarbs: c,
        totalFats: f
      };

      updateMealPlan(regenerated);
      setIsGenerating(false);
      showToast({
        type: 'success',
        title: 'Diet Plan Re-calibrated',
        message: `Generated personalized ${dietType} meal plan calibrated for ${goal}!`
      });
    }, 1200);
  };

  const mealSlots = [
    { label: 'Breakfast', data: activeMealPlan.breakfast, time: '08:00 AM' },
    { label: 'Morning Snack', data: activeMealPlan.morningSnack, time: '11:00 AM' },
    { label: 'Lunch', data: activeMealPlan.lunch, time: '01:30 PM' },
    { label: 'Pre-Workout Fuel', data: activeMealPlan.preWorkout, time: '04:30 PM' },
    { label: 'Post-Workout Shake', data: activeMealPlan.postWorkout, time: '06:45 PM' },
    { label: 'Dinner', data: activeMealPlan.dinner, time: '08:30 PM' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs font-bold mb-2">
            <Utensils className="w-3.5 h-3.5" />
            <span>Personalized Indian Sports Nutrition</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            AI Diet & Nutrition Planner
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Custom macro-calculated Indian meals using budget-friendly staples like paneer, dal, soya chunks, roasted chana, and curd.
          </p>
        </div>

        {/* Regenerate Button */}
        <button
          onClick={handleRegeneratePlan}
          disabled={isGenerating}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all self-start md:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Calibrating Plan...' : 'Regenerate Meal Plan'}</span>
        </button>
      </div>

      {/* Preferences Form Bar */}
      <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
            Fitness Goal:
          </label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as any)}
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="Muscle Gain">Muscle Gain (Hypertrophy Surplus)</option>
            <option value="Fat Loss">Fat Loss (Mild Caloric Deficit)</option>
            <option value="General Health">General Health & Vitality</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
            Dietary Style:
          </label>
          <select
            value={dietType}
            onChange={(e) => setDietType(e.target.value as any)}
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="Vegetarian">Pure Indian Vegetarian (Lacto)</option>
            <option value="Eggetarian">Eggetarian (Vegetarian + Eggs)</option>
            <option value="Non-Vegetarian">Non-Vegetarian (Chicken, Fish, Eggs)</option>
            <option value="Vegan">Vegan (Plant Based)</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
            Food Budget Tier:
          </label>
          <select
            value={budgetTier}
            onChange={(e) => setBudgetTier(e.target.value as any)}
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="Budget Friendly (Affordable Indian)">Budget Friendly (Soya, Dal, Chana, Curd)</option>
            <option value="Premium High-Protein">Premium (Exotic Whey, Salmon, Almonds)</option>
          </select>
        </div>
      </div>

      {/* Daily Macro Summary Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center">
          <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Total Calories</div>
          <div className="text-2xl font-black text-white mt-1">{activeMealPlan.totalCalories} kcal</div>
          <div className="text-[10px] text-zinc-400 mt-0.5">Estimated Daily Target</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-emerald-500/40 text-center bg-emerald-500/5">
          <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Protein Target</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">{activeMealPlan.totalProtein}g</div>
          <div className="text-[10px] text-emerald-400/80 mt-0.5">~2.0g per kg bodyweight</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center">
          <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Carbohydrates</div>
          <div className="text-2xl font-black text-white mt-1">{activeMealPlan.totalCarbs}g</div>
          <div className="text-[10px] text-zinc-400 mt-0.5">Sustained Glycogen Energy</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center">
          <div className="text-xs text-rose-400 font-bold uppercase tracking-wider">Healthy Fats</div>
          <div className="text-2xl font-black text-white mt-1">{activeMealPlan.totalFats}g</div>
          <div className="text-[10px] text-zinc-400 mt-0.5">Hormonal Balance & Joints</div>
        </div>
      </div>

      {/* Main Content Layout: Daily Meals (8 Cols) + Water Tracker & Grocery List (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Meal Cards (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-lg font-black text-white flex items-center justify-between">
            <span>Daily Schedule: {activeMealPlan.dayName}</span>
            <span className="text-xs text-zinc-400 font-normal">6 Balanced Feedings</span>
          </h2>

          <div className="space-y-4">
            {mealSlots.map((m, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 space-y-3 hover:border-zinc-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-black text-emerald-400">
                      {m.time}
                    </span>
                    <h3 className="text-sm font-bold text-white">{m.label}: {m.data.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-300">
                    <span className="text-emerald-400">{m.data.proteinG}g P</span>
                    <span>•</span>
                    <span>{m.data.carbsG}g C</span>
                    <span>•</span>
                    <span>{m.data.fatG}g F</span>
                    <span>•</span>
                    <span className="text-white font-bold">{m.data.calories} kcal</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">{m.data.description}</p>

                {/* Items chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {m.data.items.map((item, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-950 text-zinc-300 border border-zinc-800 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Budget-friendly Indian substitute hint */}
                {m.data.affordableIndianOptions && m.data.affordableIndianOptions.length > 0 && (
                  <div className="mt-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span>
                      <strong>Budget Indian Hack:</strong> {m.data.affordableIndianOptions[0]}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Medical Nutrition Disclaimer Alert */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-start gap-3 text-xs text-zinc-400 leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-200">Clinical Disclaimer:</strong> All nutritional values and caloric targets calculated by FitSphere AI are general sports nutrition estimates. They do not constitute individualized clinical dietary prescriptions. For diabetes, renal concerns, or specific medical conditions, always consult a registered clinical dietitian.
            </div>
          </div>
        </div>

        {/* Right Sidebar: Hydration Widget & Grocery Shopping List (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Hydration Tracker */}
          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span>Daily Hydration Goal</span>
              </h3>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {user.dailyWaterLoggedLiters}L / {user.dailyWaterTargetLiters}L
              </span>
            </div>

            {/* Visual water level bar */}
            <div className="w-full h-3 rounded-full bg-zinc-950 border border-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.round((user.dailyWaterLoggedLiters / user.dailyWaterTargetLiters) * 100))}%`
                }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={() => logWater(0.25)}
                className="py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-cyan-300 text-xs font-bold"
              >
                +250ml
              </button>
              <button
                onClick={() => logWater(0.5)}
                className="py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-cyan-300 text-xs font-bold"
              >
                +500ml
              </button>
              <button
                onClick={() => logWater(1.0)}
                className="py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-cyan-300 text-xs font-bold"
              >
                +1.0 Liter
              </button>
            </div>
          </div>

          {/* Grocery Shopping List */}
          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-emerald-400" />
              <span>Weekly Grocery Checklist</span>
            </h3>

            <div className="space-y-2 text-xs">
              {groceryList.map((item) => {
                const checked = !!checkedItems[item];
                return (
                  <div
                    key={item}
                    onClick={() => toggleGrocery(item)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${
                      checked
                        ? 'bg-emerald-500/10 text-emerald-400 line-through'
                        : 'bg-zinc-950 text-zinc-300 hover:bg-zinc-900 border border-zinc-800/80'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        checked
                          ? 'bg-emerald-500 border-emerald-500 text-black'
                          : 'border-zinc-700'
                      }`}
                    >
                      {checked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="flex-1">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
