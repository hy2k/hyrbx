export function createAttribute<T extends { [K in keyof T]: AttributeValue }>(instance: Instance) {
	return {
		get: <Key extends keyof T & string>(key: Key) => {
			return instance.GetAttribute(key) as T[Key] | undefined;
		},
		set: <Key extends keyof T & string, Value extends T[Key]>(key: Key, value: Value) => {
			instance.SetAttribute(key, value);
		},
	};
}
