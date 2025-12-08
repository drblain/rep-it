export interface SearchResult {
  id: string;
  name: string;
  muscle_group: string;
  target_muscle: string;
}

export interface UserExercise extends SearchResult {
  is_favorite: boolean | null;
}
