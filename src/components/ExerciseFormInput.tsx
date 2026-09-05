import type { WeekDays, WeekRoutine, ExerciseInform,RoutineEntry  } from "../types/Exercises";
import { useState, type Dispatch,type SetStateAction } from "react";
import AddOfExercises from "./AddOfExercise";
import '../styles/dashboard.css'



interface ExerciseFormAdd{
    setWeekRoutine: Dispatch<SetStateAction<WeekRoutine>>;
    

}




function ExerciseFormInput({setWeekRoutine}:ExerciseFormAdd){
    const [day,setDay] = useState<WeekDays>("");
    const [exercises,setExercises] = useState<ExerciseInform[]>([])
    const [comment,setComment] = useState<string>("")

    function AddSession(){
        
        const session: RoutineEntry = {
            day,
            exersiceInfo:exercises,
            comment
        }
        
        setWeekRoutine(previousRoutine => ({...previousRoutine,sessions: [...previousRoutine.sessions,session]}));
        
        setDay(""),
        setExercises([]),
        setComment("")
    }

    return(
        <div id='form-container-exercises'>
            <h2 className="exercise-info"> 📋 Crear una Sesion de Ejercicio</h2>
            <label className="label-exer" htmlFor="day">Dia de la Semana: </label>
            <select id="day" className="exercise-user-form" 
                    value={day} 
                    disabled = {day !== ""}
                    onChange={(e)=> setDay(e.target.value as WeekDays)}
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
                <AddOfExercises
                setExercises={setExercises} />

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