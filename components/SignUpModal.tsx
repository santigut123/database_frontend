import {createStyles, Flex, Modal} from "@mantine/core";
import {useForm} from '@mantine/form'
import { title } from "process";
import { PasswordInput, Text, Group, Button, Anchor,TextInput, Stack} from '@mantine/core';
import { useState } from 'react';
import { IconAt } from '@tabler/icons';

export default function SignUpModal({opened,setOpened}:any){
    const form = useForm({
        initialValues: {email: '', password: ''},
     validate:{
            email: (value) =>{
                if(!/^\S+@\S+$/.test(value)){
                    return "Please enter a valid email address"
                } 
                
                 return null
            },
            password:(value)=>{
                if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value))
                {
                    return "Please enter a valid password"
                }
                return null

            } 
    },
    });

    return(
    <Modal opened={opened} onClose={()=>{setOpened(false)}} title="Sign Up" >
        <form onSubmit={form.onSubmit(()=>console.log("submitted!"))}>
        <Flex sx={{flexAlign:"center",justifyContent:"center"}}>
        <Stack sx={{maxWidth:"300px",padding:"10px"}}>
        <TextInput  label="Email" placeholder="Email"{...form.getInputProps('email')} />
        <TextInput label="Password" placeholder="Password"{...form.getInputProps('password')} />
        <Text fz="xs">A valid password has: <br/> 1 uppercase character <br /> 1 lowercase character <br/> 1 special symbol</Text>
        <Button color="red" type="submit">Submit</Button>
        </Stack>
        </Flex>
      
        </form>
    </Modal>
    )


}