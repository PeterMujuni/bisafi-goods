import React from 'react'
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Typography from "@mui/material/Typography"

const Navbar = () => {
  return (
		<Box>
			<AppBar position='static'>
				<Toolbar sx={{backgroundColor: "white"}}>
                    <Typography sx={{flexGrow: 1}} color="black" variant='h5'>
                        BISAFI
                    </Typography>
                    <IconButton edge="end">
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
			</AppBar>
		</Box>
  );
}

export default Navbar