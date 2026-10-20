import axios from 'axios'
import type { AvailableMuscles } from '../types/External'
import type { UserLevel } from '../types/Users'

export async function callAPI(muscle:AvailableMuscles,difficulty:UserLevel): Promise<unknown[]>{
    const ApiURL = import.meta.env.VITE_NINJA_API
    const ApiKey = import.meta.env.VITE_API_KEY
    
    const exercisesApi = await axios.get<unknown[]>(`${ApiURL}muscle=${muscle}&difficulty=${difficulty}`,{
        headers:{
            'X-Api-Key': ApiKey
        }})
        return exercisesApi.data
    
    
}

