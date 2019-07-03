import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog, DialogTitle, DialogContent, Grid, List, ListItem, Avatar, ListItemAvatar, ListItemText,
  TextField, FormControl, InputLabel, Select, MenuItem, Input, Button, Icon, Typography, Divider
} from '@material-ui/core'
import Moment from 'react-moment'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dialogTitle: {
    backgroundColor: theme.palette.background.default,
  },
  textField: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2),
  },
  icon: {
    fontSize: 15,
  },
  moment: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

function ReviewModal({ modal, book, handleClose, handleChange, submitReview }) {
  const classes = useStyles()

  const reviewList = book && book.reviews && book.reviews.length > 0 ? book.reviews.map(review => {
    const key = `${review.reviewer}-${review.createdAt}`
    const initials = review.reviewer.match(/\S+/g).map(w => w.charAt(0).toUpperCase()).join('')
    const starIcons = [...Array(review.rating).keys()].map(i => <Icon key={i} className={classes.icon}>star</Icon>)
    
    return (
      <ListItem key={key} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.purpleAvatar}>{initials}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component="span"
                variant="subtitle1"
                color="textPrimary">{review.reviewer}
              </Typography>
              <Typography
                component="span"
                variant="caption"
                color="textSecondary">
                  <Moment fromNow ago className={classes.moment}>{review.createdAt}</Moment>
              </Typography>
              {starIcons}
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="subtitle2"
                color="textPrimary"
              >{review.comment}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    )
  }) : <Typography variant="subtitle2" component="h2" gutterBottom>No reviews</Typography>

  const modalTitle = book && `"${book.title}" Reviews`

  return (
    <Dialog
      open={modal.open}
      fullWidth
      maxWidth='sm'
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>{modalTitle}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <form className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                  <TextField
                    name="reviewer"
                    label="Reviewer"
                    fullWidth
                    value={modal.form.reviewer}
                    margin="normal"
                    className={classes.textField}
                    onChange={handleChange}
                    error={modal.form.reviewerError}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="rating">Rating</InputLabel>
                    <Select
                      value={modal.form.rating}
                      onChange={handleChange}
                      input={<Input name="rating" id="rating" />}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    name="comment"
                    label="Comment"
                    value={modal.form.comment}
                    margin="normal"
                    fullWidth
                    multiline
                    className={classes.textField}
                    onChange={handleChange}
                    error={modal.form.commentError}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={submitReview}>Submit</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <List className={classes.root}>
              {reviewList}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewModal