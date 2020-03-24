import palette from 'google-palette';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    apiSchemas, NUMERIC, CATEGORICAL, RELATIONAL,
} from './apiUtils';

function serializeNumericChartData(field, apiData = [], datasetOptions = {}) {
    const filteredData = apiData.filter((data) => (
        data[field] !== 'n/a'
    ));
    const parseInts = filteredData.map((data) => ({
        ...data,
        [field]: field in data && parseFloat(data[field].replace(/,/g, '')),
    }));
    const sortedData = parseInts.sort((a, b) => a[field] - b[field]);
    const labels = sortedData.map((data) => data.name || data.title);
    const dataValues = sortedData.map((data) => data[field]);
    return {
        labels,
        datasets: [
            {
                ...datasetOptions,
                backgroundColor: palette('tol-sq', dataValues.length).map(
                    (color) => `#${color}`,
                ),
                label: field,
                data: dataValues,
            },
        ],
    };
}

function groupBy(dataset, field) {
    return dataset.reduce((acc, data) => {
        const keys = data[field].split(', ');
        keys.forEach((key) => {
            if (!acc[key]) {
                acc[key] = 0;
            }
            acc[key] += 1;
        });
        return acc;
    }, {});
}

function serializeCategoricalChartData(field, apiData = [], datasetOptions = {}) {
    const aggregatedData = groupBy(apiData, field);
    return {
        labels: Object.keys(aggregatedData),
        datasets: [
            {
                ...datasetOptions,
                backgroundColor: palette('tol-rainbow', Object.keys(aggregatedData).length).map(
                    (color) => `#${color}`,
                ),
                label: field,
                data: Object.values(aggregatedData),
            },
        ],
    };
}

function serializeRelationalChartData(field, apiData = [], datasetOptions = {}) {
    const sortedData = apiData.sort((a, b) => a[field].length - b[field].length);
    const labels = sortedData.map((data) => data.name || data.title);
    const dataValues = sortedData.map((data) => data[field].length);
    return {
        labels,
        datasets: [
            {
                ...datasetOptions,
                backgroundColor: palette('tol-sq', dataValues.length).map(
                    (color) => `#${color}`,
                ),
                label: field,
                data: dataValues,
            },
        ],
    };
}

export function serializeChartData(selectedApi, field, apiData = [], datasetOptions = {}) {
    if (!apiSchemas[selectedApi][field]) return {};
    const filteredData = apiData.filter((data) => (
        data[field] !== 'unknown' && data[field] !== 'none'
    ));
    switch (apiSchemas[selectedApi][field].type) {
    case NUMERIC:
        return serializeNumericChartData(field, filteredData, datasetOptions);
    case CATEGORICAL:
        return serializeCategoricalChartData(field, filteredData, datasetOptions);
    case RELATIONAL:
        return serializeRelationalChartData(field, filteredData, datasetOptions);
    default:
        return {};
    }
}

export function getChartType(selectedApi, field) {
    if (!apiSchemas[selectedApi][field]) return null;
    switch (apiSchemas[selectedApi][field].type) {
    case NUMERIC:
    case RELATIONAL:
        return Bar;
    case CATEGORICAL:
        return Doughnut;
    default:
        return null;
    }
}

const defaultOptions = (titleText) => ({
    title: {
        display: true,
        text: titleText,
    },
    legend: {
        display: false,
    },
});

export const chartOptions = (titleText) => ({
    Bar: {
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                },
            }],
        },
        ...defaultOptions(titleText),
    },
    Doughnut: {
        ...defaultOptions(titleText),
    },
});
