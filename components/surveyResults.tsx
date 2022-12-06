import {Flex,Text,Button,Stack, Title} from "@mantine/core"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { ReactElement,useEffect,useState} from "react"
import {useRouter} from "next/router"
function surveyResultElement(surveyObject: any,supabase:any){
    const router= useRouter()
    return (
        <Flex key={surveyObject.survey_id}>
            <Text>{surveyObject.title}</Text>
            <Button onClick={() => router.push(`/survey_results/${surveyObject.survey_id}`)}>See Results</Button>
            <Button onClick={()=>deleteSurvey(surveyObject.survey_id,supabase)}>Delete</Button>
        </Flex> 
    )

}
async function deleteSurvey(input_survey_id:any,supabase:any){
    
    let {data,error} = await supabase.rpc('deletesurvey',{
        input_survey_id
    })
    if (error) console.error(error)
    return data

}
export default function SurveyResults():ReactElement{

    const [surveys,setSurveyResults]=useState<any[]>([])
    const supabase = useSupabaseClient()
    useEffect(() => {
        async function getUserId(supabase:any) {
        const { data: { user } } = await supabase.auth.getUser()
        return user?.id
        
    }

    async function getAssignedSurveys(supabase:any,setAssignedSurveys:any) {
        const owner_id = await getUserId(supabase)
        
        let { data, error } = await supabase
        .rpc('getownedsurveys', {
            owner_id
        })

        if (error) console.error(error)
        
        if(data===null){
            setAssignedSurveys([])
        }
        else{
            setAssignedSurveys(data);
        }

    }

        getAssignedSurveys(supabase,setSurveyResults);
    })
    return (
        <Stack key="surveyResults">
         {surveys.map((survey)=>surveyResultElement(survey,supabase))}
        </Stack>

    )
}