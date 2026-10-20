
import { obtainMaxCalories,categorySummary, ExercisePerCategory, formatExerciseDetail, countBySource } from "../funcs/exersicesFunc"

import type { RoutineEntry, ExerciseCategory, ExerciseInform } from "../types/Exercises"

const categoryIcons: Record<ExerciseCategory, string> = {
    Cardio: "🏃",
    Fuerza: "💪",
    Flexibilidad: "🧘"
}

const categories: ExerciseCategory[] = ["Cardio", "Fuerza", "Flexibilidad"]

interface ExerciseInformation{
    sessions : RoutineEntry[]
    invalidNames : string[]
    
}

function ExerciseDashboard({sessions,invalidNames}: ExerciseInformation){
    const weekValues = obtainMaxCalories(sessions)
    const categoryExercises = ExercisePerCategory(sessions)
    const cardioCategory = categorySummary(categoryExercises,'Cardio')
    const strenghCategory = categorySummary(categoryExercises,'Fuerza')
    const flexCategory = categorySummary(categoryExercises,'Flexibilidad')
    const sourceCount = countBySource(sessions)

    return(
        <div>
            <p>Tiempo total: {weekValues.totalMinutes} | Total Calorias:  {weekValues.totalCalories}</p>
            <p>Dia entrenado: {weekValues.amountOfDay} | Promedio de Calorias por dia: {weekValues.averageCalories} </p>
            <p>🏃 Cardio: {cardioCategory.summaryTime} Min | 💪 Fuerza: {strenghCategory.summaryTime} Min | 🧘 Flexibilidad: {flexCategory.summaryTime} Min </p>
            { weekValues.totalMinutes > 300 ? (
                <p> Dia de descanso Obligatorio</p>
            ) : weekValues.amountOfDay > 5 ? (
                <p> Dia de descanso Necesario</p>
            ) : weekValues.totalMinutes < 150 ? (
                <p> ⚠️ Considerá agregar un día más de entrenamiento esta semana.</p>
            ) : weekValues.amountOfDay < 3 ? (
                <p>⚠️ Considerá agregar un día más de entrenamiento esta semana.</p>
            ) : ( <p>Buena semana crack </p>) }

            <h3>📊 Reporte por Tipo de Ejercicio</h3>
            {categories.map((category: ExerciseCategory) => {
                const list: ExerciseInform[] = categoryExercises[category] ?? []
                if (list.length === 0){
                    return null
                }
                return(
                    <div key={category}>
                        <p>{categoryIcons[category]} {category} ({list.length} {list.length === 1 ? "ejercicio" : "ejercicios"})</p>
                        {list.map((exercise: ExerciseInform, index: number) => (
                            <p key={index} className="list-exercise-information">{exercise.nameExercise}, {exercise.minutes} min | {formatExerciseDetail(exercise)}</p>
                        ))}
                    </div>
                )
            })}
            <p>Total: {sourceCount.local + sourceCount.api} ejercicios, {weekValues.totalMinutes} min</p>
            <p>Catálogo local: {sourceCount.local} ejercicios | Desde API: {sourceCount.api} ejercicios</p>

            {invalidNames.length > 0 && (
                <div>
                    <h3>⚠️ Ejercicios con datos incompletos ({invalidNames.length})</h3>
                    {invalidNames.map((name: string, index: number) => (
                        <p key={index}>{name}, campos requeridos faltantes</p>
                    ))}
                </div>
            )}

            
        </div>
    )

}

export default ExerciseDashboard