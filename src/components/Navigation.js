import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        position: 'absolute',
        width: 500,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));

export default function Navigation(props) {  
    const classes = useStyles();   
    const [genre, setGenre] = useState([]); 
    const [moviesPerPage, setMoviesPerPage] = useState(12); 

    function genresToShow(event){
        setGenre(event.target.value)
        props.genresToShow(event.target.value)
    }

    function numberMoviesPerPage(event){
        setMoviesPerPage(event.target.value)
        props.moviesOnPageFunc(event.target.value)   
    }
    
    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-chip">Genres</InputLabel>
                        <Select
                            autoWidth={false}
                            multiple
                            value={genre}
                            onChange={genresToShow}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={selected => (
                                <div className={classes.chips}>
                                    {selected.map(value => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {props.movies.map(oneMovie => oneMovie = oneMovie.category).filter((val, ind, array) => array.indexOf(val) === ind)
                                .map(oneGenre => (
                                    <MenuItem key={oneGenre} value={oneGenre}>
                                        {oneGenre}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-helper">Number</InputLabel>
                        <Select
                            value={moviesPerPage}
                            onChange={numberMoviesPerPage}
                            input={<Input name="age" id="age-helper" />}
                        >                           
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                        </Select>
                        <FormHelperText>Movies to show on page</FormHelperText>
                    </FormControl>
                </form>
            </Container>
        </React.Fragment>
    );

}
