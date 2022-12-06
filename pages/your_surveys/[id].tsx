import {useRouter} from 'next/router'

import {Dispatch, ReactElement, SetStateAction, useState} from 'react'
import {Stack,TextInput,Textarea,Title,Button,Flex,Text,NativeSelect} from '@mantine/core'
import { isLabeledStatement } from 'typescript'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'

function makeSurvey(){

}
interface question{
    question:string,
    type:string,
    result:string
    answer:string

}
function renderQuestion(question:any,index:any,setQuestions:any,questions:any):ReactElement{
    if (question.type===2){
        return(
        <Flex key={index}>
                <Textarea onChange={(event)=>question.answer=event.currentTarget.value} label={question.question}></Textarea>
            </Flex>
        )
    }
    else{
        return(<Flex key={index}>
            <NativeSelect  data={['1','2','3','4','5'] } onChange={(event)=>question.answer=event.currentTarget.value} label={question.question} description={"on a scale from 1-5"}></NativeSelect>
        </Flex>)

    }
   
}

async function getResults(supabase:any,input_survey_id:any,setQuestions:any){
    let { data, error } = await supabase
    .rpc('getsurveyquestions', {
        input_survey_id
    })
    console.log(data)
    setQuestions(data)
    

    if (error) console.error(error)
    return data

}
async function submitSurvey(supabase:any,questions:any,router:any,input_survey_id:any){
    async function getUserId(supabase:any) {
        const { data: { user } } = await supabase.auth.getUser()
        return user?.id
    }
    for(let i=0;i<questions.length;i++){
        let {data,error} = await supabase.rpc('submitanswertoquestion',{
            input_question_id:questions[i].question_id,
            input_answer:questions[i].answer
        })
    }
    const input_user_id = await getUserId(supabase)
    let {data,error} = await supabase.rpc('submitsurvey',{
        input_user_id,
        input_survey_id
            
        })

     router.push("/dashboard")


}
export default function yourSurvey() {
  const router = useRouter()
  const { id } = router.query
  const supabase = useSupabaseClient()
  
  
  const [questions,setQuestions]=useState([])
  useEffect(()=>{ getResults(supabase,id,setQuestions)
},[])
 
  
  return(
    <Stack sx={{margin:"20px"}}>
    {questions.map((question:any,index:any)=>renderQuestion(question,index,setQuestions,questions))}
    <Button onClick={()=>submitSurvey(supabase,questions,router,id)}>Submit</Button>
    </Stack>
  )
}