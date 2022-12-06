import {useForm} from '@mantine/form'
import {Dispatch, ReactElement, SetStateAction, useState} from 'react'
import {Stack,TextInput,Textarea,Title,Button,Flex,Text} from '@mantine/core'
import {DatePicker, DateRangePickerValue} from '@mantine/dates'
import { setConstantValue } from 'typescript'
import { useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
function addQuestionTypeOne(questions:any,setQuestions: any){
    setQuestions([...questions,{question:"",type:1}])

}
function addQuestionTypeTwo(questions:any,setQuestions:any){
    setQuestions([...questions,{question:"",type:2}])
}
function addParticipant(setEmails:any,emails:any,email:string){
    setEmails([...emails,email])

}
function renderQuestion(question:any,index:any,setQuestions:any,questions:any):ReactElement{
    if (question.type==="one"){
        return(
        <Flex key={index}>
                <Textarea  onChange={(event)=>question.question=event.currentTarget.value} label="Question (Type 1 Rating 1-5)"></Textarea>
                <Button onClick={()=>setQuestions(questions.filter((q:any)=>q!==question))}>Remove</Button>
            </Flex>
        )
    }
    else{
        return(<Flex key={index}>
            <Textarea  onChange={(event)=>question.question=event.currentTarget.value} label="Question (Type 2 TextBox)"></Textarea>
            <Button onClick={()=>setQuestions(questions.filter((q:any)=>q!==question))}>Remove</Button>
        </Flex>)

    }
   
}

function QuestionsDiv({questions,setQuestions}:any):ReactElement{

    return (
        <Stack>
            {questions.map((question:any,index:any)=>
                renderQuestion(question,index,setQuestions,questions))}
        </Stack>
    )
}

interface question{
    question:string,
    type:string

}
function AddParticipantButton({setEmails,emails}:any):ReactElement{
    const[participant,setParticipant]=useState("")
    return( 
        <Flex>
          
            <TextInput value ={participant} onChange={(event)=>setParticipant(event.currentTarget.value) } label="Participant Email"></TextInput>
            <Button onClick={()=>addParticipant(setEmails,emails,participant)} >Add Participant</Button>
        </Flex>
    )

}
function ParticipantsDiv({setEmails,emails}:any):ReactElement{
    return (
        <Stack>
              <Text>Participants</Text>
            {emails.map((email:any,index:any)=>
                <Flex key={index}>
                    <Text>{email}</Text>
                </Flex>
            )}
        </Stack>
    )
            }
async function submitSurvey(userId:any, info:any,questions:any,emails:any,start_date:any,end_date:any,supabase:any){
    let addSurvResp = await supabase.rpc('addsurvey',{
        new_title:info.title,
        new_description:info.description,
        new_start_date:start_date,
        new_end_date:end_date,
        new_creator_id:userId,

}
    )
    for(let i=0;i<questions.length;i++){
        let {data,error} = await supabase.rpc('addquestiontosurvey',{
            input_type:questions[i].type,
            input_survey_id:addSurvResp.data,
            input_question:questions[i].question
        })
        
    }
    for(let i=0;i<emails.length;i++){
        let idRes = await supabase.rpc('getidfromemail',{
            input_email:emails[i]
        })
        let {data,error} = await supabase.rpc('assignusertosurvey',{
            input_user_id:idRes.data,
            input_survey_id:addSurvResp.data
        })
    }

}

export default function MakeSurveyPage(){
    const supabase=useSupabaseClient()
    const initialSurveyArr=Array<question>()
    const emailArr=Array<string>()
    const [emails,setEmails]=useState(emailArr)
    const [questions,setQuestions]=useState(initialSurveyArr)
    const today= new Date()
    const[start_date,setStart_date] = useState(new Date())
    const[end_date,setEnd_date] = useState(new Date())
    let userID =""
    const surveyInfo={"title":"","description":"","start_date":today.getDate(),"end_date":today.getDate}    
    console.log(questions)
    useEffect(()=>{
        async function getUserId(supabase:any,userID:any) {
    const { data: { user } } = await supabase.auth.getUser()
    userID=user
}

   getUserId(supabase,userID)
},[])
    return(
    <Stack key="makeSurvey">
            <Title>Make Survey</Title>
            <form>
              <TextInput onChange={(event)=>surveyInfo.title=event.currentTarget.value} label="Survey Title"></TextInput>
              <Textarea onChange={(event)=>surveyInfo.description=event.currentTarget.value} label="Survey Description"></Textarea>
              <DatePicker value={start_date} onChange={setStart_date} label="Start Date"/>
              <DatePicker value={end_date} onChange={setEnd_date} label="End Date"/>
              <QuestionsDiv questions={questions} setQuestions={setQuestions}/>
              <ParticipantsDiv emails={emails} setEmails={setEmails}/>
              <Flex sx={{margin:"20px",}}>
                <Button sx={{margin:"20px"}} onClick={()=>addQuestionTypeOne(questions,setQuestions)}>Add Question Type 1</Button>
                <Button sx={{margin:"20px"}} onClick={()=>addQuestionTypeTwo(questions,setQuestions)}>Add Question Type 2</Button>
                <AddParticipantButton setEmails={setEmails}emails={emails}/>
                
              </Flex>
              <Button onClick={()=>submitSurvey(userID,surveyInfo,questions,emails,start_date,end_date,supabase)}>Make Survey</Button>
            </form>

        </Stack>

    )
}