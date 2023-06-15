import {
  AppBar,
  Avatar,
  Box,
  Button, ButtonGroup,
  Container, IconButton, Menu, MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import useAuth from "../../../hooks/useAuth";
import {useState} from "react";
import useLogout from "../../../hooks/useLogout";
import ButtonDropDown from "../../AppBarDropDown/ButtonDropDown";
import {AddBox} from "@mui/icons-material";

const AppNav = ({pages, onPageAdd}) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);

  const selectedPageId = selectedPage?.id;
  const {auth} = useAuth();
  const logout = useLogout();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = async () => {
    await logout();
  }

  const handlePageChange = async (newPage) => {
    setSelectedPage(newPage);
  }

  const handleAddPage = async () => {
    onPageAdd && onPageAdd();
  }

  return (
    <AppBar position="static">
      <Container style={{maxWidth: '100%'}}>
        <Toolbar disableGutters>
          <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SYNERGY
          </Typography>
          <Box sx={{flexGrow: 1, display: "flex", alignItems: "center"}}>
            <ButtonGroup>
              <ButtonDropDown
                items={pages}
                selectedKey={selectedPageId}
                emptyLabel="Выберите страницу"
                onSelectedChange={handlePageChange}
                getItemCaption={(item) => item.display_name}
                getItemKey={(item) => item.id}
              />
              <Button
                color="inherit"
                onClick={handleAddPage}
              >
                <AddBox />
              </Button>
            </ButtonGroup>
          </Box>

          <Box sx={{flexGrow: 0}}>
            <Tooltip title={auth.username}>
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar alt={auth.username}/>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogoutClick}>
                <Typography>Выйти</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default AppNav;
