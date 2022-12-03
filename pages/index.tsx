import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import menuInfo from '../menuInfo.json';
import { getAnalytics } from "firebase/analytics";
import Dashboard from "../components/dashboard"
import { Title,Flex,Button,Stack } from '@mantine/core';
// FIREBASE API CONNECTION INFO

import { ReactElement } from 'react';
import { useRouter } from 'next/router'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'



const Home = () => {

  const session = useSession()

  const supabase = useSupabaseClient()
  const router = useRouter()

  // THIS IS A CHECK TO SEE IF USER IS LOGGED IN
  if(session){
    router.push('/dashboard')
  }


  return (
    <Stack spacing="sm">
       <Title>SURVEY RED</Title>

     <Flex  sx={{ padding: '50px 0 100px 0' }}>
     

       
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      
       

     
    </Flex>
    </Stack>

  )

}


export default Home