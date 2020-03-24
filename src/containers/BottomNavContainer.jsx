import { connect } from 'react-redux';
import BottomNav from '../components/BottomNav';

function mapStateToProps(state) {
    const { selectedApi } = state;
    return {
        selectedApi,
    };
}

export default connect(mapStateToProps)(BottomNav);
