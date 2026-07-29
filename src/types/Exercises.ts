export type WeekDays = "Domingo" | "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes" | "Sabado"

type calories = number

export interface RoutineEntry  {
    day:WeekDays;
    exersiceInfo:ExerciseInfo
    
}

export interface WeekRoutine {
    name:string;
    exersices:RoutineEntry[]
}

export interface MaxCaloriesAccumulator {
    totalCalories: number;
    exerciseMax: RoutineEntry;
}

export interface ExerciseInfo {
    nameExercise:string;
    minutes:number;
    caloriesPerMinute:calories
    totalCalories:calories;
    distance: number | null;

}

export interface ExerciseForm {
    day:WeekDays;
    nameExercise:string;
    minutes:number | string;
    caloriesPerMinute:calories | string;
    distance: number | string;
}

export interface ExerciseMaxCalories {
    name: string;
    calories:calories;
    routineTotal:number;
    percentaje:number;
}

export interface MaxCaloriesAccumulator {
    totalCalories: number;
    exerciseMax: RoutineEntry;
}