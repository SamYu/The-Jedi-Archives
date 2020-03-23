import palette from 'google-palette';

// eslint-disable-next-line import/prefer-default-export
export function serializeChartData(apiData = [], field, datasetOptions = {}) {
    const filteredData = apiData.filter((data) => data[field] !== 'unknown');
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
