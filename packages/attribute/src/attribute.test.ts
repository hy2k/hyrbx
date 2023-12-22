/// <reference types="@rbxts/testez/globals" />

// https://www.totaltypescript.com/how-to-test-your-types#rolling-your-own
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

import { createAttribute } from './attribute';

export = () => {
	it('should pass get and set attribute', () => {
		const part = new Instance('Part');

		const attribute = createAttribute<{
			numberAttr: number;
			stringAttr: string;
		}>(part);

		expect(attribute.get('stringAttr')).to.equal(undefined);
		attribute.set('stringAttr', 'test');
		expect(attribute.get('stringAttr')).to.equal('test');

		expect(attribute.get('numberAttr')).to.equal(undefined);
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
	});
};
