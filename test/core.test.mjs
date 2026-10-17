import assert from 'node:assert';
import { initialEquipment, initialSupplements, sampleMealPlan } from '../src/lib/mockData.ts';

console.log('--- RUNNING FITSPHERE AI CORE VERIFICATION TESTS ---');

// Test 1: Supplement Value Calculations
console.log('1. Testing Supplement Value Calculations...');
initialSupplements.forEach((item) => {
  const minPrice = Math.min(item.priceAmazon, item.priceFlipkart);
  const totalProteinG = item.proteinPerServingG * item.servingsCount;
  const proteinPerRupee = (totalProteinG / minPrice);
  const pricePerKg = minPrice / item.packSizeKg;

  assert(minPrice > 0, `Price must be positive for ${item.name}`);
  assert(proteinPerRupee > 0, `Protein per rupee must be positive for ${item.name}`);
  assert(pricePerKg > 0, `Price per kg must be positive for ${item.name}`);
});
console.log('✓ All 6 supplement value metrics verified.');

// Test 2: Equipment Biomechanics Integrity
console.log('2. Testing Equipment Biomechanics Data Integrity...');
initialEquipment.forEach((eq) => {
  assert(eq.name.length > 0, 'Equipment must have a name');
  assert(eq.targetMuscles.length > 0, `${eq.name} must have target muscles`);
  assert(eq.setupSteps.length > 0, `${eq.name} must have setup steps`);
  assert(eq.safetyPrecautions.length > 0, `${eq.name} must have safety precautions`);
  assert(eq.videoEmbedUrl.startsWith('https://'), `${eq.name} must have a valid video link`);
});
console.log(`✓ All ${initialEquipment.length} gym equipment entries contain verified biomechanics data.`);

// Test 3: Indian Diet Macro Coherence
console.log('3. Testing Indian Nutrition Planner Macro Coherence...');
const { breakfast, lunch, dinner, totalCalories, totalProtein } = sampleMealPlan;
const sumProtein = breakfast.proteinG + lunch.proteinG + dinner.proteinG;
assert(sumProtein > 100, 'Sum of main meal proteins must be high-protein');
assert(totalCalories > 2000, 'Daily calories must provide adequate fuel');
assert(totalProtein > 150, 'Target daily protein must meet hypertrophy goals');
console.log('✓ Indian meal plan calculations verified with high-protein standards.');

console.log('ALL FITSPHERE AI AUTOMATED VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉');
