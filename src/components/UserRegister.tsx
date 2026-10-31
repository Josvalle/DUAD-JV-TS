import type { UserLevel,UserForm } from "../types/Users";
import { emailExists, registerUser } from "../funcs/systemFunc";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import type { Dispatch,SetStateAction } from "react";
import * as Yup from 'yup'

const initialUserValues:UserForm={
    name: '', age:0,email:'', level:'beginner',routine:''
}

const objectValidation = Yup.object(
    {
        name: Yup.string().required('Por favor completa todos los campos'),
        age: Yup.number().required('Edad no puede estar en blanco '),
        email: Yup.string().email().required('Email es necesario'),
        level: Yup.mixed<UserLevel>().oneOf(
            ["beginner", "intermediate", "expert"],
            "Elige uno de los niveles disponibles").required("Nivel es obligatorio"),
        routine: Yup.string().required('Por favor completa todos los campos'),
    }
)

interface UserFormRegister {
    setCurrentUserId: Dispatch<SetStateAction<number | null>>;
    goToLogin: () => void;
}


function UserRegister({setCurrentUserId,goToLogin}:UserFormRegister){
    return(
            <div className="user-form">
                <Formik <UserForm>
                    initialValues={initialUserValues}
                    validationSchema={objectValidation}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values,{resetForm,setFieldError})=>{
                        if (emailExists(values.email)){
                            setFieldError("email","Ya existe un usuario con ese correo")
                            return
                        }
                        const newUser = registerUser(values)
                        setCurrentUserId(newUser.id)
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
                            <label htmlFor="email">Correo Electronico: </label>
                            <Field id="email" className="input-user-form" name='email' placehold='Por favor ingresa su correo electronico' ></Field>
                            <ErrorMessage name="email" component='p'></ErrorMessage>
    
                        </div>
                        
                        <div className="div-inside-form">
                            <label htmlFor="level">Experiencia: </label>
                            <Field as='select' id="level" className="input-user-form" name='level' >
                                <option value="beginner">Principiante</option>
                                <option value="intermediate">Intermedio</option>
                                <option value="expert">Avanzado</option>
                            </Field>
                            <ErrorMessage name="level" component='p'></ErrorMessage>
                        </div>
                        
                        <div className="div-inside-form">
                            <label htmlFor="routine">Rutina: </label>
                            <Field id="routine" className="input-user-form" name='routine' placehold='Por favor ingresa tu rutina' ></Field>
                            <ErrorMessage name="routine" component='p'></ErrorMessage>
    
                        </div>
    
                        <button id="submit-button" type="submit"> Registrarme e ingresar</button>
                        <button type="button" className="link-button" onClick={goToLogin}>¿Ya tienes cuenta? Iniciar sesión</button>
                    </Form>
    
                </Formik>
            </div>
        )
}

export default UserRegister