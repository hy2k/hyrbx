/// <reference types="@rbxts/testez/globals" />

// https://www.totaltypescript.com/how-to-test-your-types#rolling-your-own
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

import { createAttribute } from './index';

export = (): void => {
	it('should get attribute correctly', () => {
		const part = new Instance('Part');

		const attribute = createAttribute<{
			numberAttr: number;
			stringAttr: string;
		}>(part);

		expect(attribute.get('stringAttr')).to.equal(undefined);
		expect(attribute.get('numberAttr')).to.equal(undefined);
	});

	it('should set attribute correctly', () => {
		const part = new Instance('Part');

		const attribute = createAttribute<{
			numberAttr: number;
			stringAttr: string;
		}>(part);

		attribute.set('stringAttr', 'test');
		expect(attribute.get('stringAttr')).to.equal('test');

		attribute.set('numberAttr', 1);
		expect(attribute.get('numberAttr')).to.equal(1);
	});

	it('should only accept valid value type', () => {
		const part = new Instance('Part');

		const attribute = createAttribute<{
			numberAttr: number;
			stringAttr: string;
		}>(part);

		type ShouldOnlyAcceptValidValueType<
			Setter extends typeof attribute.set,
			Key extends Parameters<Setter>[0],
			Value,
		> = Setter extends (key: Key, value: Value) => void ? true : false;

		type _Test1 = Expect<Equal<ShouldOnlyAcceptValidValueType<typeof attribute.set, 'stringAttr', 'test'>, true>>;
		type _Test2 = Expect<Equal<ShouldOnlyAcceptValidValueType<typeof attribute.set, 'stringAttr', 0>, false>>;
		type _Test3 = Expect<Equal<ShouldOnlyAcceptValidValueType<typeof attribute.set, 'numberAttr', 'test'>, false>>;
		type _Test4 = Expect<Equal<ShouldOnlyAcceptValidValueType<typeof attribute.set, 'numberAttr', 0>, true>>;

		// Don't care about the value, just that it compiles
		expect(attribute).to.be.ok();
	});

	it('should only accept valid instance type', () => {
		type ShouldOnlyAcceptModel<T> = Parameters<
			typeof createAttribute<
				{
					value: string;
				},
				Model
			>
		>[0] extends T
			? true
			: false;

		type _Test1 = Expect<Equal<ShouldOnlyAcceptModel<Model>, true>>;
		type _Test2 = Expect<Equal<ShouldOnlyAcceptModel<Part>, false>>;

		type ShouldOnlyAcceptPlayer<T> = Parameters<
			typeof createAttribute<
				{
					value: string;
				},
				Player
			>
		>[0] extends T
			? true
			: false;

		type _Test3 = Expect<Equal<ShouldOnlyAcceptPlayer<Player>, true>>;
		type _Test4 = Expect<Equal<ShouldOnlyAcceptPlayer<Model>, false>>;

		expect(true).to.be.ok();
	});

	it('should remove attribute by key', () => {
		const part = new Instance('Part');

		const attribute = createAttribute<{
			foo: string;
		}>(part);

		attribute.set('foo', 'bar');
		expect(attribute.get('foo')).to.equal('bar');

		attribute.remove('foo');
		expect(attribute.get('foo')).to.equal(undefined);
	});
};
