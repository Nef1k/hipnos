import {
  AppBar,
  Container,
} from "@mui/material";
import {useEffect, useState} from "react";
import useLogout from "../../../hooks/useLogout";
import NavDesktop from "./NavDesktop/NavDesktop";
import NavMobile from "./NavMobile/NavMobile";
import {useParams} from "react-router-dom";

const AppNav = ({pages, onPageAdd, onPageChange}) => {
  const [selectedPage, setSelectedPage] = useState(null);

  const {pageName} = useParams();

  const logout = useLogout();

  const handleLogoutClick = async () => {
    await logout();
  }

  const handlePageChange = async (newPage) => {
    setSelectedPage(newPage);
    onPageChange && onPageChange(newPage);
  }

  const handleAddPage = async () => {
    onPageAdd && onPageAdd();
  }

  useEffect(() => {
    const filteredPages = pages?.filter((page) => page.name === pageName);
    if (filteredPages?.length !== 0) {
      const page = filteredPages[0];
      setSelectedPage(page);
    }
  }, [pageName, pages]);

  return (
    <AppBar position="static">
      <Container style={{maxWidth: "100%"}}>
        <NavDesktop
          sx={{display: {xs: "none", md: "flex"}}}
          pages={pages}
          selectedPageId={selectedPage?.id}
          onAddPage={handleAddPage}
          onLogout={handleLogoutClick}
          onPageChange={handlePageChange}
        />
        <NavMobile
          sx={{display: {xs: "flex", md: "none"}}}
          pages={pages}
          onAddPage={handleAddPage}
          onLogout={handleLogoutClick}
          onPageChange={handlePageChange}
        />
      </Container>
    </AppBar>
  )
}

export default AppNav;
