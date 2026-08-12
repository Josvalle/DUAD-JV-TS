import type { UserLevel,UserInformation,UserForm } from "../types/Users";
import type { WeekRoutine } from "../types/Exercises";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import type { Dispatch,SetStateAction } from "react";
import * as Yup from 'yup'

const initialUserValues:UserForm={
    name: '', age:0, level:'Principiante',routine:''
}

const objectValidation = Yup.object(
    {
        name: Yup.string().required('Por favor completa todos los campos'),
        age: Yup.number().required('Edad no puede estar en blanco '),
        level: Yup.mixed<UserLevel>().oneOf(
            ["Principiante", "Intermedio", "Avanzado"],
            "Elige uno de los niveles disponibles").required("Nivel es obligatorio"),
        routine: Yup.string().required('Por favor completa todos los campos'),
    }
)

interface UserFormLogin {
    setUser: Dispatch<SetStateAction<UserInformation | null >>;
    setWeekRoutine: Dispatch<SetStateAction<WeekRoutine>>;
    WeekRoutine: WeekRoutine;
}


function UserLogin({setUser,setWeekRoutine,WeekRoutine}:UserFormLogin){
    return(
            <div className="user-form">
                <Formik <UserForm>
                    initialValues={initialUserValues}
                    validationSchema={objectValidation}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values,{resetForm})=>{
                        const idValue = Date.now
                        const newValues = {
                            id: Number(idValue),
                            ...values
                        }
                        setUser(newValues)
                        setWeekRoutine({...WeekRoutine,name:values.routine})
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
                            <Field id="age" type="number" className="input-user-form" name='age' placehold='Por favor ingresa tu edad' ></Field>
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
                        
                        <div className="div-inside-form">
                            <label htmlFor="routine">Rutina: </label>
                            <Field id="routine" className="input-user-form" name='routine' placehold='Por favor ingresa tu rutina' ></Field>
                            <ErrorMessage name="routine" component='p'></ErrorMessage>
    
                        </div>
    
                        <button id="submit-button" type="submit"> Ingresar a App</button>
                    </Form>
    
                </Formik>
            </div>
        )
}

export default UserLogin