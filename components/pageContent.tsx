import { ReactElement } from "react"
import {Flex,Text,Button,Stack} from "@mantine/core"
import EnlistedSurveys from "./enlistedSurveys"
import SurveyResults from "./surveyResults"
import MakeSurveyPage from "./makeSurvey"
function surveyObject(){
    return {
        name:"",
        description:"",
        ID:"",
        questions:[]as any[],
        responses:[] as any[],
        participants:[] as any[],
        startDate:Date(),
        endDate:Date(),
    }
}

function content(contentOption:string):ReactElement{
    if(contentOption==="Enlisted Surveys"){
        return( <EnlistedSurveys/>)
    }
    else if(contentOption==="Survey Results"){
        return (<SurveyResults/>)
    }
    else{
        return (<MakeSurveyPage/>)
    }
}

export default function PageContent({contentOption}:any){
  return (
    <>
      {content(contentOption)}
    </>
  )
}