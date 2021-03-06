import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core';


const styles = {
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        fontSize: '1.25rem',
    },
    subtitle: {
        fontFamily: 'Anakin Mono',
        fontSize: 16,
        '@media (max-width: 768px)': {
            fontSize: 8,
        },
    },
};

function NavBar({ classes }) {
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography className={classes.title} variant="h1">
                        The Jedi Archives
                    </Typography>
                    <Typography className={classes.subtitle} variant="h2">
                        Built by Sam Yu
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>

    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
