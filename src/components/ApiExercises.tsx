import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { callAPI } from "../services/ApiCall"
import { formatValues, obtainExerciseName, obtainMuscle, separateExercises, createPreset, muscles } from "../funcs/APIValidations"
import type { ApiResponseBasic, AvailableMuscles, ExercisePreset } from "../types/External"
import type { UserLevel } from "../types/Users"

interface ApiExercisesProps {
    level: UserLevel;
    setPreset: Dispatch<SetStateAction<ExercisePreset | null>>;
    setInvalidNames: Dispatch<SetStateAction<string[]>>;
}

function ApiExercises({level, setPreset, setInvalidNames}: ApiExercisesProps){
    const [muscle, setMuscle] = useState<AvailableMuscles>("chest")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [valid, setValid] = useState<ApiResponseBasic[]>([])
    const [invalid, setInvalid] = useState<unknown[]>([])
    const [searched, setSearched] = useState<boolean>(false)

    async function search(){
        setLoading(true)
        setError("")
        try {
            const data = await callAPI(muscle, level)
            const separated = separateExercises(data)
            setValid(separated.valid)
            setInvalid(separated.invalid)
            const names = separated.invalid.map(obtainExerciseName)
            setInvalidNames(previous => [...previous, ...names.filter(name => !previous.includes(name))])
            setSearched(true)
        } catch {
            setError("No se pudo conectar con la API, puedes seguir usando tus ejercicios locales")
        } finally {
            setLoading(false)
        }
    }

    function chooseExercise(exercise: ApiResponseBasic){
        setPreset(createPreset(exercise))
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
                    {valid.map((exercise, index) => (
                        <div key={index} className="api-exercise">
                            <p>{exercise.name}, {formatValues(exercise.type)} | validado</p>
                            <button className="submit-exercises" onClick={() => chooseExercise(exercise)}>Agregar</button>
                        </div>
                    ))}

                    <h3>⚠️ Ejercicios con datos incompletos ({invalid.length})</h3>
                    {invalid.map((exercise, index) => (
                        <p key={index}>{obtainExerciseName(exercise)}, campos requeridos faltantes</p>
                    ))}
                </>
            )}
        </div>
    )
}

export default ApiExercises
