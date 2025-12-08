/**
 * Parses the "role:name" string format returned by GROUP_CONCAT in our SQL queries.
 * Prioritizes the 'primary' muscle, otherwise falls back to the first available one.
 */
export function parseTargetMuscle(musclesData: string | null): string {
  if (!musclesData) return 'Unknown';

  const allMuscles = musclesData.split(',');

  // Try to find the primary muscle first
  const primaryEntry = allMuscles.find((muscle) =>
    muscle.trim().startsWith('primary:')
  );

  if (primaryEntry) {
    return primaryEntry.split(':')[1];
  }

  // Fallback to the first muscle in the list if no primary is found
  if (allMuscles.length > 0) {
    return allMuscles[0].split(':')[1];
  }

  return 'Unknown';
}
