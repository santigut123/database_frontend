import {useForm} from '@mantine/form'
import {Dispatch, ReactElement, SetStateAction, useState} from 'react'
import {Stack,TextInput,Textarea,Title,Button,Flex,Text} from '@mantine/core'
import {DatePicker} from '@mantine/dates'
import { setConstantValue } from 'typescript'
function addQuestionTypeOne(questions:any,setQuestions: any){
    setQuestions([...questions,{question:"",type:"one"}])

}
function addQuestionTypeTwo(questions:any,setQuestions:any){
    setQuestions([...questions,{question:"",type:"two"}])
    

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

export default function makeSurveyPage(){
    const initialSurveyArr=Array<question>
    const [questions,setQuestions]=useState(initialSurveyArr)
    console.log(questions)
    return(
        <Stack>
            <Title>Make Survey</Title>
            <form>
              <TextInput label="Survey Title"></TextInput>
              <Textarea label="Survey Description"></Textarea>
              <DatePicker label="Start Date"></DatePicker>
              <DatePicker label="End Date"></DatePicker>
              <QuestionsDiv questions={questions} setQuestions={setQuestions}/>
              <Flex sx={{margin:"20px",}}>
                <Button sx={{margin:"20px"}} onClick={()=>addQuestionTypeOne(questions,setQuestions)}>Add Question Type 1</Button>
                <Button sx={{margin:"20px"}} onClick={()=>addQuestionTypeTwo(questions,setQuestions)}>Add Question Type 2</Button>
              </Flex>
            </form>

        </Stack>

    )
}