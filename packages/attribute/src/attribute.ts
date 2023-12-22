export class Attribute<T extends { [K in keyof T]: AttributeValue }> {
	private instance: Instance;

	constructor(instance: Instance) {
		this.instance = instance;
	}

	get<Key extends keyof T & string>(key: Key) {
		return this.instance.GetAttribute(key) as T[Key] | undefined;
	}

	set<Key extends keyof T & string, Value extends T[Key]>(key: Key, value: Value) {
		this.instance.SetAttribute(key, value);
	}
}

export function createAttribute<T extends { [K in keyof T]: AttributeValue }>(instance: Instance) {
	return {
		get<Key extends keyof T & string>(key: Key) {
			return instance.GetAttribute(key) as T[Key] | undefined;
		},
		set<Key extends keyof T & string, Value extends T[Key]>(key: Key, value: Value) {
			instance.SetAttribute(key, value);
		}
	};
}