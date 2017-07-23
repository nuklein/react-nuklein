// @flow
/* eslint import/prefer-default-export: 0 */
export type Schema = Function | {
	schema?: Function;
	before?: Function;
	after?: Function;
	modificators?: Object;
	settings?: {
		propsObjectName?: string;
	};
};
