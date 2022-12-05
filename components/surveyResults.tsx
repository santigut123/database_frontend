import {Flex,Text,Button,Stack, Title} from "@mantine/core"
import { ReactElement } from "react"
function surveyResultElement(surveyObject: any){
    return (
        <Flex key={surveyObject.ID}>
            <Text>{surveyObject.surveyName}</Text>
            <Button >See Results</Button>
        </Flex>
    )

}

export default function surveyResults():ReactElement{
    const surveys=[{surveyName:"Survey 1",ID:"test123"},{surveyName:"Survey 2",ID:"test122"},{surveyName:"Survey 3",ID:"test121"}]
    return (
        <Stack>
         {surveys.map((survey)=>surveyResultElement(survey))}
        </Stack>

    )
}