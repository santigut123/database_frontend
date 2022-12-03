import {Flex,Text,Button,Stack} from "@mantine/core"
import { ReactElement } from "react"
function enlistedSurveyElement(surveyObject: any){
    return (
        <Flex id={surveyObject.ID}>
            <Text>{surveyObject.surveyName}</Text>
            <Button>Take Survey</Button>
        </Flex>
    )

}

export default function enlistedSurveys():ReactElement{
    const surveys=[{surveyName:"Survey 1",ID:"test123"},{surveyName:"Survey 2",ID:"test122"},{surveyName:"Survey 3",ID:"test121"}]
    return (
        <Stack>
         {surveys.map((survey)=>enlistedSurveyElement(survey))}
        </Stack>

    )
}