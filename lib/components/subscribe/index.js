'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _nuklein = require('nuklein');

var _storeShape = require('../../storeShape');

var _storeShape2 = _interopRequireDefault(_storeShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subscribe = function subscribe(schema, modificators, before, after, settings) {
	return function (MyComponent) {
		var localSchema = void 0;
		var localBefore = before;
		var localAfter = after;
		var localModificators = modificators;
		var localSettings = settings;

		if (schema && typeof schema === 'function') {
			localSchema = schema;
		}

		if (schema && (typeof schema === 'undefined' ? 'undefined' : (0, _typeof3.default)(schema)) === 'object') {
			localBefore = schema.before;
			localSchema = schema.schema;
			localAfter = schema.after;
			localModificators = schema.modificators;
			localSettings = schema.settings;
		}

		var Subscribe = function (_Component) {
			(0, _inherits3.default)(Subscribe, _Component);

			function Subscribe() {
				var _ref;

				var _temp, _this, _ret;

				(0, _classCallCheck3.default)(this, Subscribe);

				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Subscribe.__proto__ || Object.getPrototypeOf(Subscribe)).call.apply(_ref, [this].concat(args))), _this), _this.data = {}, _this.usageProps = false, _this.subscribeFunc = null, _this.mount = true, _this.unsubscribe = function () {
					if (_this.subscribeFunc && _this.subscribeFunc.unsubscribe) {
						_this.subscribeFunc = _this.subscribeFunc.unsubscribe();
					}
				}, _this.resubscribe = function () {
					if (_this.subscribeFunc && _this.subscribeFunc.subscribe) {
						_this.subscribeFunc = _this.subscribeFunc.subscribe();
					}
				}, _this.getProps = function (props) {
					_this.usageProps = true;
					return props || _this.props;
				}, _this.localSetStore = function (value, path, options) {
					var setStore = _this.context.nStore.setStore;

					return setStore(value, path, options, { component: MyComponent });
				}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
			}

			/* eslint-disable react/sort-comp */


			(0, _createClass3.default)(Subscribe, [{
				key: 'componentWillMount',

				/* eslint-enable react/sort-comp */

				value: function componentWillMount() {
					var _this2 = this;

					var _context = this.context,
					    getStore = _context.nStore.getStore,
					    store = _context.nStore;


					this.subscribeFunc = (0, _nuklein.subscribe)({
						store: store,
						schema: localSchema,
						callback: function callback(value) {
							if (_this2.mount) {
								_this2.data = value;
								_this2.forceUpdate();
							}
						},
						getProps: this.getProps,
						component: MyComponent,
						before: localBefore,
						after: localAfter
					});

					var propModificators = (0, _nuklein.registerModificators)(store, localModificators, MyComponent);

					this.propsObject = (0, _extends3.default)({}, propModificators, {
						setStore: this.localSetStore,
						getStore: getStore,
						unsubscribe: this.unsubscribe,
						resubscribe: this.resubscribe
					});
				}
			}, {
				key: 'componentWillReceiveProps',
				value: function componentWillReceiveProps(nextProps) {
					if (this.usageProps) {
						var _context$nStore = this.context.nStore,
						    setStore = _context$nStore.setStore,
						    getStore = _context$nStore.getStore;


						if (localBefore && typeof localBefore === 'function') {
							var newValue = localBefore(getStore, MyComponent, this.getProps(nextProps), 'changeProps');
							if (newValue) {
								setStore(newValue, null, MyComponent);
							}
						}

						if (schema && localSchema && typeof localSchema === 'function') {
							this.data = localSchema(getStore, this.getProps(nextProps));
							this.forceUpdate();
						}

						if (localAfter && typeof localAfter === 'function') {
							localAfter(getStore, MyComponent, this.getProps(nextProps), 'changeProps');
						}
					}
				}
			}, {
				key: 'componentWillUnmount',
				value: function componentWillUnmount() {
					this.mount = false;
					this.unsubscribe();
				}
			}, {
				key: 'render',
				value: function render() {
					var propsObject = (0, _extends3.default)({}, this.propsObject, this.data);

					if (localSettings && localSettings.propsObjectName) {
						propsObject = (0, _defineProperty3.default)({}, localSettings.propsObjectName, propsObject);
					}

					return (0, _react.createElement)(MyComponent, (0, _extends3.default)({}, this.props, propsObject));
				}
			}]);
			return Subscribe;
		}(_react.Component);

		Subscribe.contextTypes = {
			nStore: _storeShape2.default.isRequired
		};


		return (0, _hoistNonReactStatics2.default)(Subscribe, MyComponent);
	};
};

exports.default = subscribe;