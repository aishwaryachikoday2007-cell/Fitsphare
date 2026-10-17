import {
  EquipmentItem,
  ExerciseItem,
  SupplementItem,
  TrainerItem,
  GroupClassItem,
  MembershipPlan,
  DailyMealPlan,
  WorkoutDay,
  FitnessChallenge,
  CommunityPost,
  ProgressMetric,
  UserProfile,
  BookingRecord
} from './types';

export const initialEquipment: EquipmentItem[] = [
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown Machine',
    aliases: ['Cable Pulldown', 'Lat Pull', 'Wide-Grip Pulldown'],
    category: 'Back',
    targetMuscles: ['Latissimus Dorsi', 'Teres Major', 'Biceps Brachii'],
    secondaryMuscles: ['Rhomboids', 'Middle and Lower Trapezius', 'Brachialis'],
    difficulty: 'Beginner',
    purpose: 'Build upper back width, enhance V-taper, and develop vertical pulling strength with full scapular retraction.',
    benefits: [
      'Accessible vertical pulling for all strength levels before full pull-ups',
      'Constant cable tension throughout entire range of motion',
      'Minimizes lower back strain compared to bent-over barbell rows',
      'Variable grip options (wide, close, neutral, reverse) for diverse fiber recruitment'
    ],
    setupSteps: [
      'Adjust thigh pad so thighs fit snugly without lifting during the pull',
      'Stand up to grip the bar wider than shoulder-width with an overhand grip',
      'Sit down securely, anchor your knees under the pad, and plant feet flat on the floor',
      'Lean back slightly (10-15 degrees) while maintaining a proud chest and tight core'
    ],
    postureGrip: 'Overhand false grip or standard closed grip; keep wrists straight, shoulders depressed away from ears, and lead the pull with your elbows drive downward.',
    commonMistakes: [
      'Leaning back excessively (>30 degrees) turning it into a horizontal row',
      'Yanking the weight down with body momentum instead of controlled lat engagement',
      'Pulling the bar behind the neck, which strains cervical spine and rotator cuff',
      'Letting the weight stack slam on the eccentric return'
    ],
    safetyPrecautions: [
      'Always pull the bar down to the upper chest/clavicle area only',
      'Ensure the thigh pad pin is securely locked into place before adding heavy weights',
      'Control the 2-3 second return to prevent sudden joint hyper-extension'
    ],
    alternatives: ['Pull-ups / Chin-ups', 'Resistance Band Lat Pulldown', 'Single-Arm Half-Kneeling Lat Pulldown'],
    videoEmbedUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    confidenceSample: 98.4
  },
  {
    id: 'cable-crossover',
    name: 'Cable Crossover / Functional Trainer',
    aliases: ['Dual Adjustable Pulley', 'Cable Station', 'Cable Fly Machine'],
    category: 'Chest',
    targetMuscles: ['Pectoralis Major (Sternal & Clavicular heads)'],
    secondaryMuscles: ['Anterior Deltoids', 'Biceps Short Head', 'Serratus Anterior'],
    difficulty: 'Intermediate',
    purpose: 'Isolate the pectoral muscles across all angles with continuous tension and peak contraction at adduction.',
    benefits: [
      'Continuous mechanical tension at peak contraction unlike free dumbbell flyes',
      'Multi-angle versatility: high-to-low (lower chest), mid-height (sternal), low-to-high (upper chest)',
      'Gentle on shoulder joints with independent natural movement paths',
      'High core activation in standing staggered stance'
    ],
    setupSteps: [
      'Position pulleys at upper notch (or desired height for target angle)',
      'Attach D-handles to each carabiner and select equal weight stacks',
      'Grasp both handles, take one step forward into a staggered stance for stability',
      'Maintain a slight forward torso lean, chest up, and slight bend in elbows'
    ],
    postureGrip: 'Semi-pronated or neutral grip; maintain fixed elbow flexion throughout the arc and imagine hugging a large barrel.',
    commonMistakes: [
      'Pressing the handles forward like a bench press instead of sweeping in an arc',
      'Allowing elbows to bend and extend during the repetition (turning into triceps pushdown)',
      'Letting shoulders shrug up or rotate inwards at maximum extension'
    ],
    safetyPrecautions: [
      'Step back gently before releasing weights to avoid shoulder strain',
      'Check carabiner latch locks before pulling heavy loads'
    ],
    alternatives: ['Dumbbell Chest Fly', 'Pec Deck Machine', 'Resistance Band Chest Hugs'],
    videoEmbedUrl: 'https://www.youtube.com/embed/taI4XduLp4M',
    imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
    confidenceSample: 96.2
  },
  {
    id: 'leg-press-45',
    name: '45-Degree Leg Press Machine',
    aliases: ['Incline Leg Press', 'Sled Leg Press'],
    category: 'Legs',
    targetMuscles: ['Quadriceps (Vastus Lateralis, Medialis, Intermedius, Rectus Femoris)'],
    secondaryMuscles: ['Gluteus Maximus', 'Hamstrings', 'Calves (Gastrocnemius)'],
    difficulty: 'Beginner',
    purpose: 'Heavy lower-body overload and hypertrophy with back support and minimal spinal loading.',
    benefits: [
      'Safely build maximum leg strength without lower back axial compression',
      'Foot placement flexibility: high/wide for glutes/hamstrings, low/narrow for quads',
      'Built-in safety stop handles for confidence on heavy drop sets'
    ],
    setupSteps: [
      'Adjust backrest angle to support lower back comfortably against lumbar pad',
      'Sit with hips wedged deep into the seat junction',
      'Place feet shoulder-width apart in the center of the platform',
      'Disengage the safety levers using side handles once sled is pushed up'
    ],
    postureGrip: 'Firmly grip safety handles throughout the set; press evenly through mid-foot and heel, keeping knees tracking inline with second toe.',
    commonMistakes: [
      'Locking knees out completely at top of movement (danger of hyperextension)',
      'Allowing lower back/pelvis to round off the seat at bottom depth (butt wink)',
      'Letting knees cave inwards (valgus collapse) under heavy load'
    ],
    safetyPrecautions: [
      'Never allow knees to lock out aggressively under heavy loads',
      'Set safety stopper pegs at appropriate height before loading maximum weight plates'
    ],
    alternatives: ['Barbell Back Squat', 'Goblet Squat', 'Bulgarian Split Squat'],
    videoEmbedUrl: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    confidenceSample: 97.9
  },
  {
    id: 'smith-machine',
    name: 'Smith Machine',
    aliases: ['Guided Barbell Rack', 'Fixed Track Squat Machine'],
    category: 'Functional',
    targetMuscles: ['Quadriceps', 'Pectorals', 'Deltoids', 'Glutes (depending on exercise)'],
    secondaryMuscles: ['Triceps', 'Core Stabilizers'],
    difficulty: 'Intermediate',
    purpose: 'Perform squats, presses, and lunges along a stabilized vertical or 7-degree fixed plane of motion with built-in safety hooks.',
    benefits: [
      'Solo training safety with instant twist-to-lock wrist hooks at any rep stage',
      'Focus strictly on targeted muscle groups without demanding excessive balance stabilization',
      'Excellent for calf raises, inverted rows, and controlled tempo bench presses'
    ],
    setupSteps: [
      'Position safety arrestor pins just below your lowest safe range of motion',
      'Center yourself under the bar with balanced grip and posture',
      'Rotate wrists to unhook the barbell catches from the guide rail pegs',
      'Complete controlled repetitions and re-rack by rotating wrists forward/backward into pegs'
    ],
    postureGrip: 'Even hand spacing; adjust foot position slightly forward during squats to accommodate the vertical track without shear knee stress.',
    commonMistakes: [
      'Using the exact same foot stance as free squats without adjusting for the fixed bar path',
      'Forgetting to set lower safety catches before working up to heavy lifts'
    ],
    safetyPrecautions: [
      'Double check that both barbell hook teeth are locked securely before releasing grip'
    ],
    alternatives: ['Power Rack Barbell Squat', 'Dumbbell Walking Lunges'],
    videoEmbedUrl: 'https://www.youtube.com/embed/V3a1t5g_R8U',
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    confidenceSample: 95.8
  },
  {
    id: 'pec-deck',
    name: 'Pec Deck / Rear Delt Machine',
    aliases: ['Chest Fly Machine', 'Butterfly Machine', 'Reverse Fly'],
    category: 'Chest',
    targetMuscles: ['Pectoralis Major (Sternal Head)', 'Posterior Deltoids (when reversed)'],
    secondaryMuscles: ['Anterior Deltoids', 'Rhomboids (reverse fly)'],
    difficulty: 'Beginner',
    purpose: 'Strict chest isolation and rear delt strengthening with zero wrist torque or stabilizer fatigue.',
    benefits: [
      'Strict path of motion preventing form breakdown under fatigue',
      'Direct resistance perpendicular to chest fibers at full stretch and contraction',
      'Dual functionality: face forward for chest fly, face backward for rear delt fly'
    ],
    setupSteps: [
      'Adjust seat height so handles align directly with mid-chest (nipple level)',
      'Adjust arm levers to comfortable stretch depth without straining anterior shoulder capsule',
      'Keep back flat against pad and feet firmly planted'
    ],
    postureGrip: 'Soft bend in elbows; lead with inner elbows squeezing inward together.',
    commonMistakes: [
      'Setting arms too far back causing acute shoulder capsule over-stretching',
      'Rounding upper shoulders forward to force handles together'
    ],
    safetyPrecautions: ['Use the foot assist lever (if equipped) to bring arms forward safely'],
    alternatives: ['Incline Dumbbell Fly', 'Cable Chest Crossover'],
    videoEmbedUrl: 'https://www.youtube.com/embed/eGjt4lk6g34',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    confidenceSample: 96.5
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row Machine',
    aliases: ['Low Cable Row', 'Seated Row Station'],
    category: 'Back',
    targetMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    secondaryMuscles: ['Erector Spinae', 'Biceps', 'Rear Delts'],
    difficulty: 'Beginner',
    purpose: 'Build back thickness, reinforce scapular retraction, and support upright spinal posture.',
    benefits: [
      'Builds dense mid-back muscles crucial for shoulder health and bench press stability',
      'Easily swap attachments: V-bar close grip, wide lat bar, rope, or single stirrup',
      'Continuous cable tension throughout concentric and eccentric contraction'
    ],
    setupSteps: [
      'Sit on bench and place feet on footrests with knees slightly bent (never locked)',
      'Reach forward to grab attachment while keeping flat spine and hinge at hips',
      'Slide back to starting position: upright torso, chest high, arms extended'
    ],
    postureGrip: 'Maintain neutral spine; pull handle towards belly button while squeezing shoulder blades back together.',
    commonMistakes: [
      'Rocking back and forth violently with lower back momentum',
      'Shrugging shoulders into ears instead of pulling downwards and back',
      'Rounding lower spine during reach phase'
    ],
    safetyPrecautions: ['Never round lower back when reaching for the handle or setting it down'],
    alternatives: ['Chest Supported T-Bar Row', 'Bent-Over Barbell Row', 'Single Arm Dumbbell Row'],
    videoEmbedUrl: 'https://www.youtube.com/embed/GZbfZ033f74',
    imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80',
    confidenceSample: 98.1
  }
];

