import { useState,useMemo } from "react";
import '../styles/dashboard.css'
import type { WeekRoutine, MaxCaloriesAccumulator} from '../types/Exercises'
import type { UserInformation, UserPlan } from "../types/Users";
import UserLogin from "./UserLogin";
import ExerciseFormInput from "./ExerciseFormInput";
import ExerciseDashboard from "./ExerciseDashboard";
import ExericsesList from "./ExercisesList";
import InstructorPage from "./InstructorPage";


function MainPage(){
    const [user, setUser] = useState<UserInformation | null>(null);
    const [WeekRoutine,setWeekRoutine] = useState<WeekRoutine>({
        weekRoutineName: '',
        sessions:[]
    })
    const [userPlan] = useState<UserPlan>({
        MembershipLevel: 'Premium',
        StartDate: '08/05/2026',
        UserStatus: 'Activo'
    })


    
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
                        <p className="profile-info" >Correo Electronico: {user?.email}</p>
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
                </div>
                <div id="exercises-list">
                    <h2>📋 Rutina: {WeekRoutine.weekRoutineName}</h2>
                    <ExericsesList exersiceInfo={WeekRoutine.sessions}/>
                </div>

                <div id="week-summary">
                    <h2>📊 Carga semanal</h2>
                    <ExerciseDashboard sessions={WeekRoutine.sessions}  />
                </div>
                {user === null ? (
                <div >
                    
                </div>): WeekRoutine.sessions.length === 0 ? (
                    <div></div>
                ): (<div id="instructor-container">
                    <InstructorPage user={user} WeekRoutine={WeekRoutine}/>
                </div>
                ) }
                
            </div>
            

        )
    }
    }
    

export default MainPage;