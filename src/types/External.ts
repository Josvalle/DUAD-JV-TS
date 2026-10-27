import type { ExerciseCategory } from "./Exercises"

export interface ExercisePreset {
    nameExercise: string;
    category: ExerciseCategory;
}

export interface ApiResponseBasic {
    name: string;
    type: ExercisesTypes;
    muscle: AvailableMuscles;
}

export type ExercisesTypes = "cardio" | "olympic_weightlifting" | "plyometrics" | "powerlifting" | "strength" | "stretching" | "strongman"

export type AvailableMuscles = "abdominals" | "abductors" | "adductors" | "biceps"| "calves" | "chest"| "forearms" | "glutes" | "hamstrings" | "lats" | "lower_back" | "middle_back" | "neck" | "quadriceps" | "traps" | "triceps"

export interface InvalidExercise {
    id: string;
    name: string;
}

