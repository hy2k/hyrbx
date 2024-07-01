export class AttributeManager<T extends { [K in keyof T]: AttributeValue }, U extends Instance = Instance> {
	readonly instance: U;

	constructor(instance: U) {
		this.instance = instance;
	}

	get<Key extends keyof T & string>(key: Key): T[Key] | undefined {
		return this.instance.GetAttribute(key) as T[Key] | undefined;
	}

	remove<Key extends keyof T & string>(key: Key): void {
		this.instance.SetAttribute(key, undefined);
	}

	set<Key extends keyof T & string, Value extends T[Key]>(key: Key, value: Value): void {
		this.instance.SetAttribute(key, value);
	}
}

export function createAttribute<T extends { [K in keyof T]: AttributeValue }, U extends Instance = Instance>(
	instance: U,
): AttributeManager<T, U> {
	return new AttributeManager<T, U>(instance);
}
