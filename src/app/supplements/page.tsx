'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Search,
  Filter,
  Scale,
  ExternalLink,
  ShieldCheck,
  Star,
  Check,
  Zap,
  Leaf,
  Plus
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SupplementItem } from '@/lib/types';

export default function SupplementsPage() {
  const { supplementCatalog, addToCompare, comparisonIds, user } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [budgetMax, setBudgetMax] = useState<number>(4000);
  const [vegetarianOnly, setVegetarianOnly] = useState(false);

  const categories = ['All', 'Whey Protein', 'Whey Isolate', 'Plant Protein', 'Creatine'];

  const filteredSupplements = supplementCatalog.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.flavors.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesBudget = Math.min(item.priceAmazon, item.priceFlipkart) <= budgetMax;
    const matchesVeg = !vegetarianOnly || item.isVegetarian;

    return matchesSearch && matchesCategory && matchesBudget && matchesVeg;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Verified Marketplace Integration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Protein Supplement Store & Discovery
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Live prices sourced from Amazon India and Flipkart. Transparent protein-per-rupee calculations so you never overpay for your gains.
          </p>
        </div>

        {/* Comparison Tray Bar */}
        <Link
          href="/compare"
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black flex items-center gap-2 shadow-lg shadow-emerald-500/20 self-start md:self-auto transition-all"
        >
          <Scale className="w-4 h-4" />
          <span>Compare Selected ({comparisonIds.length} / 4)</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand, product, or flavor (e.g. Biozyme, Isolate, Mango)..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Category Chips */}
          <div className="md:col-span-4 flex items-center gap-1 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-black'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Budget Filter */}
          <div className="md:col-span-3 flex items-center justify-end gap-3 text-xs">
            <span className="text-zinc-400 shrink-0">Max: ₹{budgetMax}</span>
            <input
              type="range"
              min="800"
              max="5000"
              step="100"
              value={budgetMax}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

        </div>
      </div>

      {/* Supplement Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSupplements.map((item) => {
          const inTray = comparisonIds.includes(item.id);
          const bestPrice = Math.min(item.priceAmazon, item.priceFlipkart);
          const bestSeller = item.priceAmazon <= item.priceFlipkart ? 'Amazon India' : 'Flipkart';
          const priceDiff = Math.abs(item.priceAmazon - item.priceFlipkart);
          const proteinPerRupee = Math.round(((item.proteinPerServingG * item.servingsCount) / bestPrice) * 100) / 100;
          const pricePerKg = Math.round(bestPrice / item.packSizeKg);

          return (
            <div
              key={item.id}
              className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 flex flex-col justify-between hover:border-zinc-700 transition-all group"
            >
              <div className="space-y-4">
                
                {/* Product Image & Badges */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Lab Tested 100% Genuine</span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[11px] font-bold text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Brand & Name */}
                <div>
                  <div className="text-[10px] uppercase font-bold text-zinc-400">{item.brand}</div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="text-xs text-zinc-400 mt-1">
                    {item.packSizeKg} kg Pack • {item.servingsCount} Servings • {item.proteinPerServingG}g Protein / scoop
                  </div>
                </div>

                {/* Live Marketplace Pricing Comparison */}
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
                      <div className="text-[10px] text-zinc-400">Amazon.in</div>
                      <div className="font-extrabold text-white">₹{item.priceAmazon}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
                      <div className="text-[10px] text-zinc-400">Flipkart</div>
                      <div className="font-extrabold text-white">₹{item.priceFlipkart}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-emerald-400 font-semibold">
                      Lowest: ₹{bestPrice} on {bestSeller}
                    </span>
                    <span className="text-zinc-400">
                      (Save ₹{priceDiff})
                    </span>
                  </div>
                </div>

                {/* Analytical Value Metrics */}
                <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-400 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
                  <div>
                    Price/kg: <strong className="text-white">₹{pricePerKg}</strong>
                  </div>
                  <div>
                    Yield: <strong className="text-emerald-400">{proteinPerRupee}g protein / ₹1</strong>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => addToCompare(item.id)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    inTray
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                  }`}
                >
                  {inTray ? 'In Comparison Tray ✓' : '+ Compare Specs'}
                </button>

                <div className="flex items-center gap-1">
                  <Link
                    href={item.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center gap-1"
                    title="Buy on Amazon India"
                  >
                    <span>Amazon</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </Link>

                  <Link
                    href={item.flipkartUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center gap-1"
                    title="Buy on Flipkart"
                  >
                    <span>Flipkart</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
