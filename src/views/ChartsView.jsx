import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';


import { fetchFromApiIfNeeded, selectAPI } from '../actions/apiActions';
import { serializeChartData } from '../utils/chartUtils';

function ChartsView({
    selectedApi, apiData, isFetching, dispatch,
}) {
    const [chartData, updateChartData] = useState({});
    const [apiName, updateApiName] = useState(selectedApi);
    useEffect(() => {
        dispatch(fetchFromApiIfNeeded(selectedApi));
    });
    useEffect(() => {
        const serializedData = serializeChartData(apiData, 'length');
        updateChartData(serializedData);
    }, [apiData]);

    const handleApiChange = (event) => {
        const newApiName = event.target.value;
        updateApiName(newApiName);
        dispatch(selectAPI(newApiName));
    };
    return (
        <div>
            <div>
                <Select
                    value={apiName}
                    onChange={handleApiChange}
                >
                    <MenuItem value="people">People</MenuItem>
                    <MenuItem value="planets">Planets</MenuItem>
                    <MenuItem value="species">Species</MenuItem>
                    <MenuItem value="films">Films</MenuItem>
                    <MenuItem value="vehicles">Vehicles</MenuItem>
                    <MenuItem value="starships">Starships</MenuItem>
                </Select>
            </div>
            {isFetching
                ? <CircularProgress />
                : <Bar data={chartData} />}
        </div>
    );
}

ChartsView.propTypes = {
    selectedApi: PropTypes.string.isRequired,
    apiData: PropTypes.arrayOf(object).isRequired,
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

export default connect(mapStateToProps)(ChartsView);