export const initialExercises: ExerciseItem[] = [
  {
    id: 'ex-lat-pulldown',
    title: 'Wide-Grip Lat Pulldown',
    muscleGroup: 'Upper Back / Lats',
    equipment: 'Lat Pulldown Machine',
    level: 'Beginner',
    durationMin: 12,
    setsRecommended: '3-4 sets',
    repsRecommended: '10-12 reps',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    videoEmbedUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc',
    stepByStep: [
      'Grip the wide bar with palms facing forward slightly wider than shoulder-width.',
      'Sit down, securing thighs under pad; lean torso back 10-15 degrees.',
      'Inhale, retract scapulae downward, then pull bar down smoothly until it touches upper chest.',
      'Pause for 1 second squeezing lats; exhale as you control bar back up over 3 seconds.'
    ],
    warmUpAdvice: 'Perform 1 set of 15 reps with 40% working weight to warm up shoulder rotator cuffs and activate lats.',
    breathingTechnique: 'Exhale forcefully as you pull the bar down; inhale smoothly as the bar returns upward.',
    coolDownAdvice: 'Passive hang from pull-up bar for 30 seconds to decompress spine and stretch latissimus dorsi.',
    bodyweightAlternative: 'Pronated Pull-Ups or Inverted Bodyweight Rows under a sturdy bar.',
    relatedExerciseIds: ['ex-seated-cable-row', 'ex-cable-crossover']
  },
  {
    id: 'ex-seated-cable-row',
    title: 'Seated Cable Row with Neutral V-Grip',
    muscleGroup: 'Mid Back & Rhomboids',
    equipment: 'Seated Cable Row Station',
    level: 'Beginner',
    durationMin: 15,
    setsRecommended: '4 sets',
    repsRecommended: '8-12 reps',
    thumbnail: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=80',
    videoEmbedUrl: 'https://www.youtube.com/embed/GZbfZ033f74',
    stepByStep: [
      'Sit on bench, place feet securely on footpads with a soft bend in knees.',
      'Lean forward from hips with a neutral spine to grip the V-bar handle.',
      'Pull back until torso is perpendicular to legs; raise chest proud.',
      'Drive elbows straight back alongside ribs until handle grazes abdomen.',
      'Hold contraction for 1 second, then slowly return handle forward feeling the lat stretch.'
    ],
    warmUpAdvice: 'Cat-cow dynamic thoracic mobility and band pull-aparts for 2 minutes.',
    breathingTechnique: 'Inhale during extension forward; exhale steadily as you row back into mid-torso.',
    coolDownAdvice: 'Cross-body shoulder stretch and foam roller mid-back thoracic extension.',
    bodyweightAlternative: 'Suspension Trainer (TRX) Row or Table Inverted Row.',
    relatedExerciseIds: ['ex-lat-pulldown']
  },
  {
    id: 'ex-leg-press',
    title: '45-Degree Sled Leg Press',
    muscleGroup: 'Quadriceps & Glutes',
    equipment: '45-Degree Leg Press Machine',
    level: 'Beginner',
    durationMin: 18,
    setsRecommended: '4 sets',
    repsRecommended: '10-15 reps',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    videoEmbedUrl: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
    stepByStep: [
      'Sit deep in seat with lower back and hips firmly anchored against cushions.',
      'Place feet shoulder-width apart in middle of platform, toes pointing out 10 degrees.',
      'Push platform up slightly to unlock safety levers on both sides.',
      'Lower platform under control until knees reach 90 degrees without lower back peeling off.',
      'Drive platform back up through midfoot and heels, stopping just short of locking knees.'
    ],
    warmUpAdvice: '5 minutes on stationary bike followed by bodyweight air squats and ankle mobility circles.',
    breathingTechnique: 'Deep belly breath and brace core on descent; exhale forcefully past the sticking point on press.',
    coolDownAdvice: 'Standing quad stretch (heel to glute) and seated hamstring stretch for 45s each leg.',
    bodyweightAlternative: 'Walking Bodyweight Lunges or Bulgarian Split Squats using a chair/bench.',
    relatedExerciseIds: ['ex-pec-deck']
  },
  {
    id: 'ex-cable-crossover',
    title: 'Standing Cable Chest Fly',
    muscleGroup: 'Pectoralis Major',
    equipment: 'Cable Crossover Station',
    level: 'Intermediate',
    durationMin: 14,
    setsRecommended: '3-4 sets',
    repsRecommended: '12-15 reps',
    thumbnail: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80',
    videoEmbedUrl: 'https://www.youtube.com/embed/taI4XduLp4M',
    stepByStep: [
      'Set pulleys at shoulder or high level with single D-handles attached.',
      'Grip handles, step one foot forward into a solid staggered stance.',
      'Lean torso forward slightly with chest lifted high and elbows unlocked.',
      'Sweep hands forward and inward in a wide arc until hands meet in front of chest.',
      'Pause for a peak squeeze, then open arms under controlled resistance back to chest level.'
    ],
    warmUpAdvice: 'Arm circles and doorway pectoral stretch for 60 seconds.',
    breathingTechnique: 'Inhale deeply as arms open wide; exhale steadily during the converging squeeze.',
    coolDownAdvice: 'Corner wall stretch for anterior shoulders and pectorals.',
    bodyweightAlternative: 'Elevated Push-ups or Wide-Stance Deficit Push-ups.',
    relatedExerciseIds: ['ex-pec-deck']
  },
  {
    id: 'ex-pec-deck',
    title: 'Machine Chest Fly (Pec Deck)',
    muscleGroup: 'Inner & Mid Chest',
    equipment: 'Pec Deck Machine',
    level: 'Beginner',
    durationMin: 12,
    setsRecommended: '3 sets',
    repsRecommended: '12-15 reps',
    thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
    videoEmbedUrl: 'https://www.youtube.com/embed/eGjt4lk6g34',
    stepByStep: [
      'Adjust seat so handles are level with your mid-chest.',
      'Plant back and head firmly against backrest; feet flat on floor.',
      'Grasp handles with slight bend in elbows; brace abdominal core.',
      'Bring handles together in front of sternum, focusing on squeezing chest fibers.',
      'Slowly allow handles to return until you feel a gentle chest stretch without joint strain.'
    ],
    warmUpAdvice: 'Light band pull-aparts and light warmup set at 30% load.',
    breathingTechnique: 'Exhale on the concentric inward squeeze; inhale as weights return outward.',
    coolDownAdvice: 'Standing hands-behind-back chest expansion stretch.',
    bodyweightAlternative: 'Floor sliding towel push-up flyes.',
    relatedExerciseIds: ['ex-cable-crossover']
  }
];

