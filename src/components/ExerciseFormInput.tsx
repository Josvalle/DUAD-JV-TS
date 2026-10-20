import type { WeekDays, WeekRoutine, ExerciseInform  } from "../types/Exercises";
import { useState, type Dispatch,type SetStateAction } from "react";
import AddOfExercises from "./AddOfExercise";
import ApiExercises from "./ApiExercises";
import { createSession, obtainDay } from "../funcs/exersicesFunc";
import type { ExercisePreset } from "../types/External";
import type { UserLevel } from "../types/Users";
import '../styles/dashboard.css'



interface ExerciseFormAdd{
    setWeekRoutine: Dispatch<SetStateAction<WeekRoutine>>;
    level: UserLevel;
    setInvalidNames: Dispatch<SetStateAction<string[]>>;


}




function ExerciseFormInput({setWeekRoutine,level,setInvalidNames}:ExerciseFormAdd){
    const [day,setDay] = useState<WeekDays>("");
    const [exercises,setExercises] = useState<ExerciseInform[]>([])
    const [comment,setComment] = useState<string>("")
    const [source,setSource] = useState<"local" | "api">("local")
    const [preset,setPreset] = useState<ExercisePreset | null>(null)

    function AddSession(){
        
        const session = createSession(day, exercises, comment)
        
        setWeekRoutine(previousRoutine => ({...previousRoutine,sessions: [...previousRoutine.sessions,session]}));
        
        setDay(""),
        setExercises([]),
        setComment("")
        setPreset(null)
        setSource("local")
    }

    return(
        <div id='form-container-exercises'>
            <h2 className="exercise-info"> 📋 Crear una Sesion de Ejercicio</h2>
            <label className="label-exer" htmlFor="day">Dia de la Semana: </label>
            <select id="day" className="exercise-user-form" 
                    value={day} 
                    disabled = {day !== ""}
                    onChange={(e)=> setDay(obtainDay(e.target.value) ?? "")}
                >
                <option value="">Selecciona un dia: </option>
                <option value="Domingo">Domingo</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miercoles">Miercoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sabado">Sabado</option>
            </select>
            {day !== "" && (
                <>
                <div className="buttons-exercises-input">
                    <button className="submit-exercises" onClick={()=>{setSource("local"); setPreset(null)}}>Ejercicios locales</button>
                    <button className="submit-exercises" onClick={()=>{setSource("api"); setPreset(null)}}>Ejercicios de la API</button>
                </div>

                {source === "api" && (
                    <div hidden={preset !== null}>
                        <ApiExercises level={level} setPreset={setPreset} setInvalidNames={setInvalidNames}/>
                    </div>
                )}

                {(source === "local" || preset !== null) && (
                    <AddOfExercises
                    setExercises={setExercises}
                    setPreset={setPreset}
                    preset={preset} />
                )}

                <textarea className="comment-area" value={comment} onChange={(e)=> setComment(e.target.value)}/>
                <div className="buttons-exercises-input">
                    <button className="submit-exercises" onClick={AddSession}>Terminar Session</button>
                    <button className="submit-exercises" onClick={()=>setDay("")}>Cancelar</button>
                </div>
                
                </>


            )}
        </div>
        
                
                
        
    )
}

export default ExerciseFormInput