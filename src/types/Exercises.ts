export type WeekDays = "Domingo" | "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes" | "Sabado" | ""
export type ExerciseStatus = "Completado" | "No Completado"

export type calories = number

export type ExerciseCategory = "Cardio" | "Fuerza" | "Flexibilidad"

export interface CardioExercise extends BasicExerciseInfo{
    category: 'Cardio'
    distance: number;
    rhythm:string;
    FCmax:number
}

export interface StrengthExercise extends BasicExerciseInfo {
    category: 'Fuerza'
    sets:number;
    reps:number;
    weight:number;
}

export interface FlexExercise extends BasicExerciseInfo {
    category:'Flexibilidad'
    pose: string;
    poseNumber:number;
}

interface BasicExerciseInfo {
    nameExercise:string;
    minutes:number;
    caloriesPerMinute:calories
    totalCalories:calories;
    status:ExerciseStatus 
}

export interface ExerciseForm2 {
    category: ExerciseCategory | "";
    nameExercise: string;
    minutes: number | ""
    caloriesPerMinute:calories | ""
    status:ExerciseStatus 

    distance: number | "";
    FCmax:number | "";

    sets:number | "";
    reps:number | "";
    weight:number | "";

    pose: string;
    poseNumber:number | "";
}

export type ExerciseInform = CardioExercise | StrengthExercise | FlexExercise


export interface RoutineEntry  {
    day:WeekDays;
    exersiceInfo:ExerciseInform[];
    comment:string
    
}

export interface WeekRoutine {
    weekRoutineName:string;
    sessions:RoutineEntry[]
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
    totalCalories: calories;
    totalMinutes: number;
    amountOfDay:number
    averageCalories:calories
}


export interface CategorySeparation {
    Cardio?: CardioExercise[];
    Fuerza?: StrengthExercise[];
    Flexibilidad?: FlexExercise[];
}

export interface SummaryCategory{
    summaryCalories:calories,
    summaryTime:number,
    summaryExercises:number
}

export interface ExerciseDashboardProps {
    exersiceInfo: RoutineEntry[];
}