import { ReactElement } from "react"
import {Flex,Text,Button,Stack} from "@mantine/core"
import enlistedSurveys from "./enlistedSurveys"
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

function yourSurveys():ReactElement{
    return <div>YS</div>

}
function makeSurvey():ReactElement{
    return <div>MS</div>

}
function content(contentOption:string):ReactElement{
    if(contentOption==="Enlisted Surveys"){
        return enlistedSurveys()
    }
    else if(contentOption==="Survey Results"){
        return yourSurveys()
    }
    else if(contentOption==="Make Survey"){
        return makeSurvey()
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