import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import  HeaderMenu from '../components/HeaderMenu';
import menuInfo from '../menuInfo.json';
import SignInModal from '../components/SignInModal';
import { getAnalytics } from "firebase/analytics";
import { Title,Flex,Button,Stack } from '@mantine/core';
// FIREBASE API CONNECTION INFO

import { ReactElement } from 'react';
import SignUpModal from '../components/SignUpModal';
const firebaseConfig = {
  apiKey: "AIzaSyAmHCej0dg_7CckFtExi-YiQfECxz-tEu8",
  authDomain: "qumu-c2983.firebaseapp.com",
  projectId: "qumu-c2983",
  storageBucket: "qumu-c2983.appspot.com",
  messagingSenderId: "859948319312",
  appId: "1:859948319312:web:0abaf456fa00f1c813c755",
  measurementId: "G-N5GQQ663NZ"
};
// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);
console.log(app.name)
// GRAB AUTHENTICATION TOKEN
const auth = getAuth(app);
export default function Home() {
  const[SUOpened,setSUOpened] =useState(false);
  const[SIOpened,setSIOpened] =useState(false);
  console.log(setSUOpened)
  return (
     <div id="homePage">
      <Flex gap="md" sx={{justifyContent:"center" ,flexDirection:"column"}}>
        <Title order={1} >SURVEY RED</Title>
        <SignInModal opened={SIOpened} setOpened={setSIOpened} auth={auth}/>
        <SignUpModal opened={SUOpened} setOpened={setSUOpened} auth={auth}/>

        <Button onClick={()=>setSIOpened(true)}size="md" color="red" sx={{maxWidth:"500px"}}>Sign In</Button>
        <Button onClick={()=>setSUOpened(true)}size="md" color="red"sx={{maxWidth:"500px"}}>Sign Up</Button>
        
      </Flex>

     </div>
)}
