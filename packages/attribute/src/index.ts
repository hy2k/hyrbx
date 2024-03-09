export function createAttribute<T extends { [K in keyof T]: AttributeValue }, U extends Instance = Instance>(
	instance: U,
) {
	return {
		get: <Key extends keyof T & string>(key: Key) => {
			return instance.GetAttribute(key) as T[Key] | undefined;
		},
		remove: <Key extends keyof T & string>(key: Key) => {
			instance.SetAttribute(key, undefined);
		},
		set: <Key extends keyof T & string, Value extends T[Key]>(key: Key, value: Value) => {
			instance.SetAttribute(key, value);
		},
	};
}
