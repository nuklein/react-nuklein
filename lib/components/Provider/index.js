'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _storeShape = require('../../storeShape');

var _storeShape2 = _interopRequireDefault(_storeShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Provider = function (_Component) {
	(0, _inherits3.default)(Provider, _Component);

	function Provider() {
		(0, _classCallCheck3.default)(this, Provider);
		return (0, _possibleConstructorReturn3.default)(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).apply(this, arguments));
	}

	(0, _createClass3.default)(Provider, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return { nStore: this.props.store || this.context.store || {} };
		}
	}, {
		key: 'render',
		value: function render() {
			return _react.Children.only(this.props.children);
		}
	}]);
	return Provider;
}(_react.Component);

Provider.propTypes = {
	store: _storeShape2.default.isRequired
};

Provider.childContextTypes = {
	nStore: _storeShape2.default.isRequired
};

exports.default = Provider;