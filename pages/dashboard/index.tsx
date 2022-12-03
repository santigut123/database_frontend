import { AppShell,Navbar,Footer,Header,MediaQuery,Burger,Text,useMantineTheme,Button,Stack, Title} from "@mantine/core"
import PageContent from "../../components/pageContent";
import { useState } from "react"
function navbar(){

}

export default function Dashboard(){
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [contentOption,setContentOption] = useState("Enlisted Surveys")
    return (
        <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Stack>
          <Button onClick={()=>setContentOption("Enlisted Surveys")}>Enlisted Surveys</Button>
          <Button onClick={()=>setContentOption("Your Surveys")}>Your Surveys</Button>
          <Button onClick={()=>setContentOption("Make Survey")}>Make Survey</Button>
          </Stack>
        </Navbar>
      }
      
      header={
        <Header height={{ base: 60, md: 90 }} p="md">
          <Title sx={{}}>SURVEY RED</Title>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

          </div>
        </Header>
      }

    >
      <PageContent contentOption={contentOption} />
    </AppShell>
    )
    
}