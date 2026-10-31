import { obtainMaxCalories, resolveRoutine } from "../funcs/exercisesFunc";
import { useStoreItems } from "../storage/useStore";
import { userStore, exerciseStore, routineStore } from "../storage/stores";
import type { UserInformation } from "../types/Users";
import type { ExerciseInform, StoredRoutine } from "../types/Exercises";
import '../styles/dashboard.css'

const instructorName = 'Sofia Ramirez'

function InstructorPage(){
    const users = useStoreItems(userStore)
    const exercises = useStoreItems(exerciseStore)
    const routines = useStoreItems(routineStore)

    return(
        <>
        <h1> Instrutor: {instructorName}</h1>
        <div id="users-summary">
            <h2>Usuarios: </h2>
            {users.map((user: UserInformation)=>{
                const userExercises = exercises.filter((exercise: ExerciseInform) => exercise.userId === user.id)
                const weekRoutine = resolveRoutine(routines.find((routine: StoredRoutine) => routine.userId === user.id), userExercises)
                const userSummary = obtainMaxCalories(weekRoutine.sessions)
                return(
                    <div key={user.id}>
                        <p>{user.name}</p>
                        <p>Rutina: {weekRoutine.weekRoutineName}</p>
                        <p>Semana: {userSummary.amountOfDay} | {userSummary.totalCalories} | {userSummary.totalMinutes}</p>
                    </div>
                )
            })}
        </div>

        </>
    )


}

export default InstructorPage
