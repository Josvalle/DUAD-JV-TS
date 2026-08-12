import { Field,ErrorMessage } from "formik"

function StrenghtFields(){
    return(
        <>
            <div className="container-input-exer">
                <label className="label-exer" htmlFor="sets">Series: </label>
                <Field id="sets" type="number" className="exercise-user-form" name='sets'  ></Field>
                <ErrorMessage name="sets" component='p'></ErrorMessage>
            </div>
            <div className="container-input-exer">
                <label className="label-exer" htmlFor="reps">Repeticiones: </label>
                <Field id="reps" type="number" className="exercise-user-form" name='reps'  ></Field>
                <ErrorMessage name="reps" component='p'></ErrorMessage>
            </div>
            <div className="container-input-exer">
                <label className="label-exer" htmlFor="weight">Peso: </label>
                <Field id="weight" type="number" className="exercise-user-form" name='weight'  ></Field>
                <ErrorMessage name="weight" component='p'></ErrorMessage>
            </div>
        </>
    )
}


export default StrenghtFields