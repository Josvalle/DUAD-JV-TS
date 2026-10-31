import { Store } from "./Store"
import type { ExerciseInform, StoredRoutine } from "../types/Exercises"
import type { UserInformation } from "../types/Users"
import type { ActivityEntry } from "../types/System"

export const userStore = new Store<UserInformation>()
export const exerciseStore = new Store<ExerciseInform>()
export const routineStore = new Store<StoredRoutine>()
export const activityStore = new Store<ActivityEntry>()
