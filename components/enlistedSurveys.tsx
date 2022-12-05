
import {Flex,Text,Button,Stack} from "@mantine/core"
import { getAdditionalUserInfo } from "firebase/auth"
import { ReactElement, useEffect, useState } from "react"
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

function enlistedSurveyElement(surveyObject: any) {
    const router = useRouter()
    return (
        <Flex id={surveyObject.survey_id}>
            <Text>{surveyObject.title}</Text>
            <Button onClick={() => router.push(`/${surveyObject.survey_id}`)}>Take Survey</Button>
        </Flex>
    )
}

export default function enlistedSurveys():ReactElement {
    const [surveys, setAssignedSurveys] = useState<any[]>([])
    const supabase = useSupabaseClient()

    async function getUserId() {
        const { data: { user } } = await supabase.auth.getUser()
        return user?.id
    }

    async function getAssignedSurveys() {
        const input_user_id = await getUserId()

        let { data, error } = await supabase
        .rpc('getassignedsurveys', {
            input_user_id
        })

        if (error) console.error(error)

        setAssignedSurveys(data);
    }

    useEffect(() => {
        getAssignedSurveys();
    }, [])

    return (
        <Stack>
         {surveys.map((survey)=>enlistedSurveyElement(survey))}
        </Stack>
    )
}