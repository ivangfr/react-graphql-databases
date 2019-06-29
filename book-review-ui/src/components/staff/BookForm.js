import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  groupButton: {
    paddingTop: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  }
}))

function BookForm({ form, handleChange, clearForm, saveBook }) {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <form className={classes.form}>
        <TextField
          id="isbn"
          label="ISBN"
          className={classes.textField}
          value={form.isbn}
          onChange={handleChange}
          margin="normal"
          fullWidth
          error={form.isbnError}
        />
        <TextField
          id="title"
          label="Title"
          className={classes.textField}
          value={form.title}
          onChange={handleChange}
          margin="normal"
          fullWidth
          error={form.titleError}
        />

        <div className={classes.groupButton}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={clearForm}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={saveBook}>Save</Button>
        </div>
      </form>
    </Paper>
  )
}

export default BookForm