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
        questions:[],
        responses:[],
        participants:[],
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
    else if(contentOption==="Make Survey"){
        return makeSurveyPage()
    }
    return <div></div>
}

export default function PageContent({contentOption}:any){
  return (
    <div>
      <h1>{content(contentOption)}</h1>
    </div>
  )
}