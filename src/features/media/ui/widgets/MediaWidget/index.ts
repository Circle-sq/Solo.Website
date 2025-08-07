import { memo } from 'react';
import { connect } from 'react-redux';

import type { ReduxState } from 'src/appState/redux/types';

import MediaWidget from './MediaWidget';

const mapStateToProps = (state: ReduxState) => ({
    eventId: state.media.get('eventId'),
});

export default connect(mapStateToProps)(memo(MediaWidget));
