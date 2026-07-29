import type { ExerciseForm,WeekDays, ExerciseInfo,RoutineEntry,WeekRoutine } from "../types/Exercises";
import * as Yup from 'yup'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import type { Dispatch,SetStateAction } from "react";


const initialExercisesValues:ExerciseForm={
    day:'Domingo',nameExercise:'',minutes:'',caloriesPerMinute:'',distance:''
}


const objectEValidation = Yup.object(
    {
        nameExercise: Yup.string().required('Por favor ingresa el nombre del ejercicio'),
        minutes: Yup.number().required('Por favor ingresa los minutos de ejericio'),
        caloriesPerMinute:Yup.number().required('Por favor ingresa la cantidad de calorias por minuto para este ejericio'),
        day: Yup.mixed<WeekDays>().oneOf(["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],"Elige uno de los niveles disponibles").required("Dia de la semana necesario")
    }
)

interface ExerciseFormAdd{
    setWeekRoutine: Dispatch<SetStateAction<WeekRoutine>>;
    

}


function ExerciseFormInput({setWeekRoutine}:ExerciseFormAdd){
    return(
        <>
        <h2 className="exercise-info"> 📋 Ejercicios registrados </h2>
                    <Formik <ExerciseForm>
                        initialValues={initialExercisesValues}
                        validationSchema={objectEValidation}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={(values, {resetForm})=>{
                                const exerciseValues: ExerciseInfo ={ 
                                        "nameExercise":values.nameExercise, 
                                        "minutes":Number(values.minutes),
                                        "caloriesPerMinute":Number(values.caloriesPerMinute),
                                        "totalCalories":Number(values.caloriesPerMinute)*Number(values.minutes), 
                                        "distance":values.distance === ""? null : Number(values.distance)
                                    };
                                const routineEntry: RoutineEntry ={
                                        "day":values.day,
                                        "exersiceInfo":exerciseValues
                                    };

                                    
                        

                                    
                                    setWeekRoutine(previousRoutine => ({...previousRoutine,exersices: [...previousRoutine.exersices,routineEntry],}));
                                    
                                    resetForm();
                                
                                }}
                    >
                        <Form id="exercise-form">
                            <div id="container-inputs">
                                    <div className="container-input-exer">
                                    <label className="label-exer" htmlFor="day">Dia de la Semana</label>
                                    <Field as='select' id="day" className="exercise-user-form" name='day' >
                                        <option value="Domingo">Domingo</option>
                                        <option value="Lunes">Lunes</option>
                                        <option value="Martes">Martes</option>
                                        <option value="Miercoles">Miercoles</option>
                                        <option value="Jueves">Jueves</option>
                                        <option value="Viernes">Viernes</option>
                                        <option value="Sabado">Sabado</option>
                                    </Field>
                                    <ErrorMessage name="day" component='p'></ErrorMessage>
                                </div>
                                <div className="container-input-exer">
                                    <label className="label-exer" htmlFor="nameExercise">Nombre del Ejercicio: </label>
                                    <Field id="nameExercise"  className="exercise-user-form" name='nameExercise' placeholder='Por favor ingresa el nombre del ejercicio' ></Field>
                                    <ErrorMessage name="nameExercise" component='p'></ErrorMessage>
                                </div>
                                
                                <div className="container-input-exer">
                                    <label className="label-exer" htmlFor="minutes">Minutos de ejercicio: </label>
                                    <Field id="minutes" type="number" className="exercise-user-form" name='minutes' placeholder='Cuantos minutos duro el ejercicio' ></Field>
                                    <ErrorMessage name="minutes" component='p'></ErrorMessage>
                                </div>
                                
                                <div className="container-input-exer">
                                    <label className="label-exer" htmlFor="caloriesPerMinute">Calorias por minuto: </label>
                                    <Field id="caloriesPerMinute" type="number" className="exercise-user-form" name='caloriesPerMinute' placeholder='Por favor ingresa la cantidad de cuántas calorías quema por minuto' ></Field>
                                    <ErrorMessage name="caloriesPerMinute" component='p'></ErrorMessage>
                                </div>
                                
                                <div className="container-input-exer">
                                    <label className="label-exer" htmlFor="distance">Distancia: </label>
                                    <Field id="distance" type="number" className="exercise-user-form" name='distance' placeholder='*Opcional Distancia en km ' ></Field>
                                    <ErrorMessage name="distance" component='p'></ErrorMessage>
                                </div>
                            </div>
                            
                            
                            
                            <button type="submit" id="submit-exercises">Agregar ejercicio</button>

                        </Form>
                    </Formik>
                
        </>
    )
}

export default ExerciseFormInput