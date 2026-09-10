import type {MaxCaloriesAccumulator, WeekRoutine} from './Exercises'

export type UserLevel = "Principiante" | "Intermedio" | "Avanzado"


export interface UserInformation extends UserForm{
    id: number
}
export interface UserForm {
    name:string;
    age:number;
    email:string;
    level:UserLevel;
    routine:string;
}

export type UserMembership = "Normal" | "Premium" | "Black"

type Status = "Activo" | "Cancelado"


export interface UserPlan{
    MembershipLevel: UserMembership;
    StartDate: string;
    UserStatus: Status
}

export interface ClientsInfo{
    clientName: string;
    clientLevel: UserLevel;
    routineName:string;
    weekRoutine:WeekRoutine;

}

export interface Instructor{
    name:string;
    clients:ClientsInfo[]
}

