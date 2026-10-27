import type { ExerciseDashboardProps,RoutineEntry,ExerciseInform } from "../types/Exercises"

function ExericsesList({exerciseInfo}:ExerciseDashboardProps){
    
    return(
        <div >
            {exerciseInfo.map((info:RoutineEntry, index:number)=>(
                <div key={index} className='session-container-list'>
                    <h3 className="day-name">Dia {info.day}:</h3>
                    {info.exerciseInfo.map((exercise:ExerciseInform)=>(
                        <p key={exercise.id} className="list-exercise-information"> {exercise.nameExercise} [{exercise.category}], {exercise.minutes} Min, {exercise.totalCalories} kcal | {exercise.status} </p>
                    ))}
                    <p>"{info.comment}"</p>
                </div>
            ))}
        </div>
    )
}

export default ExericsesList