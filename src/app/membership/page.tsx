'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  ShieldCheck,
  Check,
  Sparkles,
  Calendar,
  Clock,
  Tag,
  Lock,
  ArrowRight,
  User,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '@/context/AppContext';
import { initialMembershipPlans } from '@/lib/mockData';
import { MembershipPlan } from '@/lib/types';

export default function MembershipPage() {
  const { user, updateUser, showToast } = useApp();
  
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<MembershipPlan | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'FIT20') {
      setAppliedDiscountPercent(20);
      showToast({
        type: 'success',
        title: 'Coupon Applied!',
        message: 'Promo code FIT20 applied! 20% discount added to your checkout.'
      });
    } else if (couponCode.trim().toUpperCase() === 'FIT50') {
      setAppliedDiscountPercent(50);
      showToast({
        type: 'success',
        title: 'VIP Coupon Applied!',
        message: 'Promo code FIT50 applied! 50% discount applied.'
      });
    } else {
      showToast({
        type: 'error',
        title: 'Invalid Coupon',
        message: 'Code not recognized. Try coupon code "FIT20".'
      });
    }
  };

  const calculateFinalPrice = (plan: MembershipPlan) => {
    let base = plan.monthlyPrice;
    if (billingCycle === 'quarterly') base = plan.quarterlyPrice;
    if (billingCycle === 'annual') base = plan.annualPrice;

    if (appliedDiscountPercent > 0) {
      return Math.round(base * (1 - appliedDiscountPercent / 100));
    }
    return base;
  };

  const handleExecutePayment = () => {
    if (!selectedPlanForCheckout) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      confetti({ particleCount: 90, spread: 60 });

      // Update user state
      const expiry = new Date();
      if (billingCycle === 'annual') expiry.setFullYear(expiry.getFullYear() + 1);
      else if (billingCycle === 'quarterly') expiry.setMonth(expiry.getMonth() + 3);
      else expiry.setMonth(expiry.getMonth() + 1);

      updateUser({
        membershipTier: selectedPlanForCheckout.name.includes('Pro')
          ? 'Premium'
          : selectedPlanForCheckout.name.includes('Elite')
          ? 'Elite'
          : selectedPlanForCheckout.name.includes('Training')
          ? 'Personal Training'
          : 'Basic',
        membershipStatus: 'Active',
        membershipExpiry: expiry.toISOString().split('T')[0]
      });

      showToast({
        type: 'success',
        title: 'Membership Activated!',
        message: `Welcome to ${selectedPlanForCheckout.name}! Your digital pass has been renewed.`
      });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Club Pass & Membership Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Gym Memberships & Digital Pass
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Choose your training tier. Instant digital QR activation, locker privileges, and 1-on-1 coach sessions.
          </p>
        </div>

        {/* Billing cycle tabs */}
        <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 self-start md:self-auto">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              billingCycle === 'monthly' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('quarterly')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              billingCycle === 'quarterly' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Quarterly (-10%)
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              billingCycle === 'annual' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Annual</span>
            <span className="px-1.5 py-0.2 rounded bg-black/40 text-[9px] font-black text-lime-300">
              -25%
            </span>
          </button>
        </div>
      </div>

      {/* Digital Membership Card Preview Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Card Info */}
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                FitSphere Digital ID Card
              </span>
              <span className="text-xs text-zinc-400 font-medium">Status: <strong className="text-emerald-400">{user.membershipStatus}</strong></span>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-white">{user.name}</h2>
              <div className="text-xs text-zinc-400">
                Tier: <strong className="text-white">{user.membershipTier} Pass</strong> • Member ID: <strong className="text-emerald-400 font-mono">{user.memberId}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase">Valid Until</div>
                <div className="font-bold text-white mt-0.5">{user.membershipExpiry}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase">Locker Pass</div>
                <div className="font-bold text-white mt-0.5">Assigned #L-42</div>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 col-span-2 sm:col-span-1">
                <div className="text-[10px] text-zinc-400 uppercase">Points Balance</div>
                <div className="font-bold text-emerald-400 mt-0.5">{user.points} pts</div>
              </div>
            </div>
          </div>

          {/* Live Check-in QR Code */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-zinc-950/80 rounded-2xl border border-zinc-800/80 text-center space-y-3">
            <div className="p-3 bg-white rounded-xl shadow-lg shadow-emerald-500/10">
              <QrCode className="w-28 h-28 text-black" />
            </div>
            <div className="text-[11px] text-zinc-400">
              Scan at FitSphere Turnstiles for 24/7 Access
            </div>
          </div>

        </div>
      </div>

      {/* Membership Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {initialMembershipPlans.map((plan) => {
          let price = plan.monthlyPrice;
          let suffix = '/ month';
          if (billingCycle === 'quarterly') {
            price = plan.quarterlyPrice;
            suffix = '/ quarter';
          } else if (billingCycle === 'annual') {
            price = plan.annualPrice;
            suffix = '/ year';
          }

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-zinc-900 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20'
                  : 'bg-zinc-950 border border-zinc-800'
              }`}
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-black text-white">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1 min-h-[36px]">{plan.tagline}</p>
                </div>

                <div className="py-2">
                  <span className="text-3xl font-black text-white">₹{price}</span>
                  <span className="text-xs text-zinc-400 font-medium">{suffix}</span>
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
                <button
                  onClick={() => {
                    setSelectedPlanForCheckout(plan);
                    setPaymentSuccess(false);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-black tracking-wide flex items-center justify-center transition-all ${
                    plan.popular
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}
                >
                  Join {plan.name}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Checkout & Payment Modal */}
      {selectedPlanForCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                  Secure Checkout
                </span>
                <h3 className="text-base font-black text-white">
                  {selectedPlanForCheckout.name} ({billingCycle})
                </h3>
              </div>
              <button
                onClick={() => setSelectedPlanForCheckout(null)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {paymentSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-white">Payment Received!</h4>
                <p className="text-xs text-zinc-300">
                  Your membership has been renewed. You can now use your updated QR code at the turnstile immediately.
                </p>
                <button
                  onClick={() => setSelectedPlanForCheckout(null)}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-black text-xs font-black uppercase"
                >
                  Close & View Pass
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                
                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon (e.g. FIT20)"
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl"
                  >
                    Apply
                  </button>
                </form>

                {/* Price Breakdown */}
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <div className="flex justify-between text-zinc-400">
                    <span>Base Subscription:</span>
                    <span className="text-white font-mono">
                      ₹{calculateFinalPrice(selectedPlanForCheckout) + (appliedDiscountPercent > 0 ? (selectedPlanForCheckout.monthlyPrice * appliedDiscountPercent) / 100 : 0)}
                    </span>
                  </div>
                  {appliedDiscountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount ({appliedDiscountPercent}%):</span>
                      <span className="font-mono">-₹{Math.round((selectedPlanForCheckout.monthlyPrice * appliedDiscountPercent) / 100)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-400">
                    <span>GST (18% inclusive):</span>
                    <span className="text-white font-mono">Included</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-800 flex justify-between font-bold text-white text-sm">
                    <span>Total Amount Payable:</span>
                    <span className="text-emerald-400 font-mono">₹{calculateFinalPrice(selectedPlanForCheckout)}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-zinc-400 uppercase">Payment Method:</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button type="button" className="p-2.5 rounded-xl bg-zinc-900 border border-emerald-500/50 text-white font-semibold text-center text-[11px]">
                      UPI / GPay
                    </button>
                    <button type="button" className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-center text-[11px]">
                      Credit/Debit
                    </button>
                    <button type="button" className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-center text-[11px]">
                      NetBanking
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleExecutePayment}
                  disabled={isProcessingPayment}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>
                    {isProcessingPayment ? 'Processing Secure Payment...' : `Pay ₹${calculateFinalPrice(selectedPlanForCheckout)} & Activate`}
                  </span>
                </button>

                <div className="text-center text-[10px] text-zinc-500">
                  256-Bit SSL Encrypted. Cancel or pause subscription anytime.
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
