import type {ExerciseForm2,ExerciseSource,SourceCount,RoutineEntry,MaxCaloriesAccumulator,CategorySeparation,ExerciseInform,ExerciseCategory,SummaryCategory,WeekDays} from '../types/Exercises'
type CaloriesByDay = Partial<Record<WeekDays, number>>;

export const weekDays: WeekDays[] = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]

export function obtainDay(value: string): WeekDays | undefined {
    return weekDays.find((day) => day === value)
}

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
    const noCompleteE = exercisePool.filter(e => e.status === "Saltado")
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

    const days: [WeekDays, number][] = weekDays.flatMap((day) => {
        const dayCalories = caloriesByDay[day]
        return dayCalories === undefined ? [] : [[day, dayCalories]]
    })

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




export function createExercise(values: ExerciseForm2, source: ExerciseSource): ExerciseInform | null {
    const minutes = Number(values.minutes)
    const caloriesPerMinute = Number(values.caloriesPerMinute)
    const totalCalories = caloriesPerMinute * minutes

    if (values.category === 'Cardio'){
        return {
            nameExercise: values.nameExercise,
            minutes,
            caloriesPerMinute,
            totalCalories,
            status: values.status,
            source,
            category: 'Cardio',
            distance: Number(values.distance),
            rhythm: obtainPace(minutes, Number(values.distance)),
            FCmax: Number(values.FCmax)
        }
    }else if (values.category === 'Fuerza'){
        return {
            nameExercise: values.nameExercise,
            minutes,
            caloriesPerMinute,
            totalCalories,
            status: values.status,
            source,
            category: 'Fuerza',
            sets: Number(values.sets),
            reps: Number(values.reps),
            weight: Number(values.weight)
        }
    }else if (values.category === 'Flexibilidad'){
        return {
            nameExercise: values.nameExercise,
            minutes,
            caloriesPerMinute,
            totalCalories,
            status: values.status,
            source,
            category: 'Flexibilidad',
            pose: values.pose,
            poseNumber: Number(values.poseNumber)
        }
    }
    return null
}

export function createSession(day: WeekDays, exercises: ExerciseInform[], comment: string): RoutineEntry {
    return {
        day,
        exersiceInfo: exercises,
        comment
    }
}

export function formatExerciseDetail(exercise: ExerciseInform): string {
    if (exercise.category === 'Cardio'){
        return `${exercise.rhythm} | Distancia: ${exercise.distance} km`
    }else if (exercise.category === 'Fuerza'){
        return `Volumen: ${exercise.sets * exercise.reps * exercise.weight} kg`
    }
    return `${exercise.poseNumber} poses`
}

export function countBySource(sessions: RoutineEntry[]): SourceCount {
    const allExercises: ExerciseInform[] = sessions.flatMap(session => session.exersiceInfo)
    const api = allExercises.filter(exercise => exercise.source === "api").length
    return {
        local: allExercises.length - api,
        api
    }
}
