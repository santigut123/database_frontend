import { ReactElement } from "react"
import {Flex,Text,Button,Stack} from "@mantine/core"
import enlistedSurveys from "./enlistedSurveys"
import surveyResults from "./surveyResults"
import makeSurveyPage from "./makeSurvey"
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
        return enlistedSurveys()
    }
    else if(contentOption==="Survey Results"){
        return surveyResults()
    }
    else{
        return makeSurveyPage()
    }
}

export default function PageContent({contentOption}:any){
  return (
    <div>
      {content(contentOption)}
    </div>
  )
}