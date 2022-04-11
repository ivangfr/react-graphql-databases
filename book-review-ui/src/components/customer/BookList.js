import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, Typography, CardActions, Button, Badge, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    justifyContent: 'center'
  },
  badge: {
    margin: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  }
}))

function BookList({ isLoading, books, openReviewsModal }) {
  const classes = useStyles()

  if (isLoading) {
    return null
  }

  const bookList = books && books.map(book => {
    return (
      <Grid item key={book.id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h6">{book.title}</Typography>
            <Typography gutterBottom variant="caption">ISBN: {book.isbn}</Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Badge color="primary" badgeContent={book.reviews.length} className={classes.badge} overlap="rectangular">
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => openReviewsModal(book)}>Reviews</Button>
            </Badge>
          </CardActions>
        </Card>
      </Grid>
    )
  })

  return (
    books && books.length > 0 ? (
      <Grid container className={classes.cardGrid} spacing={4}>
        {bookList}
      </Grid>
    ) : (
        <Paper className={classes.paper}>
          <Typography align='center' variant="h6" gutterBottom>No books</Typography>
        </Paper>
      )
  )
}

export default BookList