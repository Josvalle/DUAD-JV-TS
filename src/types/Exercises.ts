export type WeekDays = "Domingo" | "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes" | "Sabado" | ""
export type ExerciseStatus = "Completado" | "Saltado" | "Pendiente"

export type calories = number

export type ExerciseSource = "local" | "api"

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
    id:string;
    nameExercise:string;
    minutes:number;
    caloriesPerMinute:calories
    totalCalories:calories;
    status:ExerciseStatus 
    source:ExerciseSource
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
    exerciseInfo:ExerciseInform[];
    comment:string
    
}

export interface WeekRoutine {
    weekRoutineName:string;
    sessions:RoutineEntry[]
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

export interface SourceCount {
    local:number;
    api:number;
}

export interface ExerciseDashboardProps {
    exerciseInfo: RoutineEntry[];
}