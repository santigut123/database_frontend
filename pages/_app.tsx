import '../styles/globals.css'
import {useState} from 'react'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session,
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <MantineProvider theme={{ colorScheme: 'dark',fontFamily:"monospace" }} withGlobalStyles withNormalizeCSS>
       <Component {...pageProps} />
      </MantineProvider>
    </SessionContextProvider>
  )
}
export default MyApp

