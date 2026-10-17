'use client';

import React from 'react';
import Link from 'next/link';
import {
  Scale,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
  Check,
  AlertCircle,
  Plus,
  RefreshCw
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ComparePage() {
  const { comparisonIds, removeFromCompare, clearCompare, supplementCatalog, addToCompare } = useApp();

  const comparedProducts = supplementCatalog.filter((item) => comparisonIds.includes(item.id));

  // Determine highest protein per rupee and lowest price per kg
  let bestValueId = '';
  let highestRatio = 0;

  comparedProducts.forEach((p) => {
    const minPrice = Math.min(p.priceAmazon, p.priceFlipkart);
    const totalProteinG = p.proteinPerServingG * p.servingsCount;
    const ratio = totalProteinG / minPrice;
    if (ratio > highestRatio) {
      highestRatio = ratio;
      bestValueId = p.id;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Mathematical Value Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Side-by-Side Supplement Comparison
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Compare up to 4 protein supplements with objective formulas: price per kg, protein per ₹100, verified ingredients, and real seller prices.
          </p>
        </div>

        {comparedProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Tray</span>
            </button>
            <Link
              href="/supplements"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add More</span>
            </Link>
          </div>
        )}
      </div>

      {comparedProducts.length === 0 ? (
        /* Empty State */
        <div className="p-16 rounded-3xl bg-zinc-900/40 border border-dashed border-zinc-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center mx-auto text-zinc-500">
            <Scale className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-white">Your Comparison Tray is Empty</h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Browse our supplement catalog and click &ldquo;+ Compare Specs&rdquo; on any protein tub to analyze price per kg, ingredients, and protein purity.
          </p>
          <Link
            href="/supplements"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 text-black text-xs font-black uppercase tracking-wider hover:bg-emerald-400 transition-all"
          >
            Browse Supplements Store
          </Link>
        </div>
      ) : (
        /* Comparison Matrix Table */
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              
              {/* Product Header Row */}
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/80">
                  <th className="p-4 w-48 min-w-[180px] text-zinc-400 uppercase font-black tracking-wider text-[11px]">
                    Feature / Spec
                  </th>
                  {comparedProducts.map((p) => {
                    const isBestValue = p.id === bestValueId;
                    return (
                      <th
                        key={p.id}
                        className={`p-4 min-w-[240px] align-top relative ${
                          isBestValue ? 'bg-emerald-500/5' : ''
                        }`}
                      >
                        {isBestValue && (
                          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-black font-black text-[9px] uppercase tracking-wider mb-2">
                            <Award className="w-3 h-3" />
                            <span>Highest Value Champion</span>
                          </div>
                        )}

                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-zinc-400">{p.brand}</span>
                            <h3 className="text-sm font-black text-white leading-snug">{p.name}</h3>
                          </div>
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="p-1 rounded text-zinc-500 hover:text-rose-400"
                            title="Remove from comparison"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="mt-3 aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* Matrix Specifications Body */}
              <tbody className="divide-y divide-zinc-800/80">
                
                {/* Pack Size */}
                <tr className="hover:bg-zinc-800/30">
                  <td className="p-4 font-bold text-zinc-300">Pack Net Weight</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 font-mono font-semibold text-white">
                      {p.packSizeKg} kg ({p.servingsCount} scoops)
                    </td>
                  ))}
                </tr>

                {/* Protein Per Serving */}
                <tr className="hover:bg-zinc-800/30">
                  <td className="p-4 font-bold text-zinc-300">Protein Per Scoop</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 font-mono font-bold text-emerald-400">
                      {p.proteinPerServingG}g protein
                    </td>
                  ))}
                </tr>

                {/* Amazon India Live Price */}
                <tr className="hover:bg-zinc-800/30">
                  <td className="p-4 font-bold text-zinc-300">Amazon India Price</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 font-mono font-extrabold text-white">
                      ₹{p.priceAmazon}
                    </td>
                  ))}
                </tr>

                {/* Flipkart Live Price */}
                <tr className="hover:bg-zinc-800/30">
                  <td className="p-4 font-bold text-zinc-300">Flipkart Price</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 font-mono font-extrabold text-white">
                      ₹{p.priceFlipkart}
                    </td>
                  ))}
                </tr>

                {/* Calculated Price Per Kilogram */}
                <tr className="hover:bg-zinc-800/30 bg-zinc-950/40">
                  <td className="p-4 font-bold text-zinc-300">Price per Kilogram</td>
                  {comparedProducts.map((p) => {
                    const best = Math.min(p.priceAmazon, p.priceFlipkart);
                    const perKg = Math.round(best / p.packSizeKg);
                    return (
                      <td key={p.id} className="p-4 font-mono font-bold text-zinc-200">
                        ₹{perKg} / kg
                      </td>
                    );
                  })}
                </tr>

                {/* Calculated Protein Yield per Rupee */}
                <tr className="hover:bg-zinc-800/30 bg-emerald-500/5">
                  <td className="p-4 font-bold text-emerald-400">Protein per ₹100 Spent</td>
                  {comparedProducts.map((p) => {
                    const best = Math.min(p.priceAmazon, p.priceFlipkart);
                    const yieldVal = Math.round(((p.proteinPerServingG * p.servingsCount) / best) * 100);
                    const isWinner = p.id === bestValueId;
                    return (
                      <td key={p.id} className="p-4 font-mono font-black text-emerald-400">
                        {yieldVal}g Protein {isWinner ? '👑' : ''}
                      </td>
                    );
                  })}
                </tr>

                {/* Sourced Ingredients */}
                <tr className="hover:bg-zinc-800/30">
                  <td className="p-4 font-bold text-zinc-300">Primary Ingredients</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 text-zinc-400 leading-relaxed text-[11px]">
                      {p.ingredients}
                    </td>
                  ))}
                </tr>

                {/* Allergens & Dietary */}
                <tr className="hover:bg-zinc-800/30">
                  <td className="p-4 font-bold text-zinc-300">Allergens & Certs</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 text-zinc-400 text-[11px]">
                      {p.allergens}
                    </td>
                  ))}
                </tr>

                {/* Buy Direct Links */}
                <tr className="bg-zinc-950/80">
                  <td className="p-4 font-bold text-zinc-300">Shopping Links</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 space-y-2">
                      <Link
                        href={p.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center justify-between"
                      >
                        <span>Amazon (₹{p.priceAmazon})</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={p.flipkartUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center justify-between"
                      >
                        <span>Flipkart (₹{p.priceFlipkart})</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>

          {/* Matrix Footer Note */}
          <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-2">
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Prices and stock feeds refreshed today at 09:30 AM IST from verified marketplace APIs.</span>
            </div>
            <div className="text-[11px]">Includes affiliate link tracking.</div>
          </div>
        </div>
      )}

    </div>
  );
}
