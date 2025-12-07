-- ==========================================
-- 1. CLEAR DATA (Safe Order)
-- ==========================================
-- Clear Child Tables
DELETE FROM user_sets;

DELETE FROM user_exercises;

DELETE FROM user_exercise_images;

DELETE FROM exercise_muscles;

DELETE FROM exercise_equipment;

-- Clear Parent Tables
DELETE FROM exercises;

DELETE FROM muscles;

DELETE FROM equipment;

DELETE FROM users;

-- Clear Grandparent Tables
DELETE FROM muscle_groups;

-- Reset Auto-Increment IDs
DELETE FROM sqlite_sequence;

-- ==========================================
-- 2. POPULATE DATA
-- ==========================================
-- A. Muscle Groups
INSERT INTO
  muscle_groups (id, name)
VALUES
  (1, 'Chest');

INSERT INTO
  muscle_groups (id, name)
VALUES
  (2, 'Back');

INSERT INTO
  muscle_groups (id, name)
VALUES
  (3, 'Shoulders');

INSERT INTO
  muscle_groups (id, name)
VALUES
  (4, 'Arms');

INSERT INTO
  muscle_groups (id, name)
VALUES
  (5, 'Legs');

INSERT INTO
  muscle_groups (id, name)
VALUES
  (6, 'Core');

-- B. Muscles
INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (1, 'Pectoralis Major', 'Chest', 1),
  (2, 'Pectoralis Minor', 'Upper Chest', 1),
  (3, 'Latissimus Dorsi', 'Lats', 2),
  (4, 'Trapezius', 'Traps', 2),
  (5, 'Rhomboids', 'Mid Back', 2),
  (6, 'Erector Spinae', 'Lower Back', 2),
  (7, 'Anterior Deltoid', 'Front Delts', 3),
  (8, 'Lateral Deltoid', 'Side Delts', 3),
  (9, 'Posterior Deltoid', 'Rear Delts', 3),
  (10, 'Biceps Brachii', 'Biceps', 4),
  (11, 'Triceps Brachii', 'Triceps', 4),
  (12, 'Quadriceps', 'Quads', 5),
  (13, 'Hamstrings', 'Hamstrings', 5),
  (14, 'Gluteus Maximus', 'Glutes', 5),
  (15, 'Calves', 'Calves', 5),
  (16, 'Rectus Abdominis', 'Abs', 6),
  (17, 'Forearms', 'Forearms', 4),
  (18, 'Adductors', 'Inner Thigh', 5),
  (19, 'Abductors', 'Outer Thigh', 5),
  (20, 'Obliques', 'Side Abs', 6),
  (21, 'Tibialis Anterior', 'Shins', 5),
  (22, 'Serratus Anterior', 'Serratus', 1);

-- C. Equipment
INSERT INTO
  equipment (id, name)
VALUES
  (1, 'Barbell'),
  (2, 'Dumbbell'),
  (3, 'Cable'),
  (4, 'Machine'),
  (5, 'Bodyweight'),
  (6, 'EZ-Bar'),
  (7, 'Kettlebell'),
  (8, 'Smith Machine'),
  (9, 'Trap Bar'),
  (10, 'Ab Wheel'),
  (11, 'Weight Plate');

-- D. Exercises, Muscle Links, & Equipment Links
-- Helper macros for relationships are not available in standard SQL, so we list them explicitly.
-- --- QUADS / LEGS ---
INSERT INTO
  exercises (id, name, description)
