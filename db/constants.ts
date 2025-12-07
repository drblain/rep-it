// ==========================================
// MUSCLE GROUPS
// ==========================================
export const MUSCLE_GROUPS = {
  CHEST: 1,
  BACK: 2,
  SHOULDERS: 3,
  ARMS: 4,
  LEGS: 5,
  CORE: 6,
} as const;

export const MUSCLE_GROUP_LABELS: Record<number, string> = {
  [MUSCLE_GROUPS.CHEST]: 'Chest',
  [MUSCLE_GROUPS.BACK]: 'Back',
  [MUSCLE_GROUPS.SHOULDERS]: 'Shoulders',
  [MUSCLE_GROUPS.ARMS]: 'Arms',
  [MUSCLE_GROUPS.LEGS]: 'Legs',
  [MUSCLE_GROUPS.CORE]: 'Core',
};

// ==========================================
// EQUIPMENT
// ==========================================
export const EQUIPMENT = {
  BARBELL: 1,
  DUMBBELL: 2,
  CABLE: 3,
  MACHINE: 4,
  BODYWEIGHT: 5,
  EZ_BAR: 6,
  KETTLEBELL: 7,
  SMITH_MACHINE: 8,
  TRAP_BAR: 9,
  AB_WHEEL: 10,
  WEIGHT_PLATE: 11,
} as const;

export const EQUIPMENT_LABELS: Record<number, string> = {
  [EQUIPMENT.BARBELL]: 'Barbell',
  [EQUIPMENT.DUMBBELL]: 'Dumbbell',
  [EQUIPMENT.CABLE]: 'Cable',
  [EQUIPMENT.MACHINE]: 'Machine',
  [EQUIPMENT.BODYWEIGHT]: 'Bodyweight',
  [EQUIPMENT.EZ_BAR]: 'EZ-Bar',
  [EQUIPMENT.KETTLEBELL]: 'Kettlebell',
  [EQUIPMENT.SMITH_MACHINE]: 'Smith Machine',
  [EQUIPMENT.TRAP_BAR]: 'Trap Bar',
  [EQUIPMENT.AB_WHEEL]: 'Ab Wheel',
  [EQUIPMENT.WEIGHT_PLATE]: 'Weight Plate',
};

// ==========================================
// MUSCLES (ID Mapping)
// ==========================================
export const MUSCLES = {
  PECTORALIS_MAJOR: 1,
  PECTORALIS_MINOR: 2,
  LATISSIMUS_DORSI: 3,
  TRAPEZIUS: 4,
  RHOMBOIDS: 5,
  ERECTOR_SPINAE: 6,
  ANTERIOR_DELTOID: 7,
  LATERAL_DELTOID: 8,
  POSTERIOR_DELTOID: 9,
  BICEPS_BRACHII: 10,
  TRICEPS_BRACHII: 11,
  QUADRICEPS: 12,
  HAMSTRINGS: 13,
  GLUTEUS_MAXIMUS: 14,
  CALVES: 15,
  RECTUS_ABDOMINIS: 16,
  FOREARMS: 17,
  ADDUCTORS: 18,
  ABDUCTORS: 19,
  OBLIQUES: 20,
  TIBIALIS_ANTERIOR: 21,
  SERRATUS_ANTERIOR: 22,
} as const;

// Optional: Common names for display if you don't want to query the DB
export const MUSCLE_COMMON_NAMES: Record<number, string> = {
  [MUSCLES.PECTORALIS_MAJOR]: 'Chest',
  [MUSCLES.PECTORALIS_MINOR]: 'Upper Chest',
  [MUSCLES.LATISSIMUS_DORSI]: 'Lats',
  [MUSCLES.TRAPEZIUS]: 'Traps',
  [MUSCLES.RHOMBOIDS]: 'Mid Back',
  [MUSCLES.ERECTOR_SPINAE]: 'Lower Back',
  [MUSCLES.ANTERIOR_DELTOID]: 'Front Delts',
  [MUSCLES.LATERAL_DELTOID]: 'Side Delts',
  [MUSCLES.POSTERIOR_DELTOID]: 'Rear Delts',
  [MUSCLES.BICEPS_BRACHII]: 'Biceps',
  [MUSCLES.TRICEPS_BRACHII]: 'Triceps',
  [MUSCLES.QUADRICEPS]: 'Quads',
  [MUSCLES.HAMSTRINGS]: 'Hamstrings',
  [MUSCLES.GLUTEUS_MAXIMUS]: 'Glutes',
  [MUSCLES.CALVES]: 'Calves',
  [MUSCLES.RECTUS_ABDOMINIS]: 'Abs',
  [MUSCLES.FOREARMS]: 'Forearms',
  [MUSCLES.ADDUCTORS]: 'Inner Thigh',
  [MUSCLES.ABDUCTORS]: 'Outer Thigh',
  [MUSCLES.OBLIQUES]: 'Side Abs',
  [MUSCLES.TIBIALIS_ANTERIOR]: 'Shins',
  [MUSCLES.SERRATUS_ANTERIOR]: 'Serratus',
};

// ==========================================
// RELATIONSHIP ROLES
// ==========================================
export const EXERCISE_ROLES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
} as const;

export type ExerciseRole = (typeof EXERCISE_ROLES)[keyof typeof EXERCISE_ROLES];
