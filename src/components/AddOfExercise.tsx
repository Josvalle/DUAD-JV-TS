import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import type {FormikProps} from 'formik'
import CardioFields from "./CardioForm";
import StrenghtFields from "./StrenghtFields";
import FlexFlields from "./FlexFlieds";
import { obtainPace } from "../funcs/exersicesFunc";
import type { ExerciseForm2,ExerciseCategory, ExerciseInform,ExerciseStatus  } from "../types/Exercises";
import type { Dispatch, SetStateAction } from 'react';


const initialValues:ExerciseForm2={
    category: "",
    nameExercise: "",
    minutes: "",
    caloriesPerMinute:"",
    status:"No Completado",


    distance: "",
    FCmax:"",

    sets:"",
    reps:"",
    weight:"",

    pose: "",
    poseNumber:"",
}


const objectEValidation = Yup.object(
    {
        nameExercise: Yup.string().required('Por favor ingresa el nombre del ejercicio'),
        minutes: Yup.number().required('Por favor ingresa los minutos de ejericio'),
        caloriesPerMinute:Yup.number().required('Por favor ingresa la cantidad de calorias por minuto para este ejericio'),
        category: Yup.mixed<ExerciseCategory>().oneOf(["Cardio","Flexibilidad","Fuerza"],
            "Elige una de las categorias disponibles").required("Categoria Necesaria"),
        status: Yup.mixed<ExerciseStatus>().oneOf(['Completado','No Completado'],
            "Elige uno de los estados para completar el ejercicio").required('Estado del ejercicio es obligatorio'),
        distance: Yup.number().when("category",{
            is:"Cardio",
            then: (schema: Yup.NumberSchema)=> schema.required("La distancia es obligatoria"),
            otherwise: (schema:Yup.NumberSchema)=> schema.notRequired()
        }),
        FCmax: Yup.number().when("category",{
            is:"Cardio",
            then:(schema:Yup.NumberSchema)=> schema.required("La frecuencia cardiaca es obligatoria"),
            otherwise:(schema:Yup.NumberSchema)=> schema.notRequired(),
        }),
        sets: Yup.number().when("category",{
            is: "Fuerza",
            then:(schema: Yup.NumberSchema)=>schema.required("Numero de series es Necesario"),
            otherwise:(schema: Yup.NumberSchema)=> schema.notRequired()
        }),
        reps: Yup.number().when("category",{
            is: "Fuerza",
            then:(schema: Yup.NumberSchema)=> schema.required("Numero de repeticiones es Necesario"),
            otherwise:(schema: Yup.NumberSchema)=> schema.notRequired()
        }),
        weight: Yup.number().when("category",{
            is:"Fuerza",
            then:(schema: Yup.NumberSchema)=>schema.required("Peso usado en el ejercicio es Necesario")
        }),
        pose: Yup.string().when("category",{
            is:"Flexibilidad",
            then:(schema: Yup.StringSchema)=>schema.required("Nombre de la Pose es obligatoria"),
            otherwise:(schema:Yup.StringSchema)=>schema.notRequired()
        }),
        poseNumber: Yup.number().when("category",{
            is:"Flexibilidad",
            then:(schema: Yup.NumberSchema)=> schema.required("Numer de Posiciones es obligatoria"),
            otherwise:(schema:Yup.NumberSchema)=> schema.notRequired()
        })


    }
)

interface AddExercises{
    setExercises:Dispatch<SetStateAction<ExerciseInform[]>>
}


function AddOfExercises({setExercises}:AddExercises){
    return(
        <Formik <ExerciseForm2>
                        initialValues={initialValues}
                        validationSchema={objectEValidation}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={(values, {resetForm})=>{
                                
                                
                                let exerciseValues:ExerciseInform;

                                if(values.category === 'Cardio'){
                                    exerciseValues = {
                                        "nameExercise":values.nameExercise, 
                                        "minutes":Number(values.minutes),
                                        "caloriesPerMinute":Number(values.caloriesPerMinute),
                                        "totalCalories":Number(values.caloriesPerMinute)*Number(values.minutes),
                                        "status":values.status,
                                        "category":'Cardio',
                                        "distance":Number(values.distance),
                                        "rhythm":obtainPace(Number(values.minutes),Number(values.distance)),
                                        "FCmax":Number(values.FCmax)
                                    }
                                    
                                }else if (values.category === 'Fuerza'){
                                    exerciseValues = {
                                        "nameExercise":values.nameExercise, 
                                        "minutes":Number(values.minutes),
                                        "caloriesPerMinute":Number(values.caloriesPerMinute),
                                        "totalCalories":Number(values.caloriesPerMinute)*Number(values.minutes),
                                        "status":values.status, 
                                        "category":'Fuerza',
                                        "sets":Number(values.sets),
                                        "reps":Number(values.reps),
                                        "weight":Number(values.weight)
                                    }
                                }else if (values.category === 'Flexibilidad'){
                                    exerciseValues = {
                                        "nameExercise":values.nameExercise, 
                                        "minutes":Number(values.minutes),
                                        "caloriesPerMinute":Number(values.caloriesPerMinute),
                                        "totalCalories":Number(values.caloriesPerMinute)*Number(values.minutes),
                                        "status":values.status, 
                                        "category":'Flexibilidad',
                                        "pose":values.pose,
                                        "poseNumber":Number(values.poseNumber)
                                    
                                    }
                                }else{
                                    return
                                }
                                
                                setExercises((previous)=> [...previous,exerciseValues])

                                resetForm();
                                
                                }}
                    >{(formik: FormikProps<ExerciseForm2>)=>(
                        <Form id="exercise-form">
                            <div id="container-inputs">
                                <div className="container-input-exer">
                                    <label className="label-exer" htmlFor="category">Selecciona una Categoria</label>
                                    <Field as='select' id="category" className="exercise-user-form" name='category'>
                                        <option value="">Selecciona una Categoria</option>
                                        <option value="Cardio">Cardio</option>
                                        <option value="Fuerza">Fuerza</option>
                                        <option value="Flexibilidad">Flexibilidad</option>
                                    </Field>
                                </div>

                                {formik.values.category !== "" && (
                                    <>
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
                                            <Field id="caloriesPerMinute" type="number" className="exercise-user-form" name='caloriesPerMinute' placeholder='Cantidad de cuántas calorías quema por minuto' ></Field>
                                            <ErrorMessage name="caloriesPerMinute" component='p'></ErrorMessage>
                                        </div>
                                        <div className="container-input-exer">
                                            <label className="label-exer" htmlFor="status">Estado del Ejercicio: </label>
                                            <Field as='select' id="status" className="exercise-user-form" name='status' >
                                                <option value="No Completado">No Completado</option>
                                                <option value="Completado">Completado</option>
                                            </Field>
                                            <ErrorMessage name="status" component='p'></ErrorMessage>
                                        </div>
                                    </>
                                )}
                                
                                {formik.values.category === "Cardio" && (
                                    <CardioFields />
                                )}
                                {formik.values.category === "Fuerza" && (
                                    <StrenghtFields />
                                )}
                                {formik.values.category === "Flexibilidad" && (
                                    <FlexFlields />
                                )}
                            </div>
                            
                            
                            
                            <button 
                            type="submit" 
                            className="submit-exercises"
                            
                            >Agregar ejercicio</button>

                        </Form>
                    )}
                        
                    </Formik>
    )
    
}


export default AddOfExercises