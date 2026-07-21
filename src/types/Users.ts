export type UserLevel = "Principiante" | "Intermedio" | "Avanzado"

export interface UserInformation {
    name:string;
    age:number;
    level:UserLevel;
}