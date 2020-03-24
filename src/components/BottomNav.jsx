import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

import { selectAPI } from '../actions/apiActions';
import { AVAILABLE_APIS } from '../utils/apiUtils';

const NAVIGATION_ICONS = {
    people: 'fas fa-user',
    planets: 'fas fa-globe-americas',
    species: 'fas fa-dna',
    films: 'fas fa-film',
    vehicles: 'fas fa-motorcycle',
    starships: 'fas fa-space-shuttle',
};

const styles = {
    bottomNavText: {
        textTransform: 'capitalize',
    },
};

function APINavigation({ classes, selectedApi, dispatch }) {
    const handleOnClick = (_event, newApi) => {
        dispatch(selectAPI(newApi));
    };
    return (
        <BottomNavigation
            value={selectedApi}
            onChange={handleOnClick}
            showLabels
        >
            {Object.keys(AVAILABLE_APIS).map((api) => (
                <BottomNavigationAction
                    className={classes.bottomNavText}
                    value={api}
                    label={api}
                    icon={<Icon className={NAVIGATION_ICONS[api]} />}
                />
            ))}
        </BottomNavigation>
    );
}

APINavigation.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedApi: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { selectedApi } = state;
    return {
        selectedApi,
    };
}

export default withStyles(styles)(connect(mapStateToProps)(APINavigation));
