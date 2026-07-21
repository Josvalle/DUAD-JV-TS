import { useState } from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import '../styles/dashboard.css'

type UserLevel = "Principiante" | "Intermedio" | "Avanzado"

type WeekDays = "Domingo" | "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes" | "Sabado"

interface RoutineEntry  {
    exerciseName:string;
    day:WeekDays
}

interface WeekRutine {
    name:string;
    exersices:RoutineEntry[]
}

interface UserInformation {
    name:string;
    age:number;
    level:UserLevel;
}

interface ExerciseInfo {
    nameE:string;
    minutes:number;
    totalCalories:number;
    distance: number | null;

}

interface ExerciseForm {
    nameE:string;
    minutes:number | string;
    caloriesPerMinute:number | string;
    distance: number | string;
}

interface ExerciseMaxCalories {
    name: string;
    calories:number;
    percentaje:number;
}



const initialUserValues:UserInformation={
    name: '', age:0, level:'Principiante'
}

const initialExercisesValues:ExerciseForm={
    nameE:'',minutes:'',caloriesPerMinute:'',distance:''
}

const objectValidation = Yup.object(
    {
        name: Yup.string().required('Por favor completa todos los campos'),
        age: Yup.number().required('Edad no puede estar en blanco '),
        level: Yup.mixed<UserLevel>().oneOf(
            ["Principiante", "Intermedio", "Avanzado"],
            "Elige uno de los niveles disponibles").required("Nivel es obligatorio")
    }
)

const objectEValidation = Yup.object(
    {
        nameE: Yup.string().required('Por favor ingresa el nombre del ejercicio'),
        minutes: Yup.number().required('Por favor ingresa los minutos de ejericio'),
        caloriesPerMinute:Yup.number().required('Por favor ingresa la cantidad de calorias por minuto para este ejericio'),
    }
)