export const initialSupplements: SupplementItem[] = [
  {
    id: 'mb-biozyme-perf',
    name: 'MuscleBlaze Biozyme Performance Whey',
    brand: 'MuscleBlaze',
    category: 'Whey Protein',
    flavors: ['Rich Chocolate', 'Magical Mango', 'Coffee', 'Kesar Kulfi', 'Blueberry'],
    packSizeKg: 1.0,
    servingsCount: 28,
    proteinPerServingG: 25.0,
    priceAmazon: 2499,
    priceFlipkart: 2399,
    amazonUrl: 'https://www.amazon.in/dp/B0829MMP8M?tag=fitsphere-21',
    flipkartUrl: 'https://www.flipkart.com/muscleblaze-biozyme-performance-whey/p/itm5b94f69165f91',
    ingredients: 'Whey Protein Concentrate (89.5%), Cocoa Powder, Nature Identical Flavours, Enhanced Absorption Formula (EAF®), Sweetener (INS 955)',
    allergens: 'Contains Milk and Soy derivatives. Gluten-free.',
    rating: 4.5,
    reviewsCount: 38420,
    imageUrl: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    labTested: true,
    lastUpdated: 'Today at 09:30 AM IST (Live Marketplace Feed)'
  },
  {
    id: 'on-gold-standard',
    name: 'Optimum Nutrition (ON) Gold Standard 100% Whey',
    brand: 'Optimum Nutrition',
    category: 'Whey Protein',
    flavors: ['Double Rich Chocolate', 'Delicious Strawberry', 'Extreme Milk Chocolate', 'Vanilla Ice Cream'],
    packSizeKg: 1.0,
    servingsCount: 33,
    proteinPerServingG: 24.0,
    priceAmazon: 3299,
    priceFlipkart: 3399,
    amazonUrl: 'https://www.amazon.in/dp/B000QSNZ5K?tag=fitsphere-21',
    flipkartUrl: 'https://www.flipkart.com/optimum-nutrition-gold-standard-100-whey/p/itmf3xhy63rhnmdf',
    ingredients: 'Protein Blend (Whey Protein Isolate, Whey Protein Concentrate, Hydrolyzed Whey Peptides), Lecithin, Natural and Artificial Flavors, Acesulfame Potassium',
    allergens: 'Contains Milk, Soy (Lecithin). Informed-Choice Certified.',
    rating: 4.6,
    reviewsCount: 61200,
    imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    labTested: true,
    lastUpdated: 'Today at 09:30 AM IST (Live Marketplace Feed)'
  },
  {
    id: 'as-it-is-isolate',
    name: 'AS-IT-IS Nutrition Whey Protein Isolate 90%',
    brand: 'AS-IT-IS Nutrition',
    category: 'Whey Isolate',
    flavors: ['Unflavoured / Pure Raw'],
    packSizeKg: 1.0,
    servingsCount: 33,
    proteinPerServingG: 27.0,
    priceAmazon: 2199,
    priceFlipkart: 2249,
    amazonUrl: 'https://www.amazon.in/dp/B0797DXV8B?tag=fitsphere-21',
    flipkartUrl: 'https://www.flipkart.com/as-it-is-nutrition-whey-protein-isolate-90/p/itmf87cf82404f65',
    ingredients: '100% Pure Whey Protein Isolate (Cold Processed Cross-Flow Micro-filtered), Zero Additives, Zero Flavors, Zero Sweeteners',
    allergens: 'Contains Dairy (Milk). Zero Soy, Zero Preservatives.',
    rating: 4.3,
    reviewsCount: 22400,
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    labTested: true,
    lastUpdated: 'Today at 09:30 AM IST (Live Marketplace Feed)'
  },
  {
    id: 'avvatar-whey',
    name: 'Avvatar 100% Whey Protein (Fresh Milk Sourced)',
    brand: 'Avvatar',
    category: 'Whey Protein',
    flavors: ['Belgian Chocolate', 'Cafe Latte', 'Malai Kulfi', 'Mango Rush'],
    packSizeKg: 1.0,
    servingsCount: 28,
    proteinPerServingG: 24.0,
    priceAmazon: 2299,
    priceFlipkart: 2349,
    amazonUrl: 'https://www.amazon.in/dp/B07M6T5DNY?tag=fitsphere-21',
    flipkartUrl: 'https://www.flipkart.com/avvatar-absolute-100-whey-protein/p/itmf8bf7hggd4c4f',
    ingredients: 'Whey Protein Blend (Whey Protein Concentrate, Whey Protein Isolate), Cocoa, Alkalized, Calcium Caseinate, Digestive Enzymes',
    allergens: 'Contains Milk, Lactose. Made directly from fresh cow milk within 24 hours.',
    rating: 4.4,
    reviewsCount: 16800,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    labTested: true,
    lastUpdated: 'Today at 09:30 AM IST (Live Marketplace Feed)'
  },
  {
    id: 'fastandup-plant',
    name: 'Fast&Up Plant Protein Isolate (Pea & Brown Rice)',
    brand: 'Fast&Up',
    category: 'Plant Protein',
    flavors: ['Rich Cocoa', 'Mango', 'Cafe Mocha'],
    packSizeKg: 1.0,
    servingsCount: 30,
    proteinPerServingG: 26.0,
    priceAmazon: 2399,
    priceFlipkart: 2499,
    amazonUrl: 'https://www.amazon.in/dp/B082L81H27?tag=fitsphere-21',
    flipkartUrl: 'https://www.flipkart.com/fast-up-plant-protein/p/itm5b93d7c32bf',
    ingredients: 'Yellow Pea Protein Isolate, Brown Rice Protein Isolate, Cocoa Powder, Beetroot Extract, Digestive Enzymes (Pepzyme AG™)',
    allergens: '100% Vegan, Dairy-Free, Lactose-Free, Soy-Free, Non-GMO.',
    rating: 4.3,
    reviewsCount: 11250,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    labTested: true,
    lastUpdated: 'Today at 09:30 AM IST (Live Marketplace Feed)'
  },
  {
    id: 'wellcore-creatine',
    name: 'Wellcore Micronised Pure Creatine Monohydrate',
    brand: 'Wellcore',
    category: 'Creatine',
    flavors: ['Unflavoured Pure Micronised'],
    packSizeKg: 0.25,
    servingsCount: 83,
    proteinPerServingG: 3.0,
    priceAmazon: 999,
    priceFlipkart: 949,
    amazonUrl: 'https://www.amazon.in/dp/B0BG8MD43D?tag=fitsphere-21',
    flipkartUrl: 'https://www.flipkart.com/wellcore-pure-micronised-creatine-monohydrate/p/itm0a273c52a787a',
    ingredients: '100% Pure Pharmaceutical Grade Micronised Creatine Monohydrate (Mesh 200)',
    allergens: 'Free of all known allergens. Zero sugar, zero calories.',
    rating: 4.7,
    reviewsCount: 29500,
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    labTested: true,
    lastUpdated: 'Today at 09:30 AM IST (Live Marketplace Feed)'
  }
];

