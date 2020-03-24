import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { fetchFromApiIfNeeded } from '../actions/apiActions';
import { serializeChartData, getChartType, getChartOptions } from '../utils/chartUtils';
import { apiSchemas } from '../utils/apiUtils';

const styles = {
    chartsView: {
        marginTop: 60,
    },
    chartWrapper: {
        height: '55vh',
        padding: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 768px)': {
            padding: 20,
        },
    },
    categorySelectWrapper: {
        textAlign: 'center',
        margin: 50,
        '@media (max-width: 1024px)': {
            margin: 20,
        },
    },
    loadingIndicator: {
        position: 'fixed',
    },
};

function ChartsView({
    classes, selectedApi, apiData, isFetching, dispatch,
}) {
    const [chartData, updateChartData] = useState({});
    const [chartKey, updateChartKey] = useState(Object.keys(apiSchemas[selectedApi])[0]);

    useEffect(() => {
        dispatch(fetchFromApiIfNeeded(selectedApi));
    });

    useEffect(() => {
        const serializedData = serializeChartData(selectedApi, chartKey, apiData);
        updateChartData(serializedData);
    }, [apiData, chartKey, selectedApi]);

    useEffect(() => {
        updateChartKey(Object.keys(apiSchemas[selectedApi])[0]);
    }, [selectedApi]);

    const handleChartKeyChange = (event) => {
        const newChartKey = event.target.value;
        updateChartKey(newChartKey);
    };
    const ChartType = getChartType(selectedApi, chartKey);
    return (
        <div className={classes.chartsView}>
            <Paper className={classes.chartWrapper}>
                {(!isFetching && ChartType)
                    ? (
                        <ChartType
                            data={chartData}
                            options={getChartOptions(
                                apiSchemas[selectedApi][chartKey].displayName,
                                ChartType,
                            )}
                        />
                    )
                    : <CircularProgress className={classes.loadingIndicator}/>}
            </Paper>
            <div className={classes.categorySelectWrapper}>
                <Typography variant="h6">Selected Category</Typography>
                <Select
                    value={chartKey}
                    onChange={handleChartKeyChange}
                >
                    {selectedApi in apiSchemas
                        && Object.keys(apiSchemas[selectedApi]).map((api) => (
                            <MenuItem key={api} value={api}>
                                {apiSchemas[selectedApi][api].displayName}
                            </MenuItem>
                        ))}
                </Select>
            </div>
        </div>
    );
}

ChartsView.propTypes = {
    selectedApi: PropTypes.string.isRequired,
    apiData: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { selectedApi, dataByApi } = state;
    const { isFetching, data: apiData } = dataByApi[selectedApi]
        || { isFetching: true, apiData: [] };
    return {
        selectedApi,
        apiData,
        isFetching,
    };
}

export default withStyles(styles)(connect(mapStateToProps)(ChartsView));
