import {useRouter} from 'next/router'

import {Dispatch, ReactElement, SetStateAction, useState} from 'react'
import {Stack,TextInput,Textarea,Title,Button,Flex,Text,NativeSelect} from '@mantine/core'
import { isLabeledStatement } from 'typescript'

function makeSurvey(){

}
interface question{
    question:string,
    type:string,
    result:string

}
function renderQuestion(question:any,index:any,setQuestions:any,questions:any):ReactElement{
    if (question.type==="two"){
        return(
        <Flex key={index}>
                <Textarea onChange={(event)=>question.result=event.currentTarget.value} label={question.question}></Textarea>
            </Flex>
        )
    }
    else{
        return(<Flex key={index}>
            <NativeSelect  data={['1','2','3','4','5'] } onChange={(event)=>question.result=event.currentTarget.value} label={question.question} description={"on a scale from 1-5"}></NativeSelect>
        </Flex>)

    }
   
}
function submitSurvey(router:any){
    router.push("/dashboard")

}
async function getResults(supabase,survey_id){
    let { data, error } = await supabase
    .rpc('getresults', {
        survey_id
    })

    if (error) console.error(error)
    return data

}
export default function yourSurvey() {
  const router = useRouter()
  const { id } = router.query
  
  const [questions,setQuestions]=useState(results)

  console.log(questions)
  return(
    <Stack sx={{margin:"20px"}}>
    {questions.map((question:any,index:any)=>renderQuestion(question,index,setQuestions,questions))}
    <Button onClick={()=>submitSurvey(router)}>Submit</Button>
    </Stack>
  )
}