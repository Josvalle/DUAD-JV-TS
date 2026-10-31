import { obtainMaxCalories, resolveRoutine, loadRecommendation, countBySource, countByCategory } from "../funcs/exercisesFunc"
import { useStoreItems } from "../storage/useStore"
import { userStore, exerciseStore, routineStore, activityStore } from "../storage/stores"
import type { ExerciseInform, StoredRoutine } from "../types/Exercises"
import type { UserInformation } from "../types/Users"
import type { ActivityEntry } from "../types/System"
import '../styles/dashboard.css'

const recentActivityLimit = 8

function SystemDashboard(){
    const users = useStoreItems(userStore)
    const exercises = useStoreItems(exerciseStore)
    const routines = useStoreItems(routineStore)
    const activity = useStoreItems(activityStore)

    const sourceCount = countBySource(exercises)
    const categoryCount = countByCategory(exercises)
    const activeRoutines = routines.filter((routine: StoredRoutine) => routine.sessions.length > 0)
    const recentActivity = activity.slice(-recentActivityLimit).reverse()

    return(
        <div id="system-dashboard">
            <h2>🏋️ FitTracker, Dashboard</h2>

            <div className="system-card">
                <h3>📦 Estado del sistema</h3>
                <p>Usuarios: {users.length}</p>
                <p>Ejercicios en catálogo: {exercises.length} ({sourceCount.local} locales + {sourceCount.api} desde API)</p>
                <p>Rutinas activas: {activeRoutines.length}</p>
            </div>

            {users.map((user: UserInformation) => {
                const userExercises = exercises.filter((exercise: ExerciseInform) => exercise.userId === user.id)
                const weekRoutine = resolveRoutine(routines.find((routine: StoredRoutine) => routine.userId === user.id), userExercises)
                const weekValues = obtainMaxCalories(weekRoutine.sessions)
                return(
                    <div key={user.id} className="system-card">
                        <h3>👤 {user.name} ({user.level})</h3>
                        <p>{weekRoutine.weekRoutineName}, {weekValues.amountOfDay} días | {weekValues.totalMinutes} min | {weekValues.totalCalories} kcal</p>
                        <p>Carga: {loadRecommendation(weekValues.totalMinutes, weekValues.amountOfDay)}</p>
                    </div>
                )
            })}

            <div className="system-card">
                <h3>📊 Catálogo</h3>
                <p>🏃 Cardio: {categoryCount.Cardio} | 💪 Fuerza: {categoryCount.Fuerza} | 🧘 Flexibilidad: {categoryCount.Flexibilidad}</p>
            </div>

            <div className="system-card">
                <h3>🗄️ Actividad reciente</h3>
                {recentActivity.length === 0 && <p>Sin actividad todavía</p>}
                {recentActivity.map((entry: ActivityEntry) => (
                    <p key={entry.id}>{entry.success ? "✅" : "❌"} {entry.message}</p>
                ))}
            </div>
        </div>
    )
}

export default SystemDashboard