VALUES
  (
    1,
    'Barbell Back Squat',
    'The king of leg exercises.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (1, 12, 'primary'),
  (1, 14, 'primary'),
  (1, 13, 'secondary'),
  (1, 6, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (1, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    2,
    'Barbell Front Squat',
    'Squat targeting the quads with upright torso.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (2, 12, 'primary'),
  (2, 14, 'secondary'),
  (2, 16, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (2, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    3,
    'Goblet Squat',
    'Beginner friendly squat variation.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (3, 12, 'primary'),
  (3, 14, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (3, 2);

/* Dumbbell */
INSERT INTO
  exercises (id, name, description)
VALUES
  (
    4,
    'Hack Squat (machine)',
    'Machine based squat for quad isolation.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (4, 12, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (4, 4);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    5,
    'Bulgarian Split Squat',
    'Unilateral leg builder.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (5, 12, 'primary'),
  (5, 14, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (5, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    6,
    'Walking Lunges',
    'Dynamic unilateral leg exercise.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (6, 12, 'primary'),
  (6, 14, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (6, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    7,
    'Reverse Lunges',
    'Knee-friendly lunge variation.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (7, 12, 'primary'),
  (7, 14, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (7, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    8,
    'Step-Ups',
    'Unilateral leg and glute exercise.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (8, 12, 'primary'),
  (8, 14, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (8, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    9,
    'Leg Press',
    'Heavy compound machine leg exercise.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (9, 12, 'primary'),
  (9, 14, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (9, 4);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    10,
    'Smith Machine Squat',
    'Stable squat variation.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (10, 12, 'primary'),
  (10, 14, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (10, 8);

INSERT INTO
  exercises (id, name, description)
VALUES
  (11, 'Leg Extension', 'Isolation for quadriceps.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (11, 12, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (11, 4);

-- --- HAMSTRINGS / GLUTES ---
INSERT INTO
  exercises (id, name, description)
VALUES
  (
    12,
    'Conventional Deadlift',
    'Full body posterior chain builder.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (12, 13, 'primary'),
  (12, 14, 'primary'),
  (12, 6, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (12, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    13,
    'Sumo Deadlift',
    'Deadlift with a wide stance.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (13, 14, 'primary'),
  (13, 12, 'primary'),
  (13, 18, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (13, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    14,
    'Romanian Deadlift',
    'Hamstring focused hip hinge.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (14, 13, 'primary'),
  (14, 14, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (14, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    15,
    'Stiff-Leg Deadlift',
    'Strict hamstring isolation hinge.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (15, 13, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (15, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    16,
    'Trap Bar Deadlift',
    'Hybrid squat/hinge movement.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (16, 12, 'primary'),
  (16, 14, 'primary'),
  (16, 6, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (16, 9);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    17,
    'Good Mornings',
    'Posterior chain hinge with bar on back.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (17, 13, 'primary'),
  (17, 6, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (17, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (18, 'Hip Thrust', 'The best glute builder.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (18, 14, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (18, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    19,
    'Barbell Glute Bridge',
    'Floor based glute builder.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (19, 14, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (19, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    20,
    'Cable Pull-Through',
    'Cable hinge movement for glutes.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (20, 14, 'primary'),
  (20, 13, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (20, 3);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    21,
    'Kettlebell Deadlift',
    'Deadlift variation with kettlebell.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (21, 13, 'primary'),
  (21, 14, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (21, 7);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    22,
    'Leg Curl',
    'Machine isolation for hamstrings.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (22, 13, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (22, 4);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    23,
    'Lying Leg Curl',
    'Lying machine isolation for hamstrings.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (23, 13, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (23, 4);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    24,
    'Nordic Hamstring Curl',
    'Bodyweight eccentric hamstring exercise.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (24, 13, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (24, 5);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    25,
    'Hip Abduction Machine',
    'Outer thigh isolation.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (25, 19, 'primary'),
  (25, 14, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (25, 4);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    26,
    'Hip Adduction Machine',
    'Inner thigh isolation.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (26, 18, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (26, 4);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    27,
    'Reverse Hyperextension',
    'Decompresses spine and works glutes.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (27, 6, 'primary'),
  (27, 14, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (27, 4);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    28,
    'Deficit Deadlift',
    'Deadlift standing on a platform.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (28, 13, 'primary'),
  (28, 6, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (28, 1);

-- --- CHEST ---
INSERT INTO
  exercises (id, name, description)
VALUES
  (
    29,
    'Bench Press',
    'Classic compound chest builder.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (29, 1, 'primary'),
  (29, 7, 'secondary'),
  (29, 11, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (29, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    30,
    'Incline Bench Press',
    'Upper chest focused press.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (30, 2, 'primary'),
  (30, 1, 'secondary'),
  (30, 7, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (30, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    31,
    'Decline Bench Press',
    'Lower chest focused press.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (31, 1, 'primary'),
  (31, 11, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (31, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    32,
    'Dumbbell Bench Press',
    'Bench press with greater ROM.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (32, 1, 'primary'),
  (32, 7, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (32, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (33, 'Push-Ups', 'Bodyweight chest essential.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (33, 1, 'primary'),
  (33, 7, 'secondary'),
  (33, 11, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (33, 5);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    34,
    'Dumbbell Flyes',
    'Isolation movement for chest.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (34, 1, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (34, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    35,
    'Cable Flyes',
    'Constant tension chest isolation.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (35, 1, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (35, 3);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    36,
    'Chest Press Machine',
    'Machine stabilizer for chest press.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (36, 1, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (36, 4);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    37,
    'Floor Press',
    'Partial range press from floor.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (37, 11, 'primary'),
  (37, 1, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (37, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    38,
    'Squeeze Press',
    'Dumbbell press keeping weights together.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (38, 1, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (38, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    39,
    'Pause Bench Press',
    'Bench press with a pause at the bottom.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (39, 1, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (39, 1);

-- --- SHOULDERS ---
INSERT INTO
  exercises (id, name, description)
VALUES
  (
    40,
    'Overhead Barbell Press',
    'Compound shoulder mass builder.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (40, 7, 'primary'),
  (40, 8, 'primary'),
  (40, 11, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (40, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    41,
    'Dumbbell Shoulder Press',
    'Unilateral overhead press.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (41, 7, 'primary'),
  (41, 8, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (41, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (42, 'Arnold Press', 'Rotational shoulder press.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (42, 7, 'primary'),
  (42, 8, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (42, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    43,
    'Seated Shoulder Press Machine',
    'Safe overhead pressing machine.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (43, 7, 'primary'),
  (43, 8, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (43, 4);

INSERT INTO
  exercises (id, name, description)
VALUES
  (44, 'Lateral Raises', 'Isolation for side delts.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (44, 8, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (44, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (45, 'Front Raises', 'Isolation for front delts.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (45, 7, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (45, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    46,
    'Rear Delt Flyes',
    'Isolation for rear delts.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (46, 9, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (46, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    47,
    'Upright Rows',
    'Pulls for traps and side delts.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (47, 8, 'primary'),
  (47, 4, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (47, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    48,
    'Cable Lateral Raises',
    'Constant tension side delt raise.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (48, 8, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (48, 3);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    49,
    'Face Pulls',
    'Rear delt and rotator cuff health.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (49, 9, 'primary'),
  (49, 4, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (49, 3);

INSERT INTO
  exercises (id, name, description)
VALUES
  (50, 'Pin Press', 'Partial range overhead press.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (50, 7, 'primary'),
  (50, 11, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (50, 1);

-- --- BACK ---
INSERT INTO
  exercises (id, name, description)
VALUES
  (51, 'Pull-Ups', 'Vertical pull for back width.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (51, 3, 'primary'),
  (51, 10, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (51, 13);

INSERT INTO
  exercises (id, name, description)
VALUES
  (52, 'Chin-Ups', 'Vertical pull engaging biceps.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (52, 3, 'primary'),
  (52, 10, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (52, 13);

INSERT INTO
  exercises (id, name, description)
VALUES
  (53, 'Lat Pulldown', 'Machine vertical pull.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (53, 3, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (53, 3);

INSERT INTO
  exercises (id, name, description)
VALUES
  (54, 'Barbell Rows', 'Heavy horizontal pull.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (54, 3, 'primary'),
  (54, 5, 'primary'),
  (54, 4, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (54, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    55,
    'Dumbbell Rows',
    'Unilateral horizontal pull.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (55, 3, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (55, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    56,
    'Chest-Supported Rows',
    'Strict horizontal pull.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (56, 3, 'primary'),
  (56, 5, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (56, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (57, 'Seated Cable Rows', 'Horizontal cable pull.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (57, 3, 'primary'),
  (57, 5, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (57, 3);

INSERT INTO
  exercises (id, name, description)
VALUES
  (58, 'T-Bar Rows', 'Leverage based row.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (58, 3, 'primary'),
  (58, 5, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (58, 1);

/* Often specialized machine but basically barbell */
INSERT INTO
  exercises (id, name, description)
VALUES
  (
    59,
    'Inverted Rows',
    'Bodyweight horizontal pull.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (59, 5, 'primary'),
  (59, 3, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (59, 5);

INSERT INTO
  exercises (id, name, description)
VALUES
  (60, 'Meadows Rows', 'Unilateral landmine row.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (60, 3, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (60, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (61, 'Shrugs', 'Isolation for upper traps.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (61, 4, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (61, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    62,
    'Weighted Back Extension',
    'Posterior chain isolation.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (62, 6, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (62, 11);

-- --- BICEPS ---
INSERT INTO
  exercises (id, name, description)
VALUES
  (63, 'Barbell Curl', 'Heavy bicep mass builder.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (63, 10, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (63, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (64, 'Dumbbell Curl', 'Unilateral bicep work.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (64, 10, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (64, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    65,
    'Hammer Curl',
    'Targets brachialis and forearms.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (65, 10, 'primary'),
  (65, 17, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (65, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    66,
    'Preacher Curl',
    'Strict isolation for biceps.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (66, 10, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (66, 6);

/* EZ Bar usually */
INSERT INTO
  exercises (id, name, description)
VALUES
  (67, 'Cable Curl', 'Constant tension curl.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (67, 10, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (67, 3);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    68,
    'Concentration Curl',
    'Focused peak contraction.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (68, 10, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (68, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (69, 'EZ-Bar Curl', 'Wrist friendly curl.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (69, 10, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (69, 6);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    70,
    'Spider Curl',
    'Curl lying face down on incline.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (70, 10, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (70, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    71,
    'Reverse Curl',
    'Targets forearms and brachialis.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (71, 17, 'primary'),
  (71, 10, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (71, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    72,
    'Incline Dumbbell Curl',
    'Stretch focused bicep curl.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (72, 10, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (72, 2);

-- --- TRICEPS ---
INSERT INTO
  exercises (id, name, description)
VALUES
  (
    73,
    'Close-Grip Bench Press',
    'Tricep focused compound press.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (73, 11, 'primary'),
  (73, 1, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (73, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (74, 'Skull Crushers', 'Lying tricep extension.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (74, 11, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (74, 6);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    75,
    'Triceps Pushdown',
    'Cable isolation for triceps.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (75, 11, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (75, 3);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    76,
    'Overhead Triceps Extension',
    'Long head tricep isolation.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (76, 11, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (76, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    77,
    'Dumbbell Kickbacks',
    'Peak contraction for triceps.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (77, 11, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (77, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    78,
    'Dips',
    'Bodyweight compound for triceps/chest.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (78, 11, 'primary'),
  (78, 1, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (78, 5);

INSERT INTO
  exercises (id, name, description)
VALUES
  (79, 'JM Press', 'Hybrid press/extension.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (79, 11, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (79, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    80,
    'Cable Overhead Extension',
    'Constant tension overhead tricep work.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (80, 11, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (80, 3);

INSERT INTO
  exercises (id, name, description)
VALUES
  (81, 'Tate Press', 'Flared elbow tricep press.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (81, 11, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (81, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    82,
    'Reverse-Grip Pushdown',
    'Underhand cable pushdown.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (82, 11, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (82, 3);

-- --- CALVES / OTHERS ---
INSERT INTO
  exercises (id, name, description)
VALUES
  (
    83,
    'Standing Calf Raise',
    'Straight leg calf isolation.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (83, 15, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (83, 4);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    84,
    'Seated Calf Raise',
    'Bent knee calf isolation.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (84, 15, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (84, 4);

INSERT INTO
  exercises (id, name, description)
VALUES
  (85, 'Tibialis Raise', 'Anterior shin exercise.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (85, 21, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (85, 5);

INSERT INTO
  exercises (id, name, description)
VALUES
  (86, 'Hanging Leg Raise', 'Advanced core flexion.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (86, 16, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (86, 13);

INSERT INTO
  exercises (id, name, description)
VALUES
  (87, 'Cable Crunch', 'Weighted core flexion.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (87, 16, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (87, 3);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    88,
    'Ab Wheel Rollout',
    'Anti-extension core stability.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (88, 16, 'primary'),
  (88, 6, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (88, 10);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    89,
    'Decline Sit-Up',
    'Weighted sit up variation.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (89, 16, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (89, 5);

INSERT INTO
  exercises (id, name, description)
VALUES
  (90, 'Weighted Plank', 'Isometric core strength.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (90, 16, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (90, 11);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    91,
    'Russian Twist (weighted)',
    'Rotational core movement.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (91, 20, 'primary'),
  (91, 16, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (91, 11);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    92,
    'Pallof Press',
    'Anti-rotation core stability.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (92, 20, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (92, 3);

INSERT INTO
  exercises (id, name, description)
VALUES
  (93, 'Machine Crunch', 'Machine based ab flexion.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (93, 16, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (93, 4);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    94,
    'Dragon Flag',
    'Advanced bodyweight core lever.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (94, 16, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (94, 5);

INSERT INTO
  exercises (id, name, description)
VALUES
  (95, 'Farmer’s Carries', 'Full body loaded carry.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (95, 17, 'primary'),
  (95, 4, 'primary'),
  (95, 6, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (95, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (96, 'Wrist Curls', 'Forearm flexor isolation.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (96, 17, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (96, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    97,
    'Reverse Wrist Curls',
    'Forearm extensor isolation.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (97, 17, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (97, 2);

INSERT INTO
  exercises (id, name, description)
VALUES
  (98, 'Forearm Roller', 'Dynamic forearm burnout.');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (98, 17, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (98, 11);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    99,
    'Box Squat',
    'Squat to a box to break concentric chain.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (99, 12, 'primary'),
  (99, 14, 'primary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (99, 1);

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    100,
    'Zercher Squat',
    'Front loaded squat holding bar in elbows.'
  );

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (100, 12, 'primary'),
  (100, 6, 'secondary'),
  (100, 4, 'secondary');

INSERT INTO
  exercise_equipment (exercise_id, equipment_id)
VALUES
  (100, 1);

-- E. Guest User
INSERT INTO
  users (id, name)
VALUES
  (1, 'Guest');

-- F. Random User Exercises (Seed Data)
-- Adding 25 exercises for user 1, with 10 favorites
-- We pick IDs across the range 1-100 arbitrarily to ensure variety.
INSERT INTO
  user_exercises (user_id, exercise_id, is_favorite)
VALUES
  (1, 1, 1), -- Squat (Fav)
  (1, 12, 1), -- Deadlift (Fav)
  (1, 29, 1), -- Bench (Fav)
  (1, 40, 1), -- OHP (Fav)
  (1, 51, 1), -- Pull Up (Fav)
  (1, 54, 1), -- Barbell Row (Fav)
  (1, 63, 1), -- Barbell Curl (Fav)
  (1, 75, 1), -- Tricep Pushdown (Fav)
  (1, 9, 1), -- Leg Press (Fav)
  (1, 44, 1), -- Lat Raise (Fav)
  (1, 5, 0),
  (1, 14, 0),
  (1, 30, 0),
  (1, 49, 0),
  (1, 53, 0),
  (1, 65, 0),
  (1, 74, 0),
  (1, 88, 0),
  (1, 95, 0),
  (1, 33, 0),
  (1, 18, 0),
  (1, 42, 0),
  (1, 55, 0),
  (1, 22, 0),
  (1, 83, 0);
