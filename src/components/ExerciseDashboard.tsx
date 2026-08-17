import type { CardioExercise,StrengthExercise, FlexExercise, SummaryCategory,ExerciseDashboardProps } from "../types/Exercises";
import { ExercisePerCategory,obtainSpendTime,categorySummary } from "../funcs/exersicesFunc";

function ExerciseDashboard({exersiceInfo}:ExerciseDashboardProps){
    const categoryExercises = ExercisePerCategory(exersiceInfo)
    const cardioCategory = categorySummary(categoryExercises,'Cardio')
    const strenghCategory = categorySummary(categoryExercises,'Fuerza')
    const flexCategory = categorySummary(categoryExercises,'Flexibilidad')
    const allSummaryCategory:SummaryCategory[] =[
        cardioCategory,
        strenghCategory,
        flexCategory
    ] 

    const totalExercises = allSummaryCategory.reduce((accumalator: number, currentCategory:SummaryCategory):number=>{
        return accumalator + currentCategory.summaryExercises
    },0)

    return(
        <div id="main-div-dashboard">
            <section>
                <h3>Cardio({cardioCategory.summaryExercises} ejercicios, {cardioCategory.summaryTime} min, {cardioCategory.summaryCalories} kcal)</h3>
                {categoryExercises["Cardio"]?.map((exercises:CardioExercise, index:number)=>(
                    <p key={index}> {exercises.nameExercise}, {obtainSpendTime(exercises.minutes)} | {exercises.distance} km | {exercises.rhythm}|{exercises.totalCalories} kcal</p>
        ))}
            </section>
            
            <section>
                <h3>Fuerza({strenghCategory.summaryExercises} ejercicios, {strenghCategory.summaryTime} min, {strenghCategory.summaryCalories} kcal)</h3>
                {categoryExercises["Fuerza"]?.map((exersiceInfo:StrengthExercise,index:number)=>(
                    <p key={index}> {exersiceInfo.nameExercise}, {exersiceInfo.sets} X {exersiceInfo.reps} | {exersiceInfo.weight} kg | {exersiceInfo.totalCalories}</p>
                ))}
            </section>

            <section>
                <h3>Flexibilidad({flexCategory.summaryExercises} ejercicios, {flexCategory.summaryTime} min, {flexCategory.summaryCalories} kcal)</h3>
                {categoryExercises["Flexibilidad"]?.map((exersiceInfo:FlexExercise, index:number)=>(
                    <p key={index}>{exersiceInfo.nameExercise}, {exersiceInfo.poseNumber} poses | {exersiceInfo.totalCalories}</p>
                ))}
            </section>
            <section id="total-section">
                <h3>Total: {totalExercises} ejercicios</h3>
            </section>
        </div>
        
    )


}


export default ExerciseDashboard