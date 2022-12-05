import {useRouter} from 'next/router'

import {Dispatch, ReactElement, SetStateAction, useState} from 'react'
import {Stack,TextInput,Textarea,Title,Button,Flex,Text,NativeSelect} from '@mantine/core'
import { isLabeledStatement } from 'typescript'

function makeSurvey(){

}
interface question{
    question:string,
    type:string,
    results:string[]

}
function getAvgFromResults(results:string[]){
    let total=0
    for (let i=0;i<results.length;i++){
        total+=parseInt(results[i])
    }
    return total/results.length
}
function getVarianceFromResults(results:string[]){
    let avg=getAvgFromResults(results)     
    let total=0
    for (let i=0;i<results.length;i++){
        total+=Math.pow(parseInt(results[i])-avg,2)
    }
    return total/results.length 
}

function renderQuestion(question:any,index:any,setQuestions:any,questions:any):ReactElement{
    if (question.type==="one"){
        return(
        <Stack key={index}>
            <Text>Question(Type 1): {question.question}</Text>
            <Text>Average:{getAvgFromResults(question.results)}</Text>
            <Text>Variance:{getVarianceFromResults(question.results)}</Text>
        </Stack>
        )
    }
    else{
        return(
        <Stack key={index}>
            <Text>Question (Type 2): {question.question}</Text>
            <Text>Results:</Text>
            {question.results.map((result:any,index:any)=><Text key={index}>{result}</Text>)}
        </Stack>)

    }
   
}
function submitSurvey(router:any){
    router.push("/dashboard")

}
export default function yourSurvey() {
  const router = useRouter()
  const { id } = router.query
  const results = Array<question>({question:"How was your day?",type:"two",results:["bad","good","somewhat good"]},{question:"What did you do today in numbers?",type:"one",results:["1","2","3","4","5"]})
  const [questions,setQuestions]=useState(results)

  console.log(questions)
  return(
    <Stack sx={{margin:"20px"}}>
    {questions.map((question:any,index:any)=>renderQuestion(question,index,setQuestions,questions))}
    <Button onClick={()=>submitSurvey(router)}>Return to Dashboard</Button>
    </Stack>
  )
}