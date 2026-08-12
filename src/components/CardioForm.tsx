import { Field,ErrorMessage } from "formik"

function CardioFields(){
    return(
        <>
            <div className="container-input-exer">
                <label className="label-exer" htmlFor="distance">Distancia: </label>
                <Field id="distance" type="number" className="exercise-user-form" name='distance'  ></Field>
                <ErrorMessage name="distance" component='p'></ErrorMessage>
            </div>
            <div className="container-input-exer">
                <label className="label-exer" htmlFor="FCmax">Frecuencia Cardiaca: </label>
                <Field id="FCmax" type="number" className="exercise-user-form" name='FCmax'  ></Field>
                <ErrorMessage name="FCmax" component='p'></ErrorMessage>
            </div>
        
        
        </>
    )
}

export default CardioFields