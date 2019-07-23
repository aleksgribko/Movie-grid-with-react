import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(theme => ({
    arrows: {
        fontSize: '3rem',
    },
}));

export default function PagesTurners(props) {   
    const classes = useStyles();
 
    return (
        <Container maxWidth="lg">
            <ArrowLeftIcon className={classes.arrows} style={props.totalPages === 1 ? { 'display': 'none' } : { 'display': 'inline' }} onClick={() => props.turnPage('left')} />
            <ArrowRightIcon className={classes.arrows} style={props.totalPages === 1 ? { 'display': 'none' } : { 'display': 'inline' }} onClick={() => props.turnPage('right')} />
        </Container>
    );

}   