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

-- B. Muscles (Scientific + Common Names)
-- Note: Assumes you have added the 'common_name' column manually.
INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (1, 'Pectoralis Major', 'Chest', 1);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (2, 'Pectoralis Minor', 'Upper Chest', 1);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (3, 'Latissimus Dorsi', 'Lats', 2);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (4, 'Trapezius', 'Traps', 2);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (5, 'Rhomboids', 'Mid Back', 2);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (6, 'Erector Spinae', 'Lower Back', 2);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (7, 'Anterior Deltoid', 'Front Delts', 3);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (8, 'Lateral Deltoid', 'Side Delts', 3);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (9, 'Posterior Deltoid', 'Rear Delts', 3);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (10, 'Biceps Brachii', 'Biceps', 4);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (11, 'Triceps Brachii', 'Triceps', 4);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (17, 'Forearms', 'Forearms', 4);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (12, 'Quadriceps', 'Quads', 5);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (13, 'Hamstrings', 'Hamstrings', 5);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (14, 'Gluteus Maximus', 'Glutes', 5);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (15, 'Calves', 'Calves', 5);

INSERT INTO
  muscles (id, name, common_name, muscle_group_id)
VALUES
  (16, 'Rectus Abdominis', 'Abs', 6);

-- C. Exercises
INSERT INTO
  exercises (id, name, description)
VALUES
  (1, 'Barbell Squat', 'The king of leg exercises.');

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    2,
    'Barbell Bench Press',
    'Compound chest exercise.'
  );

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    3,
    'Barbell Deadlift',
    'Full body posterior chain builder.'
  );

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    4,
    'Overhead Press',
    'Shoulder and tricep builder.'
  );

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    5,
    'Barbell Row',
    'Horizontal pulling for back thickness.'
  );

INSERT INTO
  exercises (id, name, description)
VALUES
  (6, 'Pull Up', 'Vertical pulling for back width.');

INSERT INTO
  exercises (id, name, description)
VALUES
  (7, 'Dumbbell Curl', 'Isolation for biceps.');

INSERT INTO
  exercises (id, name, description)
VALUES
  (
    8,
    'Tricep Rope Pushdown',
    'Isolation for triceps.'
  );

INSERT INTO
  exercises (id, name, description)
VALUES
  (9, 'Leg Press', 'Machine compound leg exercise.');

INSERT INTO
  exercises (id, name, description)
VALUES
  (10, 'Lat Pulldown', 'Machine vertical pull.');

-- D. Exercise Muscles Links
-- Squat
INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (1, 12, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (1, 14, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (1, 13, 'secondary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (1, 16, 'secondary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (1, 6, 'secondary');

-- Bench Press
INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (2, 1, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (2, 7, 'secondary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (2, 11, 'secondary');

-- Deadlift
INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (3, 13, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (3, 14, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (3, 6, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (3, 3, 'secondary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (3, 4, 'secondary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (3, 17, 'secondary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (3, 12, 'secondary');

-- Overhead Press
INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (4, 7, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (4, 8, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (4, 11, 'secondary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (4, 2, 'secondary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (4, 6, 'secondary');

-- Barbell Row
INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (5, 3, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (5, 5, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (5, 4, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (5, 10, 'secondary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (5, 9, 'secondary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (5, 17, 'secondary');

-- Pull Up
INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (6, 3, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (6, 10, 'secondary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (6, 5, 'secondary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (6, 17, 'secondary');

-- Dumbbell Curl
INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (7, 10, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (7, 17, 'secondary');

-- Tricep Pushdown
INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (8, 11, 'primary');

-- Leg Press
INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (9, 12, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (9, 14, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (9, 13, 'secondary');

-- Lat Pulldown
INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (10, 3, 'primary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (10, 10, 'secondary');

INSERT INTO
  exercise_muscles (exercise_id, muscle_id, role)
VALUES
  (10, 5, 'secondary');

-- E. Guest User
INSERT INTO
  users (id, name)
VALUES
  (1, 'Guest');
