export type WeekDays = "Domingo" | "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes" | "Sabado"

export interface RoutineEntry  {
    day:WeekDays;
    exersiceInfo:ExerciseInfo
    
}

export interface WeekRutine {
    name:string;
    exersices:RoutineEntry[]
}



export interface ExerciseInfo {
    nameE:string;
    minutes:number;
    totalCalories:number;
    distance: number | null;

}

export interface ExerciseForm {
    day:WeekDays;
    nameE:string;
    minutes:number | string;
    caloriesPerMinute:number | string;
    distance: number | string;
}

export interface ExerciseMaxCalories {
    name: string;
    calories:number;
    percentaje:number;
}