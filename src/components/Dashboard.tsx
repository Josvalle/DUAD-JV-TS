import { useState } from "react";
import '../styles/dashboard.css'
import {obtainDayWithMostCalories,exercisesNoComplete,resolveRoutine} from "../funcs/exercisesFunc"
import { useStoreItems } from "../storage/useStore";
import { userStore, exerciseStore, routineStore } from "../storage/stores";
import type { ExerciseInform, StoredRoutine } from '../types/Exercises'
import type { InvalidExercise } from '../types/External'
import type { Section } from '../types/System'
import type { UserPlan } from "../types/Users";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import ExerciseFormInput from "./ExerciseFormInput";
import ExerciseDashboard from "./ExerciseDashboard";
import ExericsesList from "./ExercisesList";
import InstructorPage from "./InstructorPage";
import SystemDashboard from "./SystemDashboard";

const sections: {id: Section, label: string}[] = [
    {id: "dashboard", label: "Dashboard"},
    {id: "profile", label: "Mi perfil"},
    {id: "routine", label: "Mi rutina"},
    {id: "report", label: "Reporte"},
    {id: "instructor", label: "Instructor"}
]


function MainPage(){
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const [authView, setAuthView] = useState<"login" | "register">("login")
    const [section, setSection] = useState<Section>("dashboard")
    const [invalidExercises,setInvalidExercises] = useState<InvalidExercise[]>([])
    const [userPlan] = useState<UserPlan>({
        MembershipLevel: 'Premium',
        StartDate: '08/05/2026',
        UserStatus: 'Activo'
    })

    const users = useStoreItems(userStore)
    const exercises = useStoreItems(exerciseStore)
    const routines = useStoreItems(routineStore)

    const user = users.find((item) => item.id === currentUserId)

    if(user === undefined){
        if (authView === "register"){
            return(
                <UserRegister setCurrentUserId={setCurrentUserId} goToLogin={() => setAuthView("login")} />
            )
        }
        return(
            <UserLogin setCurrentUserId={setCurrentUserId} goToRegister={() => setAuthView("register")} />
        )
    }

    const userExercises = exercises.filter((exercise: ExerciseInform) => exercise.userId === user.id)
    const weekRoutine = resolveRoutine(routines.find((routine: StoredRoutine) => routine.userId === user.id), userExercises)
    const noCompleteExercises = exercisesNoComplete(weekRoutine.sessions)

    function logout(){
        setCurrentUserId(null)
        setAuthView("login")
        setSection("dashboard")
        setInvalidExercises([])
    }

    return(
        <div id="main-container">
            <div id="main-navigation">
                {sections.map((item) => (
                    <button
                        key={item.id}
                        className={section === item.id ? "nav-button nav-button-active" : "nav-button"}
                        onClick={() => setSection(item.id)}
                    >{item.label}</button>
                ))}
                <button className="nav-button" onClick={logout}>Cerrar sesión ({user.name})</button>
            </div>

            {section === "dashboard" && (
                <SystemDashboard />
            )}

            {section === "profile" && (
                <div id="user-information">
                    <div className="profile-container">
                        <h2 id="profile-title">👤 Perfil de Usuario </h2>
                        <p className="profile-info" >Nombre: {user.name}</p>
                        <p className="profile-info" >Edad: {user.age}</p>
                        <p className="profile-info" >Correo Electronico: {user.email}</p>
                        <p className="profile-info" >Nivel: {user.level}</p>
                    </div>
                    <div className="profile-container">
                        <h2 id="plan-title">🏋️‍♂️ Plan Actual</h2>
                        <p className="profile-info">Membresia: {userPlan.MembershipLevel} </p>
                        <p className="profile-info">Fecha de Inicio: {userPlan.StartDate}</p>
                        <p className="profile-info">Estado actual: {userPlan.UserStatus}</p>
                    </div>
                </div>
            )}

            {section === "routine" && (
                <>
                <div id="exercise-container">
                    <ExerciseFormInput
                        userId={user.id}
                        level={user.level}
                        invalidExercises={invalidExercises}
                        setInvalidExercises={setInvalidExercises}
                    />
                </div>
                <div id="exercises-list">
                    <h2>📋 Rutina: {weekRoutine.weekRoutineName}</h2>
                    <ExericsesList exerciseInfo={weekRoutine.sessions}/>
                </div>
                </>
            )}

            {section === "report" && (
                <div id="week-summary">
                    <h2>📊 Carga semanal</h2>
                    <ExerciseDashboard sessions={weekRoutine.sessions} invalidExercises={invalidExercises} />
                    <p className="summary-text">{obtainDayWithMostCalories(weekRoutine.sessions)}</p>
                    {noCompleteExercises.length > 0 && (
                        <div id="container-no-complete-exercises">
                            <h2>Ejercicios no completados: </h2>
                            {noCompleteExercises.map((item: ExerciseInform)=>(
                                <div className="details-no-complete" key={item.id}>
                                    <p>{item.nameExercise}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {section === "instructor" && (
                <div id="instructor-container">
                    <InstructorPage />
                </div>
            )}
        </div>
    )
}

export default MainPage;
