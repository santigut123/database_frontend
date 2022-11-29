import {createStyles, Flex, Modal} from "@mantine/core";
import {useForm} from '@mantine/form'
import { title } from "process";
import { PasswordInput, Text, Group, Button, Anchor,TextInput, Stack} from '@mantine/core';
import { useState } from 'react';
import { IconAt } from '@tabler/icons';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// GOOGLE SIGN IN //
function googleSignIn(auth:any) {
  const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}


const useStyles = createStyles((theme) => ({
    
}));
export function ForgotPasswordInput({ className, style,password,setPassword,form,...others }: any) {
  return (
    <div className={className} style={style}>
      <Group position="apart" mb={5}>
        <Text component="label" htmlFor="your-password" size="sm" weight={500}>
          Password
        </Text>

        <Anchor<'a'>
          href="#"
          onClick={(event) => event.preventDefault()}
          sx={(theme) => ({
            paddingTop: 2,
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
            fontWeight: 500,
            fontSize: theme.fontSizes.xs,
          })}
        >
          Forgot your password?
        </Anchor>
      </Group>

      <PasswordInput placeholder="Password" id="password" {...form.getInputProps('password')} />
    </div>
  );
}



   
      
 

export default function SignInModal({opened,setOpened,auth}:any){
    const form = useForm({
        initialValues: {email: '', password: ''},
     validate:{
            email: (value) =>{
                if(!value) return 'Email is required'
                if (/^\S+@\S+$/.test(value)==false ){
                    return 'Email is not valid'

                }
                return null
                
            },
            password: (value) =>(value.length > 0 ? null : 'Password is required')
    },
    });

    return(
    <Modal opened={opened} onClose={()=>{setOpened(false)}} title="Sign In" >
        <form onSubmit={form.onSubmit(()=>console.log("submitted!"))}>
        <Flex sx={{flexAlign:"center",justifyContent:"center"}}>
        <Stack sx={{maxWidth:"300px",padding:"10px"}}>
        <TextInput  label="Email" placeholder="Email"{...form.getInputProps('email')} />
        <ForgotPasswordInput form={form}/>
        <Button color="red" type="submit">Submit</Button>
        <Button color="red" onClick={()=>googleSignIn(auth)}>Sign in with Google</Button>
        </Stack>
        </Flex>
      
        </form>
    </Modal>
    )


}