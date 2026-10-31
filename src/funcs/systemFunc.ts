import { userStore, exerciseStore, routineStore, activityStore } from "../storage/stores"
import { createExercise, createSession, obtainPace } from "./exercisesFunc"
import type { ExerciseForm2, ExerciseInform, ExerciseSource, StoredRoutine, WeekDays } from "../types/Exercises"
import type { UserForm, UserInformation } from "../types/Users"

export function logActivity(message: string, success: boolean): void {
    activityStore.add({id: activityStore.nextId(), message, success})
}

function obtainUserName(userId: number): string {
    return userStore.findById(userId)?.name ?? "Usuario desconocido"
}

export function emailExists(email: string): boolean {
    return userStore.find((user: UserInformation) => user.email.toLowerCase() === email.trim().toLowerCase()).length > 0
}

export function registerUser(form: UserForm): UserInformation {
    const user: UserInformation = {id: userStore.nextId(), ...form}
    userStore.add(user)
    routineStore.add({id: routineStore.nextId(), userId: user.id, name: form.routine, sessions: []})
    logActivity(`Usuario ${user.name} registrado`, true)
    return user
}

export function loginUser(email: string): UserInformation | undefined {
    const found = userStore.find((user: UserInformation) => user.email.toLowerCase() === email.trim().toLowerCase())
    if (found.length === 0){
        logActivity(`Inicio de sesión fallido, correo ${email} no encontrado`, false)
        return undefined
    }
    return found[0]
}

export function saveExercise(values: ExerciseForm2, source: ExerciseSource, userId: number): number | null {
    const exercise = createExercise(values, source, exerciseStore.nextId(), userId)
    if (exercise === null){
        return null
    }
    exerciseStore.add(exercise)
    logActivity(`${exercise.nameExercise} agregado, ${obtainUserName(userId)}`, true)
    return exercise.id
}

export function discardExercises(ids: number[]): void {
    ids.forEach((id: number) => exerciseStore.remove(id))
}

export function saveSession(userId: number, day: WeekDays, exerciseIds: number[], comment: string): void {
    const routine = routineStore.find((item: StoredRoutine) => item.userId === userId)[0]
    if (routine === undefined){
        logActivity(`Rutina del usuario ID ${userId} no encontrada`, false)
        return
    }
    routineStore.update(routine.id, {sessions: [...routine.sessions, createSession(day, exerciseIds, comment)]})
    logActivity(`Sesión del ${day} guardada, ${obtainUserName(userId)}`, true)
}

export function completeExercise(id: number): void {
    const updated = exerciseStore.update(id, {status: "Completado"})
    if (updated === undefined){
        logActivity(`Ejercicio ID ${id} no encontrado`, false)
        return
    }
    logActivity(`${updated.nameExercise} completado, ${obtainUserName(updated.userId)}`, true)
}

export function deleteExercise(id: number): void {
    const exercise = exerciseStore.findById(id)
    if (exercise === undefined){
        logActivity(`Ejercicio ID ${id} no encontrado`, false)
        return
    }
    exerciseStore.remove(id)
    routineStore
        .find((routine: StoredRoutine) => routine.sessions.some((session) => session.exerciseIds.includes(id)))
        .forEach((routine: StoredRoutine) => {
            routineStore.update(routine.id, {
                sessions: routine.sessions.map((session) => ({...session, exerciseIds: session.exerciseIds.filter((exerciseId: number) => exerciseId !== id)}))
            })
        })
    logActivity(`${exercise.nameExercise} eliminado, ${obtainUserName(exercise.userId)}`, true)
}

export function seedDemoData(): void {
    if (userStore.getAll().length > 0){
        return
    }

    const demoUsers: UserInformation[] = [
        {id: 1, name: "Carlos Mendoza", age: 32, email: "carlos@fittracker.com", level: "expert", routine: "Strength & Cardio Plan"},
        {id: 2, name: "Ana García", age: 28, email: "ana@fittracker.com", level: "intermediate", routine: "Full Body Plan"}
    ]
    demoUsers.forEach((user: UserInformation) => userStore.add(user))

    const demoExercises: ExerciseInform[] = [
        {id: 1, userId: 1, nameExercise: "Running", minutes: 45, caloriesPerMinute: 10, totalCalories: 450, status: "Completado", source: "local", category: "Cardio", distance: 5.2, rhythm: obtainPace(45, 5.2), FCmax: 175},
        {id: 2, userId: 1, nameExercise: "Bench Press", minutes: 30, caloriesPerMinute: 8, totalCalories: 240, status: "Completado", source: "local", category: "Fuerza", sets: 4, reps: 10, weight: 60},
        {id: 3, userId: 1, nameExercise: "Barbell Row", minutes: 45, caloriesPerMinute: 7, totalCalories: 315, status: "Pendiente", source: "api", category: "Fuerza", sets: 4, reps: 10, weight: 80},
        {id: 4, userId: 1, nameExercise: "Pull-up", minutes: 30, caloriesPerMinute: 6, totalCalories: 180, status: "Pendiente", source: "api", category: "Fuerza", sets: 4, reps: 10, weight: 20},
        {id: 5, userId: 2, nameExercise: "Cycling", minutes: 60, caloriesPerMinute: 9, totalCalories: 540, status: "Completado", source: "local", category: "Cardio", distance: 20, rhythm: obtainPace(60, 20), FCmax: 150},
        {id: 6, userId: 2, nameExercise: "Seated Row", minutes: 40, caloriesPerMinute: 6, totalCalories: 240, status: "Pendiente", source: "api", category: "Fuerza", sets: 3, reps: 10, weight: 60},
        {id: 7, userId: 2, nameExercise: "Lat Pulldown", minutes: 35, caloriesPerMinute: 6, totalCalories: 210, status: "Pendiente", source: "api", category: "Fuerza", sets: 3, reps: 10, weight: 50},
        {id: 8, userId: 2, nameExercise: "Yoga Flow", minutes: 40, caloriesPerMinute: 4, totalCalories: 160, status: "Completado", source: "local", category: "Flexibilidad", pose: "Sun Salutation", poseNumber: 12}
    ]
    demoExercises.forEach((exercise: ExerciseInform) => exerciseStore.add(exercise))

    routineStore.add({
        id: 1, userId: 1, name: "Strength & Cardio Plan",
        sessions: [
            {day: "Lunes", exerciseIds: [1, 2], comment: "Buen inicio de semana"},
            {day: "Miercoles", exerciseIds: [3], comment: ""},
            {day: "Viernes", exerciseIds: [4], comment: ""}
        ]
    })
    routineStore.add({
        id: 2, userId: 2, name: "Full Body Plan",
        sessions: [
            {day: "Lunes", exerciseIds: [5], comment: ""},
            {day: "Martes", exerciseIds: [6], comment: ""},
            {day: "Jueves", exerciseIds: [7], comment: ""},
            {day: "Sabado", exerciseIds: [8], comment: "Cierre de semana"}
        ]
    })

    logActivity("Running completado, Carlos Mendoza", true)
    logActivity("Yoga Flow completado, Ana García", true)
}
