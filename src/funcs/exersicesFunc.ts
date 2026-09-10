import type {RoutineEntry,MaxCaloriesAccumulator,CategorySeparation,ExerciseInform,ExerciseCategory,SummaryCategory,WeekDays} from '../types/Exercises'
type CaloriesByDay = Partial<Record<WeekDays, number>>;

export function obtainSpendTime(totalMinutes:number):string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours ===0){
        return `${minutes}m`
    }else if(minutes === 0){
        return `${hours}h`
    }else{
        return `${hours}h a ${minutes}m`;
    }
    
}

export function obtainPace(totalMinutes:number, totalkilometers:number,):string {
    const pace = totalMinutes/totalkilometers
    return `Ritmo: ${pace.toFixed(2)} min/km`;
}

export function obtainMaxCalories(exercises: RoutineEntry[]): MaxCaloriesAccumulator {
        const trainedday = new Set(exercises.map((entry:RoutineEntry):string=>entry.day))
    
        const amountOfDay = trainedday.size

        const allExercises: ExerciseInform[] = exercises.flatMap(exercise => exercise.exersiceInfo)
        const totalCalories = allExercises.reduce((count:number,actualC:ExerciseInform)=>{
        count += actualC.totalCalories
        return count;
        },0) 

        const totalMinutes =allExercises.reduce((count:number, actualTime:ExerciseInform)=>{
            count += actualTime.minutes
            return count
        },0)

        const averageCalories = totalCalories/amountOfDay


        return {
            totalCalories,
            totalMinutes,
            amountOfDay,
            averageCalories
        }

    }



export function ExercisesNoComplete(exercisesList: RoutineEntry[]){
    const exercisePool:ExerciseInform[] = exercisesList.flatMap(exercise => exercise.exersiceInfo)
    const noCompleteE = exercisePool.filter(e => e.status === "No Completado")
    return noCompleteE
}


export function ExercisePerCategory(exercisesArray: RoutineEntry[] ):CategorySeparation{
    const allExercises: ExerciseInform[] = exercisesArray.flatMap(exercise => exercise.exersiceInfo)
    const newExerciseArray: CategorySeparation = allExercises.reduce<CategorySeparation>((
        accumulator: CategorySeparation,
        currentExercise: ExerciseInform
    ): CategorySeparation => {
        
        if(currentExercise.category === "Cardio"){
            if (accumulator.Cardio ===undefined){
                accumulator.Cardio = []
            }
            accumulator.Cardio?.push(currentExercise)
        }else if (currentExercise.category === "Flexibilidad"){
            if (accumulator.Flexibilidad === undefined){
                accumulator.Flexibilidad = []
            }
            accumulator.Flexibilidad?.push(currentExercise)
        }else if(currentExercise.category ==="Fuerza"){
            if(accumulator.Fuerza === undefined){
                accumulator.Fuerza = []
            }
            accumulator.Fuerza?.push(currentExercise)
        }
        
        return accumulator
    },{})

    return newExerciseArray
}

export function obtainDayWithMostCalories(entries: RoutineEntry[]): string | null {
    const caloriesByDay = entries.reduce((groupedDays:CaloriesByDay, currentEntry:RoutineEntry):CaloriesByDay => {
                const day = currentEntry.day;
                const calories = currentEntry.exersiceInfo.reduce((accumlator:number, currentExercise: ExerciseInform): number=>{
                    accumlator += currentExercise.totalCalories;
                    return accumlator
                },0)



                groupedDays[day] = (groupedDays[day] ?? 0) + calories;

                return groupedDays;
            },{});

    const days = Object.entries(caloriesByDay) as [WeekDays,number][];

    if (days.length === 0) {
        return null;
    }

    const maxDay = days.reduce((maximum:[WeekDays,number], currentDay:[WeekDays,number]):[WeekDays,number] => currentDay[1] > maximum[1] ? currentDay : maximum);

    return `Dia con mas calorias de la rutina: ${maxDay[0]} Calorias: ${maxDay[1]}`
    }






export function categorySummary (categoryList: CategorySeparation, category:ExerciseCategory):SummaryCategory{
    const summaryCalories = categoryList[category]?.reduce((accumulator:number,currentCalories)=>{
        return accumulator + currentCalories.totalCalories
    },0)??0

    const summaryTime = categoryList[category]?.reduce((accumulator:number,currentTime)=>{
        return accumulator + currentTime.minutes
    },0)??0

    const summaryExercises = categoryList[category]?.length ?? 0

    return(
        {
            'summaryCalories':summaryCalories,
            'summaryTime':summaryTime,
            'summaryExercises':summaryExercises
        }
    )
}


