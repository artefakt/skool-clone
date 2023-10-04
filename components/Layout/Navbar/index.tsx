import { AppBar, Toolbar, Slide } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Search from "../Searchbar";
import LoginSignUpBar from "../Loginsection";
import GroupSwitch from "../Groupswitcher";
import UserSection from "../Usersection";
import TabBar from "../Tabbar";
import { useState } from "react";
import style from "./navbar.module.css";

interface NavBarProps {
  className?: string;
  isDisplayTabs?: boolean;
  isDisplaySearch?: boolean;
}

export default function NavBar(props: NavBarProps) {
  const { className, isDisplayTabs, isDisplaySearch } = props;
  const [isLogedIn, setIsLogedIn] = useState(true);

  let tabs = [
    { name: "Community", number: 1 },
    { name: "Classroom", number: 1 },
    { name: "Calendar", number: 1 },
    { name: "Members", number: 1 },
    { name: "LeaderBoard", number: 1 },
    { name: "About", number: 1 },
  ];

  const renderTabs = (items: { name: string; number: number }[]) => {
    if (isDisplayTabs) {
      // const trigger = useScrollTrigger();
      return (
        // <Slide in={!trigger}>
          <TabBar itemsList={items} />
        // {/* </Slide> */}
      );
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <AppBar elevation={0} className={`${style.navbar_root}`}>
        <Toolbar className={`${style.navbar_toolbar}`}>
          <GroupSwitch />
          {isDisplaySearch ? <Search /> : <></>}
          {isLogedIn ? <UserSection /> : <LoginSignUpBar />}
        </Toolbar>
        {renderTabs(tabs)}
      </AppBar>
    </StyledEngineProvider>
  );
}