export type UserLevel = "Principiante" | "Intermedio" | "Avanzado"


export interface UserInformation extends UserForm{
    id: number
}
export interface UserForm {
    name:string;
    age:number;
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