export const initialTrainers: TrainerItem[] = [
  {
    id: 'trainer-vikram',
    name: 'Vikramaditya "Vik" Sharma',
    photo: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80',
    specialization: ['Hypertrophy & Bodybuilding', 'Strength & Conditioning', 'Contest Prep'],
    qualifications: ['CSCS Certified Strength Coach', 'ACE Master Trainer', 'Sports Nutritionist (ISSA)'],
    experienceYears: 9,
    languages: ['English', 'Hindi', 'Punjabi'],
    bio: 'Former national athlete and bodybuilding coach. Specializes in progressive overload periodization, bio-mechanics correction, and lean muscle mass development without joint injury.',
    approach: 'Science-backed resistance training combined with strict form feedback, RPE tracking, and realistic nutrition protocols tailored to Indian lifestyle.',
    hourlyFee: 1200,
    rating: 4.95,
    reviewCount: 142,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableSlots: ['07:00 AM', '09:00 AM', '11:00 AM', '05:00 PM', '06:30 PM', '08:00 PM'],
    email: 'vikram.sharma@fitsphere.ai'
  },
  {
    id: 'trainer-ananya',
    name: 'Ananya Deshmukh',
    photo: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    specialization: ['Weight Loss & Fat Loss', 'Functional Mobility', 'Kettlebell Athletics'],
    qualifications: ['ACSM Certified Personal Trainer', 'FMS Level 2 Specialist', 'CrossFit Level 1'],
    experienceYears: 7,
    languages: ['English', 'Hindi', 'Marathi'],
    bio: 'Passionate about helping working professionals shed body fat, boost metabolic health, and reverse postural desk fatigue through energizing functional sessions.',
    approach: 'High energy metabolic conditioning, compound movement mastery, and sustainable habit coaching that fits demanding corporate workdays.',
    hourlyFee: 1100,
    rating: 4.92,
    reviewCount: 98,
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
    availableSlots: ['06:30 AM', '08:00 AM', '10:00 AM', '04:30 PM', '06:00 PM', '07:30 PM'],
    email: 'ananya.deshmukh@fitsphere.ai'
  },
  {
    id: 'trainer-rohit',
    name: 'Rohit "The Beast" Verma',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    specialization: ['Powerlifting', 'Olympic Weightlifting', 'Injury Rehabilitation'],
    qualifications: ['NSCA-CPT', 'USAW Sports Performance Coach', 'BPT (Physiotherapy)'],
    experienceYears: 11,
    languages: ['English', 'Hindi'],
    bio: 'Dual-certified physiotherapist and powerlifting coach. Teaches you how to squat, bench, and deadlift pain-free while recovering from back or knee discomfort.',
    approach: 'Biomechanics analysis via slow-motion video, corrective rehabilitation drills, and calibrated bar velocity training.',
    hourlyFee: 1500,
    rating: 4.98,
    reviewCount: 180,
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday', 'Sunday'],
    availableSlots: ['07:30 AM', '09:30 AM', '04:00 PM', '05:30 PM', '07:00 PM'],
    email: 'rohit.verma@fitsphere.ai'
  },
  {
    id: 'trainer-sneha',
    name: 'Sneha Patel',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    specialization: ['Yoga & Ashtanga Vinyasa', 'Flexibility & Mobility', 'Breathwork & Stress Management'],
    qualifications: ['RYT 500 Certified Yoga Master', 'Sound Therapy Practitioner', 'Ayurvedic Wellness Consultant'],
    experienceYears: 8,
    languages: ['English', 'Hindi', 'Gujarati'],
    bio: 'Blends ancient Hatha/Vinyasa traditions with modern athletic mobility. Helps gym-goers loosen stiff hips, lengthen tight hamstrings, and lower cortisol levels.',
    approach: 'Mind-muscle synchrony, anatomical spinal alignment, somatic breathing, and restorative mobility flows for peak recovery.',
    hourlyFee: 950,
    rating: 4.97,
    reviewCount: 114,
    availableDays: ['Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availableSlots: ['06:00 AM', '07:30 AM', '09:00 AM', '05:00 PM', '06:30 PM'],
    email: 'sneha.patel@fitsphere.ai'
  }
];

export const initialClasses: GroupClassItem[] = [
  {
    id: 'class-power-yoga',
    title: 'Sunrise Power Yoga & Mobility',
    instructor: 'Sneha Patel',
    instructorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    category: 'Yoga & Mobility',
    dayTime: 'Mon, Wed, Fri at 06:30 AM',
    timeSlot: '06:30 AM - 07:30 AM',
    durationMin: 60,
    capacity: 25,
    bookedCount: 19,
    difficulty: 'All Levels',
    room: 'Zen Studio 1',
    description: 'Dynamic Vinyasa flow designed to open tight thoracic spine, mobilize hip flexors, strengthen core, and boost mental clarity before work.'
  },
  {
    id: 'class-hiit-blast',
    title: 'HIIT Afterburn & Tabata Blast',
    instructor: 'Ananya Deshmukh',
    instructorPhoto: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    category: 'HIIT & Cardio',
    dayTime: 'Tue, Thu, Sat at 07:00 AM',
    timeSlot: '07:00 AM - 07:45 AM',
    durationMin: 45,
    capacity: 20,
    bookedCount: 17,
    difficulty: 'High Intensity',
    room: 'Cross-Training Arena',
    description: 'Electrifying interval stations combining battle ropes, sled pushes, kettlebell snatches, and plyometrics to ignite metabolism for 24+ hours.'
  },
  {
    id: 'class-spinning',
    title: 'Rythm Cycle & Sprint Studio',
    instructor: 'Vikramaditya Sharma',
    instructorPhoto: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80',
    category: 'Spinning',
    dayTime: 'Mon, Wed, Fri at 06:00 PM',
    timeSlot: '06:00 PM - 06:50 PM',
    durationMin: 50,
    capacity: 22,
    bookedCount: 21,
    difficulty: 'Intermediate',
    room: 'Cycle Arena 2',
    description: 'High-octane indoor cycling set to synchronized neon lighting and bass-heavy EDM drops. Builds unmatched cardiovascular stamina and quad tone.'
  },
  {
    id: 'class-zumba-cardio',
    title: 'Bollywood & Latin Dance Zumba',
    instructor: 'Pooja Nair',
    instructorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    category: 'Zumba',
    dayTime: 'Tue, Thu, Sat at 06:30 PM',
    timeSlot: '06:30 PM - 07:30 PM',
    durationMin: 60,
    capacity: 30,
    bookedCount: 26,
    difficulty: 'All Levels',
    room: 'Aerobics Studio 3',
    description: 'High calorie-torching dance celebration fusing Bollywood beats with Latin rhythms. Burn up to 600 calories while having the time of your life.'
  }
];

export const initialMembershipPlans: MembershipPlan[] = [
  {
    id: 'plan-basic',
    name: 'Basic Access',
    tagline: 'Ideal for independent gym goers who need core gym floor access.',
    monthlyPrice: 1499,
    quarterlyPrice: 3999,
    annualPrice: 13999,
    features: [
      'Full Gym Floor & Free Weights Access',
      'Cardio & Machine Zone Access',
      'Locker room & Shower Facilities',
      'FitSphere Mobile App Access',
      '1 Free Body Composition Scan per Month'
    ]
  },
  {
    id: 'plan-premium',
    name: 'FitSphere Pro',
    tagline: 'Our most popular all-inclusive membership for dedicated fitness lovers.',
    monthlyPrice: 2799,
    quarterlyPrice: 7499,
    annualPrice: 24999,
    popular: true,
    highlightColor: '#22c55e',
    features: [
      'Everything in Basic Access',
      'Unlimited Group Classes (Yoga, HIIT, Zumba, Spinning)',
      'AI Gym Equipment Recognition (Unlimited Image Scans)',
      'Personalized AI Diet & Nutrition Planner with Indian Meals',
      'Sauna, Steam & Recovery Lounge Access',
      'Free Guest Passes (2 per month)',
      'Discounts at In-House FitSphere Protein Smoothie Bar'
    ]
  },
  {
    id: 'plan-elite',
    name: 'Elite Athlete Club',
    tagline: 'VIP access with guaranteed peak-time lockers and dedicated sports coaching.',
    monthlyPrice: 4499,
    quarterlyPrice: 11999,
    annualPrice: 39999,
    features: [
      'Everything in FitSphere Pro',
      '2 Monthly 1-on-1 Personal Trainer Consultations',
      'Priority Group Class Booking & Front-Row Bike Reservations',
      'Private VIP Locker with Laundry Service',
      'Monthly InBody 770 Comprehensive DEXA Biomarker Scan',
      'Unlimited Towel Service & HydroMassage bed sessions',
      'Direct WhatsApp Line to Head Strength Coach'
    ]
  },
  {
    id: 'plan-pt-pro',
    name: '1-on-1 Personal Training Tier',
    tagline: 'Maximum accountability with 12 customized monthly sessions.',
    monthlyPrice: 8999,
    quarterlyPrice: 23999,
    annualPrice: 79999,
    features: [
      '12 Dedicated 1-on-1 Personal Training Sessions per Month',
      'Customized Weekly Macro & Grocery Adjustment by Sports Nutritionist',
      'Includes Full FitSphere Pro All-Access Membership',
      'Daily Workout Tracking & Form Video Review in App',
      'Guaranteed Results Periodization Roadmap'
    ]
  }
];

export const sampleMealPlan: DailyMealPlan = {
  id: 'daily-plan-indian-muscle',
  dayName: 'High Protein Indian Muscle Building Day',
  breakfast: {
    title: 'High Protein Masala Oats & Paneer Scramble',
    description: 'Wholesome oats cooked with turmeric, cumin, tomatoes, accompanied by 100g fresh spiced paneer bhurji.',
    items: ['Rolled Oats (60g)', 'Low-Fat Cow Milk Paneer (100g)', 'Chopped veggies (onion, tomato, capsicum)', 'Chia seeds (10g)'],
    calories: 520,
    proteinG: 32,
    carbsG: 55,
    fatG: 18,
    affordableIndianOptions: ['Replace paneer with 3 whole boiled eggs + 2 egg whites for budget']
  },
  morningSnack: {
    title: 'Roasted Chana & Fruit Fuel',
    description: 'Crunchy dry-roasted Bengal gram paired with an Indian banana or seasonal pomegranate seeds.',
    items: ['Roasted Chana with skin (50g)', '1 medium banana', 'Green tea with lemon'],
    calories: 260,
    proteinG: 12,
    carbsG: 46,
    fatG: 4,
    affordableIndianOptions: ['Sattu drink (roasted gram flour mixed in chilled water with black salt & roasted jeera)']
  },
  lunch: {
    title: 'High Protein Soya-Curd Thali with Brown Rice & Dal',
    description: 'Nutrient-rich bowl with soya chunks masala curry, yellow moong dal tadka, fresh curd, and cucumber salad.',
    items: ['Soya Chunks (50g dry weight)', 'Moong Dal (1 medium katori / 150g cooked)', 'Brown Rice or 2 Multigrain Rotis', 'Fresh Low-fat Curd (150g)', 'Green salad with lemon'],
    calories: 680,
    proteinG: 48,
    carbsG: 82,
    fatG: 14,
    affordableIndianOptions: ['Soya chunks are one of India’s most economical proteins (~₹40/kg yields 52% protein)']
  },
  preWorkout: {
    title: 'Pre-Workout Energy Boost',
    description: 'Easily digestible carbohydrates with a cup of strong black filter coffee 40 minutes before lifting.',
    items: ['2 Brown bread slices with 1 tbsp peanut butter', '1 Black coffee (no sugar)', 'A pinch of pink Himalayan rock salt in water'],
    calories: 240,
    proteinG: 8,
    carbsG: 32,
    fatG: 9
  },
  postWorkout: {
    title: 'Rapid Recovery Whey Shake',
    description: 'Fast-digesting whey protein isolate with water or toned milk, kickstarting muscle protein synthesis.',
    items: ['1 Scoop Whey Protein (25g protein)', 'Chilled water (300ml)', '1 Apple or 4 Dates'],
    calories: 220,
    proteinG: 26,
    carbsG: 24,
    fatG: 2,
    affordableIndianOptions: ['4 boiled egg whites + 1 glass sattu buttermilk if whey is not available']
  },
  dinner: {
    title: 'Grilled Paneer / Chicken Tikka Bowl with Mixed Veggies',
    description: 'Marinated paneer cubes (or grilled chicken breast for non-vegetarians) in curd and tandoori spices with sautéed broccoli and capsicum.',
    items: ['Paneer or Chicken Breast (150g)', 'Sautéed capsicum, onions, beans, and spinach', '1 Bajra or Whole Wheat Roti', 'Mint curd chutney'],
    calories: 490,
    proteinG: 38,
    carbsG: 28,
    fatG: 21,
    affordableIndianOptions: ['Boiled rajma or chickpea (chhole) chaat seasoned with lemon and chaat masala']
  },
  totalCalories: 2410,
  totalProtein: 164,
  totalCarbs: 267,
  totalFats: 68
};

export const sampleWorkoutRoutine: WorkoutDay[] = [
  {
    dayName: 'Day 1: Push (Chest, Shoulders & Triceps)',
    focus: 'Hypertrophy & Upper Body Horizontal Pressing',
    estimatedMinutes: 55,
    exercises: [
      {
        exerciseId: 'ex-bench-press',
        exerciseName: 'Barbell Flat Bench Press',
        targetSets: 4,
        targetReps: '8-10',
        loggedSets: [
          { setNumber: 1, weightKg: 60, reps: 10, completed: true },
          { setNumber: 2, weightKg: 70, reps: 8, completed: true },
          { setNumber: 3, weightKg: 75, reps: 8, completed: true },
          { setNumber: 4, weightKg: 80, reps: 6, completed: false }
        ],
        completed: false
      },
      {
        exerciseId: 'ex-incline-dumbbell',
        exerciseName: 'Incline Dumbbell Chest Press (30° angle)',
        targetSets: 3,
        targetReps: '10-12',
        loggedSets: [
          { setNumber: 1, weightKg: 24, reps: 12, completed: true },
          { setNumber: 2, weightKg: 26, reps: 10, completed: true },
          { setNumber: 3, weightKg: 28, reps: 9, completed: false }
        ],
        completed: false
      },
      {
        exerciseId: 'ex-cable-crossover',
        exerciseName: 'Cable Crossover High-to-Low Fly',
        targetSets: 3,
        targetReps: '12-15',
        loggedSets: [
          { setNumber: 1, weightKg: 15, reps: 15, completed: true },
          { setNumber: 2, weightKg: 17.5, reps: 14, completed: false },
          { setNumber: 3, weightKg: 17.5, reps: 12, completed: false }
        ],
        completed: false
      },
      {
        exerciseId: 'ex-db-lateral-raise',
        exerciseName: 'Standing Dumbbell Lateral Raises',
        targetSets: 4,
        targetReps: '15-20',
        loggedSets: [
          { setNumber: 1, weightKg: 10, reps: 18, completed: true },
          { setNumber: 2, weightKg: 10, reps: 16, completed: false },
          { setNumber: 3, weightKg: 10, reps: 15, completed: false },
          { setNumber: 4, weightKg: 8, reps: 20, completed: false }
        ],
        completed: false
      },
      {
        exerciseId: 'ex-tricep-pushdown',
        exerciseName: 'Triceps Cable Rope Pushdown',
        targetSets: 3,
        targetReps: '12-15',
        loggedSets: [
          { setNumber: 1, weightKg: 22.5, reps: 15, completed: false },
          { setNumber: 2, weightKg: 25, reps: 12, completed: false },
          { setNumber: 3, weightKg: 25, reps: 12, completed: false }
        ],
        completed: false
      }
    ]
  },
  {
    dayName: 'Day 2: Pull (Back, Rear Delts & Biceps)',
    focus: 'Back Thickness & Lat Width',
    estimatedMinutes: 60,
    exercises: [
      {
        exerciseId: 'ex-lat-pulldown',
        exerciseName: 'Wide-Grip Lat Pulldown Machine',
        targetSets: 4,
        targetReps: '10-12',
        loggedSets: [
          { setNumber: 1, weightKg: 50, reps: 12, completed: false },
          { setNumber: 2, weightKg: 55, reps: 10, completed: false },
          { setNumber: 3, weightKg: 60, reps: 10, completed: false },
          { setNumber: 4, weightKg: 65, reps: 8, completed: false }
        ],
        completed: false
      },
      {
        exerciseId: 'ex-seated-cable-row',
        exerciseName: 'Seated Cable Row (Close V-Grip)',
        targetSets: 4,
        targetReps: '10-12',
        loggedSets: [
          { setNumber: 1, weightKg: 45, reps: 12, completed: false },
          { setNumber: 2, weightKg: 50, reps: 10, completed: false },
          { setNumber: 3, weightKg: 55, reps: 10, completed: false },
          { setNumber: 4, weightKg: 60, reps: 8, completed: false }
        ],
        completed: false
      },
      {
        exerciseId: 'ex-ez-bar-curl',
        exerciseName: 'Standing EZ-Bar Biceps Curl',
        targetSets: 3,
        targetReps: '10-12',
        loggedSets: [
          { setNumber: 1, weightKg: 25, reps: 12, completed: false },
          { setNumber: 2, weightKg: 30, reps: 10, completed: false },
          { setNumber: 3, weightKg: 30, reps: 9, completed: false }
        ],
        completed: false
      }
    ]
  },
  {
    dayName: 'Day 3: Legs & Core Power',
    focus: 'Quad Overload & Posterior Chain Balance',
    estimatedMinutes: 65,
    exercises: [
      {
        exerciseId: 'ex-leg-press',
        exerciseName: '45-Degree Sled Leg Press',
        targetSets: 4,
        targetReps: '12-15',
        loggedSets: [
          { setNumber: 1, weightKg: 140, reps: 15, completed: false },
          { setNumber: 2, weightKg: 160, reps: 12, completed: false },
          { setNumber: 3, weightKg: 180, reps: 12, completed: false },
          { setNumber: 4, weightKg: 200, reps: 10, completed: false }
        ],
        completed: false
      },
      {
        exerciseId: 'ex-lying-hamstring',
        exerciseName: 'Lying Leg Curl Machine',
        targetSets: 3,
        targetReps: '12-15',
        loggedSets: [
          { setNumber: 1, weightKg: 35, reps: 15, completed: false },
          { setNumber: 2, weightKg: 40, reps: 12, completed: false },
          { setNumber: 3, weightKg: 45, reps: 10, completed: false }
        ],
        completed: false
      }
    ]
  }
];

export const initialChallenges: FitnessChallenge[] = [
  {
    id: 'ch-30d-streak',
    title: '30-Day Iron Consistency Challenge',
    description: 'Log at least 4 gym sessions or classes per week for 4 consecutive weeks.',
    category: 'Consistency',
    targetMetric: '16 completed sessions',
    rewardPoints: 500,
    daysRemaining: 12,
    participantsCount: 342,
    icon: 'Flame',
    joined: true
  },
  {
    id: 'ch-leg-volume',
    title: '100-Ton Leg Press Volume Quest',
    description: 'Accumulate 100,000 kg total cumulative moved load on leg press and squats this month.',
    category: 'Strength',
    targetMetric: '100,000 kg total tonnage',
    rewardPoints: 750,
    daysRemaining: 18,
    participantsCount: 198,
    icon: 'Trophy',
    joined: false
  },
  {
    id: 'ch-hydration',
    title: '3-Liter Daily Hydration Streak',
    description: 'Log 3.0+ liters of water daily for 14 straight days to optimize nutrient transport.',
    category: 'Hydration',
    targetMetric: '14 consecutive days',
    rewardPoints: 300,
    daysRemaining: 6,
    participantsCount: 512,
    icon: 'Droplets',
    joined: true
  }
];

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Arjun Mehra',
    authorRole: 'FitSphere Pro Member',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    timeAgo: '2 hours ago',
    content: 'Hit a brand new PR today on the 45° Leg Press: 220 kg for 8 clean reps! Huge shoutout to Trainer Vik for adjusting my foot positioning. The pump is unreal! 🔥🏋️‍♂️',
    tag: '#PersonalRecord',
    likes: 47,
    likedByMe: true,
    comments: [
      { id: 'c1', author: 'Vikramaditya Sharma', text: 'Clean depth and zero knee cave Arjun! Proud of the discipline.', timeAgo: '1 hour ago' },
      { id: 'c2', author: 'Sneha Patel', text: 'Remember to foam roll those adductors tonight!', timeAgo: '45 mins ago' }
    ]
  },
  {
    id: 'post-2',
    authorName: 'Rhea Kapoor',
    authorRole: 'Elite Athlete Member',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    timeAgo: '5 hours ago',
    content: 'Just tried the FitSphere AI Diet Planner with high protein Indian meals. The Soya chunk curry + roasted chana snack easily got me 140g protein without exceeding my 1800 kcal limit! Highly recommend trying the meal builder 🥗💪',
    tag: '#NutritionHacks',
    likes: 63,
    likedByMe: false,
    comments: [
      { id: 'c3', author: 'Karan Joshi', text: 'Soya chunks are genuinely an underrated gamechanger!', timeAgo: '3 hours ago' }
    ]
  }
];

