import type {WeekDays,ExerciseMaxCalories,RoutineEntry,MaxCaloriesAccumulator} from '../types/Exercises'
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

export function obtainMaxCalories(exercises: RoutineEntry[]): ExerciseMaxCalories {
    const result = exercises.reduce((amount:MaxCaloriesAccumulator, actualExercise:RoutineEntry):MaxCaloriesAccumulator => {
            amount.totalCalories += actualExercise.exersiceInfo.totalCalories;

            if (actualExercise.exersiceInfo.totalCalories > amount.exerciseMax.exersiceInfo.totalCalories) {
                    amount.exerciseMax = actualExercise;
                }

                return amount;
            },
            {totalCalories: 0,exerciseMax: exercises[0]}
        );

    const percentaje = result.exerciseMax.exersiceInfo.totalCalories!==0 ? (result.exerciseMax.exersiceInfo.totalCalories / result.totalCalories) * 100 :0;
    const exerciseObject = {
        name: result.exerciseMax.exersiceInfo.nameExercise,
        calories: result.exerciseMax.exersiceInfo.totalCalories,
        routineTotal:result.totalCalories,
        percentaje: percentaje
    };

    return exerciseObject;
    }

export function obtainAveragePerDay(exercise: RoutineEntry[]):number{
    const trainedday = new Set(exercise.map((entry:RoutineEntry):string=>entry.day))
    
    const amountOfDay = trainedday.size

    const totalCalories = exercise.reduce((count:number,actualC:RoutineEntry)=>{
        count += actualC.exersiceInfo.totalCalories
        return count;
    },0)

        const averageCalories:number = amountOfDay === 0 ? 0 : totalCalories/amountOfDay
        return averageCalories
    }

export function obtainDayWithMostCalories(entries: RoutineEntry[]): string | null {
    const caloriesByDay = entries.reduce((groupedDays:CaloriesByDay, currentEntry:RoutineEntry):CaloriesByDay => {
                const day = currentEntry.day;
                const calories = currentEntry.exersiceInfo.totalCalories;

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
