import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { callAPI } from "../services/ApiCall"
import { formatValues, obtainMuscle, separateExercises, createPreset, muscles } from "../funcs/APIValidations"
import type { ApiResponseBasic, AvailableMuscles, ExercisePreset, InvalidExercise } from "../types/External"
import type { UserLevel } from "../types/Users"

interface ApiExercisesProps {
    level: UserLevel;
    setPreset: Dispatch<SetStateAction<ExercisePreset | null>>;
    invalidExercises: InvalidExercise[];
    setInvalidExercises: Dispatch<SetStateAction<InvalidExercise[]>>;
}

function ApiExercises({level, setPreset, invalidExercises, setInvalidExercises}: ApiExercisesProps){
    const [muscle, setMuscle] = useState<AvailableMuscles>("chest")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [valid, setValid] = useState<ApiResponseBasic[]>([])
    const [searched, setSearched] = useState<boolean>(false)

    async function search(){
        setLoading(true)
        setError("")
        try {
            const data = await callAPI(muscle, level)
            const separated = separateExercises(data)
            setValid(separated.valid)
            setInvalidExercises(separated.invalid)
            setSearched(true)
        } catch (error) {
            const reason = error instanceof Error ? error.message : "error desconocido"
            setError(`No se pudo completar la búsqueda (${reason}). Puedes seguir usando tus ejercicios locales`)
        } finally {
            setLoading(false)
        }
    }

    function chooseExercise(exercise: ApiResponseBasic){
        setPreset(createPreset(exercise))
    }

    function discardExercise(id: string){
        setInvalidExercises(previous => previous.filter(exercise => exercise.id !== id))
    }

    return(
        <div id="api-container">
            <label className="label-exer" htmlFor="muscle">Grupo muscular: </label>
            <select id="muscle" className="exercise-user-form" value={muscle} onChange={(e) => {
                const selected = obtainMuscle(e.target.value)
                if (selected !== undefined){
                    setMuscle(selected)
                }
            }}>
                {muscles.map((item) => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
            <button className="submit-exercises" onClick={search} disabled={loading}>Buscar</button>

            {loading && <p>Buscando ejercicios...</p>}
            {error !== "" && <p>{error}</p>}

            {searched && !loading && (
                <>
                    <h3>✅ Ejercicios validados ({valid.length})</h3>
                    {valid.map((exercise) => (
                        <div key={exercise.name} className="api-exercise">
                            <p>{exercise.name}, {formatValues(exercise.type)} | validado</p>
                            <button className="submit-exercises" onClick={() => chooseExercise(exercise)}>Agregar</button>
                        </div>
                    ))}

                    <h3>⚠️ Ejercicios con datos incompletos ({invalidExercises.length})</h3>
                    {invalidExercises.map((exercise) => (
                        <div key={exercise.id} className="api-exercise">
                            <p>{exercise.name}, campos requeridos faltantes</p>
                            <button className="submit-exercises" onClick={() => discardExercise(exercise.id)}>Descartar</button>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default ApiExercises
