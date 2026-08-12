import { useState,useMemo } from "react";
import '../styles/dashboard.css'
import type {RoutineEntry, WeekRoutine} from '../types/Exercises'
import type { UserInformation, UserPlan } from "../types/Users";
import UserLogin from "./UserLogin";
import ExerciseFormInput from "./ExerciseFormInput";
import ExerciseDashboard from "./ExerciseDashboard";
import { obtainSpendTime,obtainDayWithMostCalories, obtainAveragePerDay,obtainMaxCalories } from "../funcs/exersicesFunc";




function MainPage(){
    const [user, setUser] = useState<UserInformation | null>(null);
    const [WeekRoutine,setWeekRoutine] = useState<WeekRoutine>({
        name: '',
        exersices:[]
    })
    const [userPlan] = useState<UserPlan>({
        MembershipLevel: 'Premium',
        StartDate: '08/05/2026',
        UserStatus: 'Activo'
    })

    const maxCalories = useMemo(() => {
        if (WeekRoutine.exersices.length === 0) {
            return null;
        }

        return obtainMaxCalories(WeekRoutine.exersices);
    }, [WeekRoutine.exersices]);


    const maxTime = useMemo(() => {
        if (WeekRoutine.exersices.length === 0) {
            return null;
        }

        return WeekRoutine.exersices.reduce(
            (longestExercise:RoutineEntry, currentExercise:RoutineEntry):RoutineEntry => currentExercise.exersiceInfo.minutes > longestExercise.exersiceInfo.minutes
                    ? currentExercise
                    : longestExercise
                );
            }, [WeekRoutine.exersices]);

    if(user === null){
        return(
            <UserLogin  
        setUser={setUser} 
        setWeekRoutine={setWeekRoutine} 
        WeekRoutine={WeekRoutine} />
        )
        
    }else {
        return(
            <div id="main-container">
                <div id="user-information">
                    <div className="profile-container">
                        <h2 id="profile-title">👤 Perfil de Usuario </h2>
                        <p className="profile-info" >Nombre: {user?.name}</p>
                        <p className="profile-info" >Edad: {user?.age}</p>
                        <p className="profile-info" >Nivel: {user?.level}</p>
                    </div>
                    <div className="profile-container">
                        <h2 id="plan-title">🏋️‍♂️ Plan Actual</h2>
                        <p className="profile-info">Membresia: {userPlan?.MembershipLevel} </p>
                        <p className="profile-info">Fecha de Inicio: {userPlan?.StartDate}</p>
                        <p className="profile-info">Estado actual: {userPlan?.UserStatus}</p>
                    </div>
                </div>
                
                <div id="exercise-container">
                    
                    <ExerciseFormInput 
                        setWeekRoutine={setWeekRoutine}
                    />
                    <div id="exercises-list">
                        <ExerciseDashboard exersiceInfo={WeekRoutine.exersices}/>
                    </div>
                </div>
                <div id='average-container'>
                    <h2>📊 Resumen comparativo</h2>
                    <div id="stats-containter" >
                            <div id="contain-week-routine">
                            <h3 id="routine-name">Rutina: {WeekRoutine.name}</h3>
                            <p id="average-per-day" >Promedio por dia entrenado: {obtainAveragePerDay(WeekRoutine.exersices).toFixed(2)} Calorias</p>
                            <p id="routine-total">Total de Calorias: {maxCalories?.routineTotal}</p>
                        </div>
                        <div id="contain-exercises-stats" >
                            {maxTime ? (<p className="summary-text" >Mayor duración: {maxTime.exersiceInfo.nameExercise} ({obtainSpendTime(maxTime.exersiceInfo.minutes)})</p>) : (<p className="summary-text">No hay ejercicios registrados</p>)}
                            {maxCalories ? (<p className="summary-text" > Mas Calorias: {maxCalories?.name} ({maxCalories?.calories} Cal, {maxCalories?.percentaje.toFixed(2)}% del total)</p>): (<p className="summary-text">No hay ejercicios registrados</p>)}
                            <p className="summary-text">{obtainDayWithMostCalories(WeekRoutine.exersices)}</p>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            

        )
    }
    }
    

export default MainPage;