import { Field,ErrorMessage } from "formik"

function FlexFlields(){
    return(
        <>
            <div className="container-input-exer">
                <label className="label-exer" htmlFor="pose">Nombre de Pose: </label>
                <Field id="pose"  className="exercise-user-form" name='pose'  ></Field>
                <ErrorMessage name="pose" component='p'></ErrorMessage>
            </div>
            <div className="container-input-exer">
                <label className="label-exer" htmlFor="poseNumber">Numero de Poses: </label>
                <Field id="poseNumber" type="number" className="exercise-user-form" name='poseNumber'  ></Field>
                <ErrorMessage name="poseNumber" component='p'></ErrorMessage>
            </div>
        </>
    )
}

export default FlexFlields