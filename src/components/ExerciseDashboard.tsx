
import { obtainMaxCalories,categorySummary, exercisePerCategory, formatExerciseDetail, countBySource, loadRecommendation } from "../funcs/exercisesFunc"

import type { InvalidExercise } from "../types/External"
import type { RoutineEntry, ExerciseCategory, ExerciseInform } from "../types/Exercises"

const categoryIcons: Record<ExerciseCategory, string> = {
    Cardio: "🏃",
    Fuerza: "💪",
    Flexibilidad: "🧘"
}

const categories: ExerciseCategory[] = ["Cardio", "Fuerza", "Flexibilidad"]

interface ExerciseInformation{
    sessions : RoutineEntry[]
    invalidExercises : InvalidExercise[]
    
}

function ExerciseDashboard({sessions,invalidExercises}: ExerciseInformation){
    const weekValues = obtainMaxCalories(sessions)
    const categoryExercises = exercisePerCategory(sessions)
    const cardioCategory = categorySummary(categoryExercises,'Cardio')
    const strengthCategory = categorySummary(categoryExercises,'Fuerza')
    const flexCategory = categorySummary(categoryExercises,'Flexibilidad')
    const sourceCount = countBySource(sessions.flatMap((session: RoutineEntry) => session.exerciseInfo))

    return(
        <div>
            <p>Tiempo total: {weekValues.totalMinutes} | Total Calorias:  {weekValues.totalCalories}</p>
            <p>Dia entrenado: {weekValues.amountOfDay} | Promedio de Calorias por dia: {weekValues.averageCalories} </p>
            <p>🏃 Cardio: {cardioCategory.summaryTime} Min | 💪 Fuerza: {strengthCategory.summaryTime} Min | 🧘 Flexibilidad: {flexCategory.summaryTime} Min </p>
            <p>{loadRecommendation(weekValues.totalMinutes, weekValues.amountOfDay)}</p>

            <h3>📊 Reporte por Tipo de Ejercicio</h3>
            {categories.map((category: ExerciseCategory) => {
                const list: ExerciseInform[] = categoryExercises[category] ?? []
                if (list.length === 0){
                    return null
                }
                return(
                    <div key={category}>
                        <p>{categoryIcons[category]} {category} ({list.length} {list.length === 1 ? "ejercicio" : "ejercicios"})</p>
                        {list.map((exercise: ExerciseInform) => (
                            <p key={exercise.id} className="list-exercise-information">{exercise.nameExercise}, {exercise.minutes} min | {formatExerciseDetail(exercise)}</p>
                        ))}
                    </div>
                )
            })}
            <p>Total: {sourceCount.local + sourceCount.api} ejercicios, {weekValues.totalMinutes} min</p>
            <p>Catálogo local: {sourceCount.local} ejercicios | Desde API: {sourceCount.api} ejercicios</p>

            {invalidExercises.length > 0 && (
                <div>
                    <h3>⚠️ Ejercicios con datos incompletos ({invalidExercises.length})</h3>
                    {invalidExercises.map((exercise: InvalidExercise) => (
                        <p key={exercise.id}>{exercise.name}, campos requeridos faltantes</p>
                    ))}
                </div>
            )}

            
        </div>
    )

}

export default ExerciseDashboard