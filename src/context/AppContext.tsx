'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  BookingRecord,
  DailyMealPlan,
  WorkoutDay,
  EquipmentItem,
  SupplementItem,
  ExerciseItem
} from '@/lib/types';
import {
  defaultMemberProfile,
  defaultTrainerProfile,
  defaultAdminProfile,
  initialBookings,
  sampleMealPlan,
  sampleWorkoutRoutine,
  initialEquipment,
  initialSupplements,
  initialExercises
} from '@/lib/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
}

interface AppContextType {
  user: UserProfile;
  role: UserRole;
  switchRole: (role: UserRole) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  
  // Bookings
  bookings: BookingRecord[];
  addBooking: (booking: Omit<BookingRecord, 'id' | 'createdDate'>) => void;
  cancelBooking: (id: string) => void;

  // Saved items
  toggleSaveEquipment: (id: string) => void;
  toggleSaveExercise: (id: string) => void;
  toggleSaveSupplement: (id: string) => void;

  // Comparison
  comparisonIds: string[];
  addToCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;

  // Water tracking
  logWater: (amountLiters: number) => void;

  // Meal & Workout
  activeMealPlan: DailyMealPlan;
  updateMealPlan: (plan: DailyMealPlan) => void;
  activeWorkoutRoutine: WorkoutDay[];
  toggleExerciseSet: (dayIndex: number, exerciseIndex: number, setIndex: number) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Catalogs
  equipmentCatalog: EquipmentItem[];
  addEquipment: (item: EquipmentItem) => void;
  supplementCatalog: SupplementItem[];
  exerciseCatalog: ExerciseItem[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultMemberProfile);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [bookings, setBookings] = useState<BookingRecord[]>(initialBookings);
  const [comparisonIds, setComparisonIds] = useState<string[]>(['mb-biozyme-perf', 'on-gold-standard']);
  const [activeMealPlan, setActiveMealPlan] = useState<DailyMealPlan>(sampleMealPlan);
  const [activeWorkoutRoutine, setActiveWorkoutRoutine] = useState<WorkoutDay[]>(sampleWorkoutRoutine);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [equipmentCatalog, setEquipmentCatalog] = useState<EquipmentItem[]>(initialEquipment);
  const [supplementCatalog, setSupplementCatalog] = useState<SupplementItem[]>(initialSupplements);
  const [exerciseCatalog, setExerciseCatalog] = useState<ExerciseItem[]>(initialExercises);

