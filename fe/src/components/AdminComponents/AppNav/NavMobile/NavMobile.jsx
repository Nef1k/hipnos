import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import useAuth from "../../../../hooks/useAuth";
import {useState} from "react";

const NavMobile = ({sx, pages, selectedPageId, onLogout, onPageChange, onAddPage, onWidgetAdd}) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDrawerOpened, setDrawerOpened] = useState(false);

  const {auth} = useAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerClick = () => {
    setDrawerOpened(true);
  }

  const handleDrawerClose = () => {
    setDrawerOpened(false);
  }

  const handlePageClick = (e, page) => {
    handleDrawerClose();
    onPageChange && onPageChange(page);
  }

  const handleNewPageClick = () => {
    handleDrawerClose();
    onAddPage && onAddPage();
  }

  return (
    <Toolbar disableGutters sx={sx}>
      <IconButton
        sx={{display: "flex", marginLeft: "-10px", padding: "10px"}}
        color="inherit"
        size="large"
        edge="start"
        onClick={handleDrawerClick}
      >
        <AdbIcon/>
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: "flex",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        SYNERGY
      </Typography>

      <Drawer
        anchor="left"
        open={isDrawerOpened}
        onClose={handleDrawerClose}
      >
        <List>
          {pages?.map((page) => {
            return (
              <ListItem disablePadding key={page.id}>
                <ListItemButton onClick={(e) => {handlePageClick(e, page)}}>
                  <ListItemText primary={page.display_name || page.name}/>
                </ListItemButton>
              </ListItem>
            );
          })}
          {pages && <Divider/>}
          <ListItem disablePadding>
            <ListItemButton onClick={handleNewPageClick}>
              <ListItemText primary="Создать страницу"/>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{flexGrow: 1, display: "flex", alignItems: "center"}}>
        <IconButton
          color="inherit"
          onClick={onWidgetAdd}
        >
          <NoteAddIcon/>
        </IconButton>
      </Box>

      <Box sx={{flexGrow: 0}}>
        <Tooltip title={auth.username}>
          <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
            <Avatar alt={auth.username}/>
          </IconButton>
        </Tooltip>

        <Menu
          sx={{mt: "45px"}}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={onLogout}>
            <Typography>Выйти</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  )
}

export default NavMobile;
