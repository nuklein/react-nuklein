'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var storeShape = _react.PropTypes.shape({
	getStore: _react.PropTypes.func.isRequired,
	setStore: _react.PropTypes.func.isRequired
});
exports.default = storeShape;