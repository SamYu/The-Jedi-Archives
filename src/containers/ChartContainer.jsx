import { connect } from 'react-redux';
import Chart from '../components/Chart';

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

export default connect(mapStateToProps)(Chart);