export const sampleProgressHistory: ProgressMetric[] = [
  { date: 'Week 1', weightKg: 82.5, benchPressKg: 70, squatKg: 95, deadliftKg: 120, caloriesBurned: 2450, waterIntakeLiters: 2.8 },
  { date: 'Week 2', weightKg: 81.8, benchPressKg: 72.5, squatKg: 100, deadliftKg: 125, caloriesBurned: 2600, waterIntakeLiters: 3.1 },
  { date: 'Week 3', weightKg: 81.2, benchPressKg: 75, squatKg: 102.5, deadliftKg: 127.5, caloriesBurned: 2550, waterIntakeLiters: 3.2 },
  { date: 'Week 4', weightKg: 80.6, benchPressKg: 77.5, squatKg: 105, deadliftKg: 130, caloriesBurned: 2700, waterIntakeLiters: 3.4 },
  { date: 'Week 5', weightKg: 80.1, benchPressKg: 80, squatKg: 110, deadliftKg: 135, caloriesBurned: 2800, waterIntakeLiters: 3.5 },
  { date: 'Week 6 (Current)', weightKg: 79.4, benchPressKg: 82.5, squatKg: 115, deadliftKg: 140, caloriesBurned: 2850, waterIntakeLiters: 3.5 }
];

export const defaultMemberProfile: UserProfile = {
  id: 'usr-member-demo',
  name: 'Devansh Roy',
  email: 'devansh.roy@fitsphere.ai',
  role: 'member',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  membershipTier: 'Premium',
  membershipStatus: 'Active',
  membershipExpiry: '2026-12-31',
  memberId: 'FS-9824-IND',
  phone: '+91 98765 43210',
  fitnessGoal: 'Muscle Gain',
  experienceLevel: 'Intermediate',
  dietaryPreference: 'Vegetarian',
  weightKg: 79.4,
  heightCm: 178,
  targetWeightKg: 82.0,
  dailyWaterTargetLiters: 3.5,
  dailyWaterLoggedLiters: 2.4,
  points: 1450,
  streakDays: 14,
  savedEquipmentIds: ['lat-pulldown', 'cable-crossover', 'leg-press-45'],
  savedExerciseIds: ['ex-lat-pulldown', 'ex-leg-press'],
  savedSupplementIds: ['mb-biozyme-perf', 'as-it-is-isolate']
};

