
import { obtainMaxCalories,categorySummary, ExercisePerCategory  } from "../funcs/exersicesFunc"

import type { RoutineEntry, } from "../types/Exercises"

interface ExerciseInformation{
    sessions : RoutineEntry[]
    
}

function ExerciseDashboard({sessions}: ExerciseInformation){
    const weekValues = obtainMaxCalories(sessions)
    const categoryExercises = ExercisePerCategory(sessions)
    const cardioCategory = categorySummary(categoryExercises,'Cardio')
    const strenghCategory = categorySummary(categoryExercises,'Fuerza')
    const flexCategory = categorySummary(categoryExercises,'Flexibilidad')

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

            
        </div>
    )

}

export default ExerciseDashboard