import type { ApiResponseBasic, AvailableMuscles, ExercisePreset, ExercisesTypes, InvalidExercise } from "../types/External";
import type { ExerciseCategory } from "../types/Exercises";

export const muscles: AvailableMuscles[] = ["abdominals", "abductors", "adductors", "biceps", "calves", "chest", "forearms", "glutes", "hamstrings", "lats", "lower_back", "middle_back", "neck", "quadriceps", "traps", "triceps"]

export function obtainMuscle(value: string): AvailableMuscles | undefined {
    return muscles.find((muscle) => muscle === value)
}

export function separateExercises(data: unknown[]): {valid: ApiResponseBasic[], invalid: InvalidExercise[]} {
    const valid = data.filter(validExercise)
    const invalid = data
        .filter((exercise) => !validExercise(exercise))
        .map((exercise): InvalidExercise => ({id: crypto.randomUUID(), name: obtainExerciseName(exercise)}))
    return {valid, invalid}
}

export function createPreset(exercise: ApiResponseBasic): ExercisePreset {
    return {nameExercise: exercise.name, category: formatValues(exercise.type)}
}

export function validExercise (exercise: unknown): exercise is ApiResponseBasic {
    const validTypes: ExercisesTypes[] = ["cardio" , "olympic_weightlifting" , "plyometrics" , "powerlifting" , "strength" , "stretching" , "strongman"]
    if (typeof exercise !== "object" || exercise === null){
        return false
    }

    if (!("name" in exercise) || !("type" in exercise) || !("muscle" in exercise)){
        return false
    }

    if (typeof exercise.name !== "string" || typeof exercise.type !== "string" || typeof exercise.muscle !== "string"){
        return false
    }

    if (!(validTypes.some((type)=>type === exercise.type))){
        return false
    }

    if (!(muscles.some((muscle)=>muscle === exercise.muscle))){
        return false
    }

    if ( exercise.name.trim() === "" ||  exercise.type.trim() === "" ||  exercise.muscle.trim() === ""){
        return false
    }

    return true
}


export function obtainExerciseName(exercise: unknown): string {
    if (typeof exercise === "object" && exercise !== null && "name" in exercise && typeof exercise.name === "string" && exercise.name.trim() !== ""){
        return exercise.name
    }
    return "Sin nombre"
}


export function formatValues(exerciseType: ExercisesTypes): ExerciseCategory{
    if (exerciseType === "cardio"){
        return "Cardio"
    }else if ( exerciseType === "stretching"){
        return "Flexibilidad"
    }else if (exerciseType === "olympic_weightlifting" || exerciseType === "plyometrics" || exerciseType === "strongman" || exerciseType === "powerlifting" || exerciseType === "strength"){
        return "Fuerza"
    }else{
        const unmappedType: never = exerciseType
        return unmappedType
    }
}
