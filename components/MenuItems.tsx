import { Dispatch, SetStateAction } from "react";
import {createStyles} from "@mantine/core";
const useStyles = createStyles((theme) => ({
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
    padding: '8px 15px',
    borderRadius: theme.radius.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
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
  linkSignIn:{
    backgroundColor: theme.fn.variant({ variant: 'light', color: "red" }).background,
    color: theme.fn.variant({ variant: 'light', color: "red"}).color,

  }
}));
interface MenuItemsProps{
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  setSIOpened: Dispatch<SetStateAction<boolean>>;
  setSUOpened: Dispatch<SetStateAction<boolean>>;
  
}
export default function MenuItems({active,setActive,setSIOpened,setSUOpened}:MenuItemsProps) {
    console.log(setSUOpened)
    const {classes,cx} = useStyles();
    return(
      <>
   
        <a
        key={"Home"}
        href={"/"}
        className={cx(classes.link, { [classes.linkActive]: active === 'Home' })}
        onClick={(event) => {
          event.preventDefault();
          setActive('Home');
          close();
        }}
      >
        Home
      </a>
      
      <a
        key={"Features"}
        href={"/"}
        className={cx(classes.link, { [classes.linkActive]: active === 'Features' })}
        onClick={(event) => {
          event.preventDefault();
          setActive('Features');
          close();
        }}
      >
        Features
      </a>
      

    <a
        key={"FAQ"}
        href={"/"}
        className={cx(classes.link, { [classes.linkActive]: active === 'FAQ' })}
        onClick={(event) => {
          event.preventDefault();
          setActive('FAQ');
          close();
        }}
      >
        FAQ
      </a>
      
      
      

      <a
      key={"Sign In"}
      href={"/"}
      // temporary class style, needs to be changed to something that looks good
      className={cx(classes.link,classes.linkSignIn)}
      onClick={(event) => {
        event.preventDefault();
        setSIOpened(true);
        close();
      }}
    >
      Sign In
    </a>
     <a
      key={"Sign Up"}
      href={"/"}
      // temporary class style, needs to be changed to something that looks good
      className={cx(classes.link,classes.linkSignIn)}
      onClick={(event) => {
        event.preventDefault();
        setSUOpened(true);
        close();
      }}
    >
      Sign Up
    </a>
    
    </> 
    )
  
  
  
  }
  
  