import axios from 'axios'
import type { AvailableMuscles } from '../types/External'
import type { UserLevel } from '../types/Users'

export async function callAPI(muscle:AvailableMuscles,difficulty:UserLevel): Promise<unknown[]>{
    const apiUrl: string | undefined = import.meta.env.VITE_NINJA_API
    const apiKey: string | undefined = import.meta.env.VITE_API_KEY

    if (!apiUrl || !apiKey){
        throw new Error("Faltan las variables de entorno VITE_NINJA_API o VITE_API_KEY")
    }

    const exercisesApi = await axios.get<unknown[]>(apiUrl,{
        params:{
            muscle,
            difficulty
        },
        headers:{
            'X-Api-Key': apiKey
        }})
    return exercisesApi.data
}
