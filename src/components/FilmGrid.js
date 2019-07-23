import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from '@material-ui/core/CardHeader';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import PagesTurners from './PagesTurners.js'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }, 
  icon: {
    color: 'black',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    fontSize: 32,
    transform: 'translate(0, 20%)',
  },
  img: {
    transition: 'transform .2s',
    margin: '0 auto',
    '&:hover': {
      transform: 'scale(2.0, 2.0)',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    setmargin: {
      margin: theme.spacing(1),
      textAlign: 'right',
    },
  }
}));

export default function FilmGrid(props) {

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1)
  const [filteredMovies, setFilteredMovies] = useState(props.movies)

  //find how many pages is needed for the page turners PageTurners.js
  function setNumberOfPages() {  
    if (props.numberMoviesOnPage >= filteredMovies && totalPages !== 1) {
      setTotalPages(1);
    } else if (props.numberMoviesOnPage < filteredMovies && Math.ceil(filteredMovies / props.numberMoviesOnPage) !== totalPages) {
      setTotalPages(Math.ceil(filteredMovies / props.numberMoviesOnPage));
    }
  }

  // function for a filter in renderMovieGrid()
  function formPageContent(item, ind) {
    let checkIfPass
    for (let x = 0; x < props.numberMoviesOnPage; x++) {
      if (props.numberMoviesOnPage * page <= ind && ind < props.numberMoviesOnPage * page + props.numberMoviesOnPage) {
        checkIfPass = true
      } else {
        checkIfPass = false
      }
    }
    return checkIfPass
  }

  // functions is used in PageTurners.js
  function turnPage(dir) {
    if (dir === 'left' && page > 0) setPage(page - 1)
    if (dir === 'right' && page < totalPages - 1) setPage(page + 1) 
  }

  // form an array of movies based on filters and conditions
  function renderMovieGrid() {
    setNumberOfPages()
    return (
      props.movies
        .filter(movie => {
          if (!props.genre.length) return true
          let genreIsPicked = false
          for (let genre of props.genre) {
            if (movie.category === genre) {
              genreIsPicked = true
            }
          }
          return genreIsPicked
        })
        .filter((item, ind, ar) => {
          if (filteredMovies !== ar.length) setFilteredMovies(ar.length)
          return formPageContent(item, ind)
        })
        .map((movie) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card className={classes.card}>
                <CardHeader
                  action={
                    <IconButton aria-label="Delete" className={classes.setmargin} onClick={() => props.movieBaseManipulation(movie.id, 'del')}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  title={movie.title}
                  subheader={movie.category}
                />
                <CardContent style={{ 'padding': '0px 8px 16px 8px' }}>
                  <ThumbUpIcon className={classes.icon} onClick={() => props.movieBaseManipulation(movie.id, 'up')} />
                  <span style={{ 'fontSize': '1.5rem' }}> {movie.likes} </span>
                  <ThumbDownIcon className={classes.icon} onClick={() => props.movieBaseManipulation(movie.id, 'down')} />
                  <span style={{ 'fontSize': '1.5rem' }}> {movie.dislikes} </span>
                </CardContent>
              </Card>
            </Grid>
          )
        })
    )
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {props.movies.length ? renderMovieGrid() : <span></span>}
      </Grid>
      <PagesTurners totalPages={totalPages} turnPage={turnPage} />
    </div>
  )
}