export const defaultTrainerProfile: UserProfile = {
  id: 'usr-trainer-demo',
  name: 'Vikramaditya Sharma',
  email: 'vikram.sharma@fitsphere.ai',
  role: 'trainer',
  avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=300&q=80',
  membershipTier: 'Personal Training',
  membershipStatus: 'Active',
  membershipExpiry: '2028-01-01',
  memberId: 'TR-0042-PRO',
  phone: '+91 99887 76655',
  fitnessGoal: 'Strength & Conditioning',
  experienceLevel: 'Advanced',
  dietaryPreference: 'Non-Vegetarian',
  weightKg: 88.0,
  heightCm: 184,
  targetWeightKg: 90.0,
  dailyWaterTargetLiters: 4.5,
  dailyWaterLoggedLiters: 3.8,
  points: 4800,
  streakDays: 88,
  savedEquipmentIds: ['lat-pulldown', 'cable-crossover'],
  savedExerciseIds: ['ex-lat-pulldown'],
  savedSupplementIds: ['on-gold-standard']
};

export const defaultAdminProfile: UserProfile = {
  id: 'usr-admin-demo',
  name: 'Administrator Sarah',
  email: 'admin@fitsphere.ai',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  membershipTier: 'Elite',
  membershipStatus: 'Active',
  membershipExpiry: '2030-12-31',
  memberId: 'ADMIN-001-CORE',
  phone: '+91 91234 56789',
  fitnessGoal: 'General Health',
  experienceLevel: 'Advanced',
  dietaryPreference: 'Vegetarian',
  weightKg: 64.0,
  heightCm: 168,
  targetWeightKg: 64.0,
  dailyWaterTargetLiters: 3.0,
  dailyWaterLoggedLiters: 2.1,
  points: 9999,
  streakDays: 120,
  savedEquipmentIds: ['leg-press-45', 'pec-deck'],
  savedExerciseIds: ['ex-pec-deck'],
  savedSupplementIds: ['fastandup-plant']
};

export const initialBookings: BookingRecord[] = [
  {
    id: 'bk-101',
    userId: 'usr-member-demo',
    type: 'trainer',
    targetId: 'trainer-vikram',
    targetName: '1-on-1 Hypertrophy Assessment',
    instructorName: 'Vikramaditya Sharma',
    dateTime: 'Tomorrow',
    slot: '05:00 PM - 06:00 PM',
    status: 'Confirmed',
    price: 1200,
    createdDate: '2026-10-16'
  },
  {
    id: 'bk-102',
    userId: 'usr-member-demo',
    type: 'class',
    targetId: 'class-power-yoga',
    targetName: 'Sunrise Power Yoga & Mobility',
    instructorName: 'Sneha Patel',
    dateTime: 'Friday',
    slot: '06:30 AM - 07:30 AM',
    status: 'Confirmed',
    price: 0,
    createdDate: '2026-10-15'
  }
];