function ConvertMinutes(totalMinutes:number):string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h a ${minutes}m`;
}

function ConvertMeters(totalMinutes:number, totalMeters:number,):string {
    const kilometers = totalMeters / 1000;
    const pace = totalMinutes/kilometers
    return `Ritmo: ${pace.toFixed(2)} min/km`;
}

function obtainMaxCalories(exercises: ExerciseInfo[]): ExerciseMaxCalories {
    const result = exercises.reduce((amount, actualExercise) => {
            amount.totalCalories += actualExercise.totalCalories;

            if (actualExercise.totalCalories > amount.exerciseMax.totalCalories) {
                    amount.exerciseMax = actualExercise;
                }

                return amount;
            },
            {totalCalories: 0,exerciseMax: exercises[0]}
        );

    const percentaje = (result.exerciseMax.totalCalories / result.totalCalories) * 100;
    const exerciseObject: ExerciseMaxCalories = {
        name: result.exerciseMax.nameE,
        calories: result.exerciseMax.totalCalories,
        percentaje: percentaje
    };

    return exerciseObject;
    }

function MainPage(){
    const [user, setUser] = useState<UserInformation | null>(null);
    const [userLogin, setUserLogin] = useState <boolean>(false);
    const [exercises, setExercises] = useState<ExerciseInfo[]>([])
    const [maxCalories, setMaxCalories]= useState<ExerciseMaxCalories | null>(null)
    const [maxTime, setMaxTime]=useState<ExerciseInfo | null>(null)

    if(userLogin === false){
        return(
        <div className="user-form">
            <Formik <UserInformation>
                initialValues={initialUserValues}
                validationSchema={objectValidation}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values,{resetForm})=>{
                    setUser(values)
                    setUserLogin(true)
                    resetForm()
                }
                }
            
            >
                <Form id="user-login-form">
                    <div className="div-inside-form">
                        <label htmlFor="name">Nombre: </label>
                        <Field id="name" className="input-user-form" name='name' placehold='Por favor ingresa tu nombre' ></Field>
                        <ErrorMessage name="name" component='p'></ErrorMessage>

                    </div>
                    
                    <div className="div-inside-form">
                        <label htmlFor="age">Edad: </label>
                        <Field id="age" className="input-user-form" name='age' placehold='Por favor ingresa tu edad' ></Field>
                        <ErrorMessage name="age" component='p'></ErrorMessage>

                    </div>
                    
                    <div className="div-inside-form">
                        <label htmlFor="level">Experiencia: </label>
                        <Field as='select' id="level" className="input-user-form" name='level' >
                            <option value="Principiante">Principiante</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Avanzado">Avanzado</option>
                        </Field>
                        <ErrorMessage name="level" component='p'></ErrorMessage>
                    </div>
                    

                    <button id="submit-button" type="submit"> Ingresar a App</button>
                </Form>

            </Formik>
        </div>
    )
    }else if(userLogin === true){
        return(
            <div id="main-container">
                <div id="profile-container">
                    <h2 id="profile-title">👤 Perfil de Usuario </h2>
                    <p className="profile-info" >Nombre: {user?.name}</p>
                    <p className="profile-info" >Edad: {user?.age}</p>
                    <p className="profile-info" >Nivel: {user?.level}</p>
                </div>
                <div id="exercise-container">
                    <h2 className="exercise-info"> 📋 Ejercicios registrados </h2>
                    <Formik <ExerciseForm>
                        initialValues={initialExercisesValues}
                        validationSchema={objectEValidation}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={(values, {resetForm})=>{
                                const newValues: ExerciseInfo ={ 
                                        "nameE":values.nameE, 
                                        "minutes":Number(values.minutes), 
                                        "totalCalories":Number(values.caloriesPerMinute)*Number(values.minutes), 
                                        "distance":values.distance === ""? null : Number(values.distance)
                                    }

                                    const newExercises = [...exercises,newValues]
                                    setExercises(newExercises)

                                    const lookMaxCalories = obtainMaxCalories(newExercises)

                                    const lookMaxtime = newExercises.reduce((maxTime,actualTime)=>
                                        actualTime.minutes > maxTime.minutes ? actualTime : maxTime
                                    )


                                    setMaxCalories(lookMaxCalories)
                                    setMaxTime(lookMaxtime)
                                    resetForm()
                                
                                }}
                    >
                        <Form id="exercise-form">
                            <div className="container-input-exer">
                                <label className="label-exer" htmlFor="nameE">Nombre del Ejercicio: </label>
                                <Field id="nameE" className="exercise-user-form" name='nameE' placehold='Por favor ingresa el nombre del ejercicio' ></Field>
                                <ErrorMessage name="nameE" component='p'></ErrorMessage>
                            </div>
                            
                            <div className="container-input-exer">
                                <label className="label-exer" htmlFor="minutes">Minutos de ejercicio: </label>
                                <Field id="minutes" className="exercise-user-form" name='minutes' placehold='Cuantos minutos duro el ejercicio' ></Field>
                                <ErrorMessage name="minutes" component='p'></ErrorMessage>
                            </div>
                            
                            <div className="container-input-exer">
                                <label className="label-exer" htmlFor="caloriesPerMinute">Calorias por minuto: </label>
                                <Field id="caloriesPerMinute" className="exercise-user-form" name='caloriesPerMinute' placehold='Por favor ingresa la cantidad de cuántas calorías quema por minuto' ></Field>
                                <ErrorMessage name="caloriesPerMinute" component='p'></ErrorMessage>
                            </div>
                            
                            <div className="container-input-exer">
                                <label className="label-exer" htmlFor="distance">Distancia: </label>
                                <Field id="distance" className="exercise-user-form" name='distance' placeholder='*Opcional Distancia en mts ' ></Field>
                                <ErrorMessage name="distance" component='p'></ErrorMessage>
                            </div>
                            
                            
                            <button type="submit" id="submit-exercises">Agregar ejercicio</button>

                        </Form>
                    </Formik>

                    <div id="exercises-list">

                        <table id="exercises-table">
                            <thead id="exercise-table">
                                <tr id='th-containers'>
                                    <th className="th-exercise">Ejercicio</th>
                                    <th className="th-exercise">Mintuos de Ejercico</th>
                                    <th className="th-exercise">Ritmo</th>
                                    <th className="th-exercise">Calorias Quemadas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    exercises.map((exercises)=>(
                                        <tr key={exercises.nameE}className="exercise-row">
                                            <td className="value-exer">{exercises.nameE}</td>
                                            <td className="value-exer">{ConvertMinutes(exercises.minutes)}</td>
                                            <td className="value-exer">{exercises.distance === null? ',' : ConvertMeters(exercises.minutes,exercises.distance)}</td>
                                            <td className="value-exer">{exercises.totalCalories}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id='average-container'>
                    <h2>📊 Resumen comparativo</h2>
                    {maxTime ? (<p className="summary-text" >Mayor duración: {maxTime.nameE} ({ConvertMinutes(maxTime.minutes)})</p>) : (<p className="summary-text">No hay ejercicios registrados</p>)}
                    <p className="summary-text" > Mas Calorias: {maxCalories?.name} ({maxCalories?.calories} Cal, {maxCalories?.percentaje.toFixed(2)}% del total)</p>
                </div>
            </div>
            

        )
    }
    }
    

export default MainPage;