import type { ExerciseDashboardProps,RoutineEntry,ExerciseInform } from "../types/Exercises"

function ExericsesList({exersiceInfo}:ExerciseDashboardProps){
    
    return(
        <div >
            {exersiceInfo.map((info:RoutineEntry, index:number)=>(
                <div key={index} className='session-container-list'>
                    <h3 className="day-name">Dia {info.day}:</h3>
                    {info.exersiceInfo.map((exercise:ExerciseInform, index:number)=>(
                        <p key={index} className="list-exercise-information"> {exercise.nameExercise} [{exercise.category}], {exercise.minutes} Min, {exercise.totalCalories} kcal | {exercise.status} </p>
                    ))}
                    <p>"{info.comment}"</p>
                </div>
            ))}
        </div>
    )
}

export default ExericsesList