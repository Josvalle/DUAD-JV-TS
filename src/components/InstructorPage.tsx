import { useState } from "react";
import { obtainMaxCalories } from "../funcs/exersicesFunc";
import type { Instructor,UserInformation } from "../types/Users";
import type { WeekRoutine } from "../types/Exercises";
import '../styles/dashboard.css'

interface InstructorProps{
    user: UserInformation
    WeekRoutine: WeekRoutine
}


function InstructorPage({user,WeekRoutine}:InstructorProps){
    const [instructorInfo] = useState<Instructor>({
        name: 'Sofia Ramirez',
        clients:[
            {
                clientName:user.name,
                clientLevel:user.level,
                routineName:WeekRoutine.weekRoutineName,
                weekRoutine:WeekRoutine
            }
            
        ]})
    const userSummary = obtainMaxCalories(instructorInfo.clients[0].weekRoutine.sessions)

    return(
        <>
        <h1> Instrutor: {instructorInfo.name}</h1>
        <div id="users-summary">
            <h2>Usuarios: </h2>
            <p>{instructorInfo.clients[0].clientName}</p>
            <p>Rutina: {instructorInfo.clients[0].weekRoutine.weekRoutineName}</p>
            <p>Semana: {userSummary.amountOfDay} | {userSummary.totalCalories} | {userSummary.totalMinutes}</p>
        </div>

        </>
    )


}

export default InstructorPage