import { IconChevronDown } from '@tabler/icons';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { createStyles, Header, Container, Group, Burger, Paper, Transition,Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Router, useRouter } from 'next/router'
import { ClassNames } from '@emotion/react';
import MenuItems from './MenuItems';



const HEADER_HEIGHT = 80
;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  logo:{
    margin:"20px",

  },
  logoText:{
    marginRight:"auto",
    fontFamily:"monospace",
    fontSize:"40px",
    weight:"17"
    
    
    
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width:'100%',
    maxWidth:'1700px'
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));
interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
  setSUOpened: Dispatch<SetStateAction<boolean>>;
  setSIOpened: Dispatch<SetStateAction<boolean>>;
}



export default function HeaderMenu({ links,setSUOpened,setSIOpened }: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const router = useRouter();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        router.push(link.link);
        close();
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={60} className={classes.root}>
      <Container className={classes.header}>
        <Group spacing={5} className={classes.links}>
          <MenuItems active={active} setActive={setActive} setSUOpened={setSUOpened} setSIOpened={setSIOpened} />
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              <MenuItems active={active} setActive={setActive} setSUOpened={setSUOpened} setSIOpened={setSIOpened}/>
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}