// @flow
import { Component, Children } from 'react';
import storeShape from '../../storeShape';

class Provider extends Component {
	getChildContext() {
		return { nStore: this.props.store || this.context.store || {} };
	}

	render() {
		return Children.only(this.props.children);
	}
}

Provider.propTypes = {
	store: storeShape.isRequired,
};

Provider.childContextTypes = {
	nStore: storeShape.isRequired,
};

export default Provider;