  // Load persisted settings on mount
  useEffect(() => {
    try {
      const storedRole = localStorage.getItem('fitsphere_role') as UserRole | null;
      if (storedRole) {
        if (storedRole === 'trainer') setUser(defaultTrainerProfile);
        else if (storedRole === 'admin') setUser(defaultAdminProfile);
        else if (storedRole === 'guest') setUser({ ...defaultMemberProfile, role: 'guest', name: 'Guest Visitor' });
        else setUser(defaultMemberProfile);
      }
      const savedTheme = localStorage.getItem('fitsphere_theme');
      if (savedTheme === 'light') {
        setIsDarkTheme(false);
        document.documentElement.classList.add('light');
      } else {
        setIsDarkTheme(true);
        document.documentElement.classList.remove('light');
      }
    } catch {
      // Storage unavailable / server-side
    }
  }, []);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      const next = !prev;
      if (!next) {
        document.documentElement.classList.add('light');
        localStorage.setItem('fitsphere_theme', 'light');
      } else {
        document.documentElement.classList.remove('light');
        localStorage.setItem('fitsphere_theme', 'dark');
      }
      return next;
    });
  };

  const switchRole = (newRole: UserRole) => {
    localStorage.setItem('fitsphere_role', newRole);
    if (newRole === 'trainer') {
      setUser(defaultTrainerProfile);
      showToast({ type: 'info', title: 'Trainer View Activated', message: 'Switched to Trainer Vikramaditya Sharma portal.' });
    } else if (newRole === 'admin') {
      setUser(defaultAdminProfile);
      showToast({ type: 'warning', title: 'Admin View Activated', message: 'Switched to FitSphere Administrator control panel.' });
    } else if (newRole === 'guest') {
      setUser({ ...defaultMemberProfile, role: 'guest', name: 'Guest Explorer', membershipStatus: 'None' });
      showToast({ type: 'info', title: 'Guest View', message: 'Exploring public areas as Guest.' });
    } else {
      setUser(defaultMemberProfile);
      showToast({ type: 'success', title: 'Member View Activated', message: 'Welcome back, Devansh Roy (Pro Member).' });
    }
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const addBooking = (bookingData: Omit<BookingRecord, 'id' | 'createdDate'>) => {
    const newBooking: BookingRecord = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setBookings((prev) => [newBooking, ...prev]);
    showToast({
      type: 'success',
      title: 'Booking Confirmed!',
      message: `Successfully booked "${bookingData.targetName}" for ${bookingData.dateTime} (${bookingData.slot}).`
    });
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    showToast({
      type: 'info',
      title: 'Booking Cancelled',
      message: 'Your appointment or class slot has been safely released.'
    });
  };

  const toggleSaveEquipment = (id: string) => {
    setUser((prev) => {
      const exists = prev.savedEquipmentIds.includes(id);
      const updated = exists
        ? prev.savedEquipmentIds.filter((item) => item !== id)
        : [...prev.savedEquipmentIds, id];
      showToast({
        type: exists ? 'info' : 'success',
        message: exists ? 'Removed from saved equipment.' : 'Added to your gym routine equipment!'
      });
      return { ...prev, savedEquipmentIds: updated };
    });
  };

  const toggleSaveExercise = (id: string) => {
    setUser((prev) => {
      const exists = prev.savedExerciseIds.includes(id);
      const updated = exists
        ? prev.savedExerciseIds.filter((item) => item !== id)
        : [...prev.savedExerciseIds, id];
      showToast({
        type: exists ? 'info' : 'success',
        message: exists ? 'Removed from saved exercises.' : 'Saved exercise to your workout library!'
      });
      return { ...prev, savedExerciseIds: updated };
    });
  };

  const toggleSaveSupplement = (id: string) => {
    setUser((prev) => {
      const exists = prev.savedSupplementIds.includes(id);
      const updated = exists
        ? prev.savedSupplementIds.filter((item) => item !== id)
        : [...prev.savedSupplementIds, id];
      showToast({
        type: exists ? 'info' : 'success',
        message: exists ? 'Removed from supplement watchlist.' : 'Added supplement to watchlist!'
      });
      return { ...prev, savedSupplementIds: updated };
    });
  };

  const addToCompare = (id: string): boolean => {
    if (comparisonIds.includes(id)) {
      showToast({ type: 'info', message: 'Item is already in comparison tray.' });
      return false;
    }
    if (comparisonIds.length >= 4) {
      showToast({ type: 'warning', message: 'Maximum 4 supplements can be compared at once.' });
      return false;
    }
    setComparisonIds((prev) => [...prev, id]);
    showToast({ type: 'success', message: 'Added to side-by-side comparison tray.' });
    return true;
  };

  const removeFromCompare = (id: string) => {
    setComparisonIds((prev) => prev.filter((i) => i !== id));
  };

  const clearCompare = () => {
    setComparisonIds([]);
  };

  const logWater = (amountLiters: number) => {
    setUser((prev) => {
      const nextAmount = Math.min(prev.dailyWaterTargetLiters * 1.5, Math.round((prev.dailyWaterLoggedLiters + amountLiters) * 10) / 10);
      showToast({
        type: 'success',
        title: 'Hydration Logged',
        message: `Added +${amountLiters}L. Total logged today: ${nextAmount}L / ${prev.dailyWaterTargetLiters}L.`
      });
      return { ...prev, dailyWaterLoggedLiters: nextAmount };
    });
  };

  const updateMealPlan = (plan: DailyMealPlan) => {
    setActiveMealPlan(plan);
    showToast({
      type: 'success',
      title: 'Meal Plan Updated',
      message: 'New personalized nutritional balance calibrated.'
    });
  };

  const toggleExerciseSet = (dayIndex: number, exerciseIndex: number, setIndex: number) => {
    setActiveWorkoutRoutine((prev) => {
      const cloned = JSON.parse(JSON.stringify(prev)) as WorkoutDay[];
      const set = cloned[dayIndex].exercises[exerciseIndex].loggedSets[setIndex];
      set.completed = !set.completed;
      
      // check if all sets done
      const allDone = cloned[dayIndex].exercises[exerciseIndex].loggedSets.every((s) => s.completed);
      cloned[dayIndex].exercises[exerciseIndex].completed = allDone;
      return cloned;
    });
  };

  const addEquipment = (item: EquipmentItem) => {
    setEquipmentCatalog((prev) => [item, ...prev]);
    showToast({ type: 'success', message: `Added "${item.name}" to global gym catalog.` });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        role: user.role,
        switchRole,
        updateUser,
        isDarkTheme,
        toggleTheme,
        bookings,
        addBooking,
        cancelBooking,
        toggleSaveEquipment,
        toggleSaveExercise,
        toggleSaveSupplement,
        comparisonIds,
        addToCompare,
        removeFromCompare,
        clearCompare,
        logWater,
        activeMealPlan,
        updateMealPlan,
        activeWorkoutRoutine,
        toggleExerciseSet,
        toasts,
        showToast,
        removeToast,
        equipmentCatalog,
        addEquipment,
        supplementCatalog,
        exerciseCatalog
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
