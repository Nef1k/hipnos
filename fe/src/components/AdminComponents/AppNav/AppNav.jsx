import {
  AppBar,
  Container,
} from "@mui/material";
import {useEffect, useState} from "react";
import useLogout from "../../../hooks/useLogout";
import NavDesktop from "./NavDesktop/NavDesktop";
import NavMobile from "./NavMobile/NavMobile";
import {useParams} from "react-router-dom";
import NameDialog from "../NameDialog/NameDialog";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {emptyLayout} from "../Tabs/TabsPanel/TabsPanel";

const AppNav = ({pages, onPageAdd, onPageChange, onWidgetAdd}) => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [isNameDialogOpen, setNameDialogOpen] = useState(false);

  const {pageName} = useParams();

  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();

  const createNewPage = async (name, displayName) => {
    try {
      const response = await axiosPrivate.post("synergy/pages/", {
        name,
        display_name: displayName,
        page_data: emptyLayout(),
      });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }

  const handleLogoutClick = async () => {
    await logout();
  }

  const handlePageChange = async (newPage) => {
    setSelectedPage(newPage);
    onPageChange && onPageChange(newPage);
  }

  const handleAddPage = async () => {
    onPageAdd && onPageAdd();
    setNameDialogOpen(true);
  }

  const handleNameEntered = async (newName, newDisplayName) => {
    const page = await createNewPage(newName, newDisplayName);
    await handlePageChange(page);
  }

  const handleNameDialogClosed = async () => {
    setNameDialogOpen(false);
  }

  useEffect(() => {
    const filteredPages = pages?.filter((page) => page.name === pageName);
    if (filteredPages?.length !== 0) {
      const page = filteredPages[0];
      setSelectedPage(page);
    }
  }, [pageName, pages]);

  return (
    <AppBar position="static" elevation={0}>
      <Container style={{maxWidth: "100%"}}>
        <NavDesktop
          sx={{display: {xs: "none", md: "flex"}}}
          pages={pages}
          selectedPageId={selectedPage?.id}
          onAddPage={handleAddPage}
          onLogout={handleLogoutClick}
          onPageChange={handlePageChange}
          onWidgetAdd={onWidgetAdd}
        />
        <NavMobile
          sx={{display: {xs: "flex", md: "none"}}}
          pages={pages}
          onAddPage={handleAddPage}
          onLogout={handleLogoutClick}
          onPageChange={handlePageChange}
          onWidgetAdd={onWidgetAdd}
        />
      </Container>
      <NameDialog
        caption="Создать страницу"
        open={isNameDialogOpen}
        onNameEntered={handleNameEntered}
        onClosed={handleNameDialogClosed}
      />
    </AppBar>
  )
}

export default AppNav;
