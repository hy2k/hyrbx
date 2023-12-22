import type { ColorMap } from './colors';

import { colors } from './colors';

type Shade = keyof ColorMap;

type ColorName = keyof typeof colors;

type BW = Extract<ColorName, 'black' | 'white'>;

type ColorShade = `${Exclude<ColorName, BW>}_${Shade}` | BW;

function generatePalette() {
	const palette: {
		[name: string]: Color3;
	} = {};

	for (const [name, color] of pairs(colors)) {
		if (typeIs(color, 'string')) {
			palette[name] = Color3.fromHex(color);
		} else {
			for (const [shade, hex] of pairs(color)) {
				palette[`${name}_${shade}`] = Color3.fromHex(hex);
			}
		}
	}

	return palette as {
		readonly [name in ColorShade]: Color3;
	};
}

export const palette = generatePalette();
