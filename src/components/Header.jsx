import React, { useState } from 'react';
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
    },
};

function NavBar({ classes, }) {
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography className={classes.title} variant="h6">
                        Star Wars Stats
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>

    );
}

export default withStyles(styles)(NavBar);
