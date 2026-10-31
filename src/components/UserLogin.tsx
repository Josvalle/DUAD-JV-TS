import {Formik, Form, Field, ErrorMessage} from 'formik'
import type { Dispatch,SetStateAction } from "react";
import * as Yup from 'yup'
import { loginUser } from "../funcs/systemFunc";

interface LoginForm {
    email:string;
}

const initialLoginValues:LoginForm={
    email: ''
}

const loginValidation = Yup.object(
    {
        email: Yup.string().email('Ingresa un correo valido').required('Email es necesario'),
    }
)

interface UserFormLogin {
    setCurrentUserId: Dispatch<SetStateAction<number | null>>;
    goToRegister: () => void;
}


function UserLogin({setCurrentUserId,goToRegister}:UserFormLogin){
    return(
            <div className="user-form">
                <Formik <LoginForm>
                    initialValues={initialLoginValues}
                    validationSchema={loginValidation}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values,{setFieldError})=>{
                        const foundUser = loginUser(values.email)
                        if (foundUser === undefined){
                            setFieldError("email","No existe un usuario con ese correo")
                            return
                        }
                        setCurrentUserId(foundUser.id)
                    }}
                >
                    <Form id="user-login-form">
                        <h2>🏋️ FitTracker</h2>
                        <div className="div-inside-form">
                            <label htmlFor="email">Correo Electronico: </label>
                            <Field id="email" className="input-user-form" name='email' ></Field>
                            <ErrorMessage name="email" component='p'></ErrorMessage>
                        </div>

                        <button id="submit-button" type="submit">Iniciar sesión</button>
                        <button type="button" className="link-button" onClick={goToRegister}>¿No tienes cuenta? Registrarme</button>
                        <p className="login-hint">Usuarios de ejemplo: carlos@fittracker.com, ana@fittracker.com</p>
                    </Form>
                </Formik>
            </div>
        )
}

export default UserLogin
