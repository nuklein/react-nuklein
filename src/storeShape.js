// @flow
import { PropTypes } from 'react';

const storeShape = PropTypes.shape({
	getStore: PropTypes.func.isRequired,
	setStore: PropTypes.func.isRequired,
});

export default storeShape;
