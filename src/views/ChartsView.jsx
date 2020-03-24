import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchFromApiIfNeeded } from '../actions/apiActions';
import { serializeChartData, getChartType, chartOptions } from '../utils/chartUtils';
import { apiSchemas } from '../utils/apiUtils';

function ChartsView({
    selectedApi, apiData, isFetching, dispatch,
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
    if (isFetching) return <CircularProgress />;
    return (
        <div style={{ marginTop: 60 }}>
            <div>
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
            {ChartType && (
                <ChartType
                    data={chartData}
                    options={chartOptions(
                        apiSchemas[selectedApi][chartKey].displayName,
                    )[ChartType.name]}
                />
            )}
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
