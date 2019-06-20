import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

function Navbar() {
  const useStyles = makeStyles(theme => ({
    link: {
      marginLeft: theme.spacing(3),
      color: 'white'
    },
  }))

  const classes = useStyles()

  return (
    <AppBar position="static">
      <Container maxWidth='md'>
        <Toolbar variant="dense">
          <Typography variant="h6">Book Review UI</Typography>
          <Typography>
            <NavLink to='/customer' className={classes.link}>Customer</NavLink>
            <NavLink to='/book' className={classes.link}>Book</NavLink>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar