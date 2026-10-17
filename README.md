# FitSphere AI — Smart Gym & Fitness Management Platform

> **Train Smarter. Eat Better. Get Stronger.**  
> A premium, full-stack, AI-powered gym ecosystem combining computer vision equipment recognition, personalized high-protein Indian diet planning, Amazon India & Flipkart supplement comparison, certified trainer scheduling, and live fitness tracking.

---

## 🌟 Key Features

### 1. 🤖 AI Gym Equipment Recognition (`/equipment-ai`)
- **Camera & Image Upload**: Snap live photos using your smartphone camera or upload any gym machine image.
- **Biomechanical Anatomy Cues**: Displays target muscles (Primary & Secondary), posture cues, bench/seat setup steps, and common form mistakes with safety precautions.
- **Machine Occupied?**: Recommends equipment alternatives and bodyweight substitutes.
- **Multi-Modal Vision Engine**: Powered by Google Gemini Vision API with offline fallback.

### 2. 🎥 Exercise Video Library (`/exercises`)
- Searchable directory categorized by muscle groups (Chest, Back, Legs, Arms, Shoulders) and experience level (Beginner, Intermediate, Advanced).
- Official video embeds with breathing techniques, warm-up guidance, cool-down protocols, and personal library bookmarks.

### 3. 🏋️ Daily Workout Routine Planner (`/workouts`)
- **Training Splits**: Push-Pull-Legs (PPL), Upper/Lower, and Full Body periodization.
- **Active Workout Logger**: Log actual weights and reps with an automatic rest-interval stopwatch (+45s, +60s, +90s).
- **Celebration Feedback**: Interactive Confetti burst upon completing all daily target sets!

### 4. 🥗 AI Diet & Nutrition Planner (`/nutrition`)
- **Personalized Preferences**: Configurable fitness goals (Hypertrophy, Fat Loss, General Health) and dietary styles (Vegetarian, Vegan, Eggetarian, Non-Vegetarian).
- **Affordable Indian Foods**: Specifically tailored with Indian staples like paneer, soya chunks (52% protein), yellow moong dal, roasted chana, sattu, dahi (curd), brown rice, and roti.
- **Hydration Tracker**: Log daily water intake with visual progress bars.
- **Interactive Grocery Checklist**: Auto-generates weekly shopping list with instant check-offs.

### 5. ⚖️ Protein Supplement Store & Comparison Engine (`/supplements` & `/compare`)
- **Multi-Store Comparison**: Real-time side-by-side comparison between **Amazon India** and **Flipkart**.
- **Objective Mathematical Formulas**:
  - Price per Kilogram ($\text{Price} / \text{Weight in kg}$)
  - Protein Yield per Rupee ($\text{Total Protein (g)} / \text{Price}$)
- Compare up to 4 supplements side-by-side with verified third-party lab testing badges, ingredient disclosures, and direct shopping links.

### 6. 💳 Gym Membership Management & Digital QR Card (`/membership`)
- **Membership Tiers**: Basic Access, FitSphere Pro, Elite Athlete, and 1-on-1 Personal Training Pro.
- **Billing Cycles**: Monthly, Quarterly (-10%), and Annual (-25% discount).
- **Digital Membership Pass**: Live Member ID card with dynamic QR code for turnstile check-in.
- **Secure Simulated Checkout**: Supports UPI/GPay, credit/debit cards, and coupon codes (e.g. `FIT20` for 20% off).

### 7. 🥊 Trainer Directory & Scheduling (`/trainers` & `/bookings`)
- **World-Class Coaches**: Certified trainers (CSCS, ACE, ISSA) with photos, hourly fees, languages, and ratings.
- **Real-Time Booking**: Interactive slot picker with double-booking prevention and instant confirmation notifications.
- **Studio Group Classes**: Reserve seats in Sunrise Power Yoga, HIIT Blast, Cycle Sprint Studio, and Bollywood Zumba.

### 8. 📈 Fitness Analytics & PR Tracker (`/progress`)
- **Interactive Recharts**: Visual charts for bodyweight progression and Big 3 strength curves (Bench, Squat, Deadlift).
- **Personal Records (PRs)**: Milestone logs and body circumference measurements.
- **Private Progress Photos**: Client-side photo journal with privacy deletion controls.

### 9. 💬 AI Fitness Coach Assistant (Global Floating Widget)
- Available on every page.
- Instant guidance on machine biomechanics, Indian high-protein substitutions, and workout split recommendations.

### 10. 👑 Multi-Role Portal Switching
- Fast one-click Role Switcher in the top navigation bar to test:
  - 🏋️ **Member** (Devansh Roy)
  - 🥊 **Trainer** (Vikramaditya Sharma) — `/trainer/dashboard`
  - ⚙️ **Administrator** — `/admin` (Live turnstile sensors, crowd occupancy, equipment registry)
  - 👀 **Public Guest**

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 with dark fitness theme (`#09090b`, `#121215`, neon green `#22c55e`, `#00ff88`)
- **Icons**: Lucide React
- **Data Visualizations**: Recharts
- **Celebration Effects**: Canvas Confetti
- **Computer Vision & Chat**: Google Gemini Generative AI / Vision API + Local Biomechanical Reasoning Engine

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.x or newer (Tested on Node v24.20.0)
- npm or pnpm

### 2. Installation
```bash
cd C:\Users\DV2-STUDENT\Documents\fitsphare
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
# Windows PowerShell
Copy-Item .env.example .env.local
```
*(Optional: Add your `GEMINI_API_KEY` in `.env.local` to connect real-time Google Gemini multi-modal vision).*

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Running Automated Verification Tests
```bash
npm test
```

### 6. Production Build
```bash
npm run build
npm start
```

---

## 📄 Legal Disclaimers

- **Affiliate Disclosure**: FitSphere AI participates in the Amazon Services LLC Associates Program and Flipkart Affiliate Program. When you purchase supplements through verified links, we may earn an affiliate commission at zero additional cost to you.
- **Medical Disclaimer**: Exercise recommendations, biomechanics cues, and nutritional estimates are provided for educational and athletic purposes. Consult a physician or registered dietitian before undertaking any strenuous exercise or radical dietary change.
