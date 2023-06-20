import {
  Avatar,
  Box,
  Button, ButtonGroup,
  IconButton, Menu, MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import ButtonDropDown from "../../../AppBarDropDown/ButtonDropDown";
import WidgetsIcon from '@mui/icons-material/Widgets';
import useAuth from "../../../../hooks/useAuth";
import {useState} from "react";

const NavDesktop = ({sx, pages, selectedPageId, onLogout, onPageChange, onAddPage, onWidgetAdd}) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const {auth} = useAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Toolbar disableGutters sx={sx}>
      <AdbIcon sx={{display: "flex", mr: 1}}/>
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
      <Box sx={{flexGrow: 1, display: "flex", alignItems: "center"}}>
        <ButtonGroup>
          <ButtonDropDown
            items={pages || []}
            selectedKey={selectedPageId}
            emptyLabel="Выберите страницу"
            onSelectedChange={onPageChange}
            getItemCaption={(item) => item.display_name || item.name}
            getItemKey={(item) => item.id}
          />
          <Button
            color="inherit"
            onClick={onAddPage}
          >
            <AddToQueueIcon/>
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            color="inherit"
            style={{marginLeft: "10px"}}
            endIcon={<WidgetsIcon />}
            onClick={onWidgetAdd}
          >Добавить виджет</Button>
        </ButtonGroup>
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
  );
}

export default NavDesktop;
