
import {Flex,Text,Button,Stack} from "@mantine/core"
import { getAdditionalUserInfo } from "firebase/auth"
import { ReactElement, useEffect, useState } from "react"
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

function enlistedSurveyElement(surveyObject: any) {
    const router = useRouter()
    return (
        <Flex key={surveyObject.survey_id}>
            <Text>{surveyObject.title}</Text>
            <Button onClick={() => router.push(`/your_surveys/${surveyObject.survey_id}`)}>Take Survey</Button>
        </Flex>
    )
}

export default function EnlistedSurveys():ReactElement {
    
    const [surveys, setAssignedSurveys] = useState<any[]>([])
    useEffect(() => {
        async function getUserId(supabase:any) {
        const { data: { user } } = await supabase.auth.getUser()
        return user?.id
    }

    async function getAssignedSurveys(supabase:any,setAssignedSurveys:any) {
        const input_user_id = await getUserId(supabase)

        let { data, error } = await supabase
        .rpc('getassignedsurveys', {
            input_user_id
        })

        if (error) console.error(error)
        if(data===null){
            setAssignedSurveys([])
        }
        else{
            setAssignedSurveys(data);
        }

    }

        getAssignedSurveys(supabase,setAssignedSurveys);
    })
    
    const supabase = useSupabaseClient()
    
    return (
        <Stack key={"enlistedSurvey"}>
         {surveys.map((survey)=>enlistedSurveyElement(survey))}
        </Stack>
    )
}