import {useRouter} from 'next/router'

import {Dispatch, ReactElement, SetStateAction, useState} from 'react'
import {Stack,TextInput,Textarea,Title,Button,Flex,Text,NativeSelect} from '@mantine/core'
import { isLabeledStatement } from 'typescript'
import { useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

function makeSurvey(){

}

interface question{
    question:string,
    type:string,
    results:string[]

}
interface answer{
    answer:string,
}
function getAvgFromResults(results:answer[]){
    let total=0
    for (let i=0;i<results.length;i++){
        total+=parseInt(results[i].answer)
    }
    return total/results.length
}
function getVarianceFromResults(results:answer[]){
    let avg=getAvgFromResults(results)     
    let total=0
    for (let i=0;i<results.length;i++){
        total+=Math.pow(parseInt(results[i].answer)-avg,2)
    }
    return total/results.length 
}

function renderQuestion(question:any,index:any):ReactElement{
    console.log("RENDER QUESTION",question)
    console.log("RENDER RESULTS",question.results)
    console.log("RENDER TYPE",question.type)
    if (question.type===1){
                console.log("QUESTION RESULTS",question.results)

        return(
            
        <Stack key={index}>
            <Text>Question(Type 1): {question.question}</Text>
            <Text>Average:{getAvgFromResults(question.results)}</Text>
            <Text>Variance:{getVarianceFromResults(question.results)}</Text>
        </Stack>
        )
    }
    else  {
        console.log("GOT TO CONDITIONAL")
        console.log("QUESTION RESULTS",question)
        if (!Array.isArray(question)){
            console.log("QUESTION HERE",question.results)
        return(
        <Stack key={index}>
            <Text>Question (Type 2): {question.question}</Text>
            <Text>Results:</Text>
            {question.results.map((result:any,index:any)=><Text key={index}>{result.answer}</Text>)}
        </Stack>)

    }
}
   
}
function submitSurvey(router:any){
    router.push("/dashboard")

}
export default function yourSurvey() {
  
  const supabase= useSupabaseClient()
  const router = useRouter()
  console.log(router.query)
  const results = Array<question>()
  const [questions,setQuestions]=useState(results)
  useEffect( ()=>{
    if(!router.isReady){
        return
    }

    const {id} = router.query
    const input_survey_id=id
    console.log("INPUT SURVEY ID",input_survey_id)
    async function getQuestions(){
        let { data, error } = await supabase
  .rpc('getsurveyquestions', {
    input_survey_id
  })
    console.log(data.length)
    for (let i=0;i<data.length;i++){
    let input_question_id=data[i].question_id
    let response = await supabase.rpc('getsurveyanswers', {input_question_id})
    data[i].results=response.data
    console.log("DATA AFTER RESULTS",data)
    
    
}
setQuestions(data)
 
 

 

  
  

    }
    
    
    
  )


  return(
    <Stack sx={{margin:"20px"}}>
    {questions.map((question:any,index:any)=>renderQuestion(question,index))}
    <Button onClick={()=>submitSurvey(router)}>Return to Dashboard</Button>
    </Stack>
  )
}