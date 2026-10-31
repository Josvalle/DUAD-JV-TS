import { completeExercise, deleteExercise } from "../funcs/systemFunc"
import type { ExerciseDashboardProps,RoutineEntry,ExerciseInform } from "../types/Exercises"

function ExericsesList({exerciseInfo}:ExerciseDashboardProps){
    
    return(
        <div >
            {exerciseInfo.map((info:RoutineEntry, index:number)=>(
                <div key={index} className='session-container-list'>
                    <h3 className="day-name">Dia {info.day}:</h3>
                    {info.exerciseInfo.map((exercise:ExerciseInform)=>(
                        <div key={exercise.id} className="exercise-row">
                            <p className="list-exercise-information"> {exercise.nameExercise} [{exercise.category}], {exercise.minutes} Min, {exercise.totalCalories} kcal | {exercise.status} </p>
                            {exercise.status !== "Completado" && (
                                <button className="small-button" onClick={() => completeExercise(exercise.id)}>Completar</button>
                            )}
                            <button className="small-button" onClick={() => deleteExercise(exercise.id)}>Eliminar</button>
                        </div>
                    ))}
                    <p>"{info.comment}"</p>
                </div>
            ))}
        </div>
    )
}

export default ExericsesList
