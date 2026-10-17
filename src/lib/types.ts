export type UserRole = 'guest' | 'member' | 'trainer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  membershipTier: 'Free' | 'Basic' | 'Premium' | 'Elite' | 'Personal Training';
  membershipStatus: 'Active' | 'Expiring Soon' | 'Expired' | 'None';
  membershipExpiry: string;
  memberId: string;
  phone?: string;
  fitnessGoal: 'Muscle Gain' | 'Fat Loss' | 'Endurance' | 'Strength & Conditioning' | 'General Health';
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  dietaryPreference: 'Vegetarian' | 'Vegan' | 'Eggetarian' | 'Non-Vegetarian';
  weightKg: number;
  heightCm: number;
  targetWeightKg: number;
  dailyWaterTargetLiters: number;
  dailyWaterLoggedLiters: number;
  points: number;
  streakDays: number;
  savedEquipmentIds: string[];
  savedExerciseIds: string[];
  savedSupplementIds: string[];
}

export interface EquipmentItem {
  id: string;
  name: string;
  aliases: string[];
  category: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Cardio' | 'Functional';
  targetMuscles: string[];
  secondaryMuscles: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  purpose: string;
  benefits: string[];
  setupSteps: string[];
  postureGrip: string;
  commonMistakes: string[];
  safetyPrecautions: string[];
  alternatives: string[];
  videoEmbedUrl: string;
  imageUrl: string;
  confidenceSample?: number;
}

export interface ExerciseItem {
  id: string;
  title: string;
  muscleGroup: string;
  equipment: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMin: number;
  setsRecommended: string;
  repsRecommended: string;
  thumbnail: string;
  videoEmbedUrl: string;
  stepByStep: string[];
  warmUpAdvice: string;
  breathingTechnique: string;
  coolDownAdvice: string;
  bodyweightAlternative: string;
  relatedExerciseIds: string[];
}

export interface SupplementItem {
  id: string;
  name: string;
  brand: string;
  category: 'Whey Protein' | 'Whey Isolate' | 'Plant Protein' | 'Creatine' | 'BCAA & EAA' | 'Mass Gainer';
  flavors: string[];
  packSizeKg: number;
  servingsCount: number;
  proteinPerServingG: number;
  priceAmazon: number;
  priceFlipkart: number;
  amazonUrl: string;
  flipkartUrl: string;
  ingredients: string;
  allergens: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  isVegetarian: boolean;
  labTested: boolean;
  lastUpdated: string;
}

export interface TrainerItem {
  id: string;
  name: string;
  photo: string;
  specialization: string[];
  qualifications: string[];
  experienceYears: number;
  languages: string[];
  bio: string;
  approach: string;
  hourlyFee: number;
  rating: number;
  reviewCount: number;
  availableDays: string[];
  availableSlots: string[];
  email: string;
}

export interface GroupClassItem {
  id: string;
  title: string;
  instructor: string;
  instructorPhoto: string;
  category: 'Yoga & Mobility' | 'HIIT & Cardio' | 'Zumba' | 'Spinning' | 'Strength & Conditioning';
  dayTime: string;
  timeSlot: string;
  durationMin: number;
  capacity: number;
  bookedCount: number;
  difficulty: 'All Levels' | 'Beginner' | 'Intermediate' | 'High Intensity';
  room: string;
  description: string;
}

export interface BookingRecord {
  id: string;
  userId: string;
  type: 'trainer' | 'class';
  targetId: string;
  targetName: string;
  instructorName?: string;
  dateTime: string;
  slot: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  price: number;
  notes?: string;
  createdDate: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  annualPrice: number;
  features: string[];
  popular?: boolean;
  highlightColor?: string;
}

export interface MealItem {
  title: string;
  description: string;
  items: string[];
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  affordableIndianOptions?: string[];
}

export interface DailyMealPlan {
  id: string;
  dayName: string;
  breakfast: MealItem;
  morningSnack: MealItem;
  lunch: MealItem;
  preWorkout: MealItem;
  postWorkout: MealItem;
  dinner: MealItem;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

export interface WorkoutExerciseLog {
  exerciseId: string;
  exerciseName: string;
  targetSets: number;
  targetReps: string;
  loggedSets: { setNumber: number; weightKg: number; reps: number; completed: boolean }[];
  completed: boolean;
}

export interface WorkoutDay {
  dayName: string;
  focus: string;
  estimatedMinutes: number;
  exercises: WorkoutExerciseLog[];
}

export interface FitnessChallenge {
  id: string;
  title: string;
  description: string;
  category: 'Strength' | 'Endurance' | 'Consistency' | 'Hydration';
  targetMetric: string;
  rewardPoints: number;
  daysRemaining: number;
  participantsCount: number;
  icon: string;
  joined: boolean;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  tag: string;
  likes: number;
  likedByMe?: boolean;
  comments: { id: string; author: string; text: string; timeAgo: string }[];
}

export interface ProgressMetric {
  date: string;
  weightKg: number;
  benchPressKg: number;
  squatKg: number;
  deadliftKg: number;
  caloriesBurned: number;
  waterIntakeLiters: number;
}
