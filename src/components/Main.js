import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import FilmGrid from "./FilmGrid.js"
import Navigation from "./Navigation.js"



export default function Main(props) {
	const [genre, setGenre] = useState([]);
	const [numberMoviesOnPage, setNumberMoviesOnPage] = useState(12);

	function moviesOnPageFunc(num) {
		setNumberMoviesOnPage(num)
	}

	function genresToShow(genres) {
		setGenre(genres)
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="lg">
				<Navigation movies={props.movies} moviesOnPageFunc={moviesOnPageFunc} genresToShow={genresToShow} />
				<FilmGrid movieBaseManipulation={props.movieBaseManipulation} movies={props.movies} numberMoviesOnPage={numberMoviesOnPage} genre={genre} />
			</Container>
		</React.Fragment>
	);

}
