// @flow
import { Component, createElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { registerModificators as register, subscribe as subscribeFunc } from 'nuklein';
import storeShape from '../../storeShape';
import type { Schema } from '../../types/Schema';

const subscribe = (
	schema?: Schema,
	modificators?: Object,
	before?: Function,
	after?: Function,
	settings?: {
		propsObjectName?: string;
	}
) => (MyComponent: Function) => {
	let localSchema;
	let localBefore = before;
	let localAfter = after;
	let localModificators = modificators;
	let localSettings = settings;

	if (schema && typeof schema === 'function') {
		localSchema = schema;
	}

	if (schema && typeof schema === 'object') {
		localBefore = schema.before;
		localSchema = schema.schema;
		localAfter = schema.after;
		localModificators = schema.modificators;
		localSettings = schema.settings;
	}

	class Subscribe extends Component {
		static contextTypes = {
			nStore: storeShape.isRequired,
		};

		/* eslint-disable react/sort-comp */
		data: Object = {};
		usageProps: boolean = false;
		subscribeFunc: null|Object = null;
		mount: boolean = true;
		getProps: Function;
		unsubscribe: Function;
		resubscribe: Function;
		propsObject: Object;
		/* eslint-enable react/sort-comp */

		componentWillMount() {
			const { nStore: { getStore }, nStore: store } = this.context;

			this.subscribeFunc = subscribeFunc({
				store,
				schema: localSchema,
				callback: (value) => {
					if (this.mount) {
						this.data = value;
						this.forceUpdate();
					}
				},
				getProps: this.getProps,
				component: MyComponent,
				before: localBefore,
				after: localAfter,
			});

			const propModificators = register(
				store,
				localModificators,
				MyComponent
			);

			this.propsObject = {
				...propModificators,
				setStore: this.localSetStore,
				getStore,
				unsubscribe: this.unsubscribe,
				resubscribe: this.resubscribe,
			};
		}

		componentWillReceiveProps(nextProps) {
			if (this.usageProps) {
				const { setStore, getStore } = this.context.nStore;

				if (localBefore && typeof localBefore === 'function') {
					const newValue = localBefore(
						getStore,
						MyComponent,
						this.getProps(nextProps),
						'changeProps');
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

		componentWillUnmount() {
			this.mount = false;
			this.unsubscribe();
		}

		unsubscribe = () => {
			if (this.subscribeFunc && this.subscribeFunc.unsubscribe) {
				this.subscribeFunc = this.subscribeFunc.unsubscribe();
			}
		}

		resubscribe = () => {
			if (this.subscribeFunc && this.subscribeFunc.subscribe) {
				this.subscribeFunc = this.subscribeFunc.subscribe();
			}
		}

		getProps = (props) => {
			this.usageProps = true;
			return props || this.props;
		}

		localSetStore = (value, path, options) => {
			const { setStore } = this.context.nStore;
			return setStore(value, path, options, { component: MyComponent });
		}

		render() {
			let propsObject = {
				...this.propsObject,
				...this.data,
			};

			if (localSettings && localSettings.propsObjectName) {
				propsObject = {
					[localSettings.propsObjectName]: propsObject,
				};
			}

			return createElement(MyComponent, {
				...this.props,
				...propsObject,
			});
		}
	}

	return hoistStatics(Subscribe, MyComponent);
};

export default subscribe;
