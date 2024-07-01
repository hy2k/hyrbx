import type { PaletteShadeHexMap } from './colors';

import { PaletteColorScheme } from './colors';

type PaletteShade = keyof PaletteShadeHexMap;

type PaletteColorName = keyof typeof PaletteColorScheme;

type NoShadeColorName = Extract<PaletteColorName, 'black' | 'white'>;

type PalleteColorId = `${Exclude<PaletteColorName, NoShadeColorName>}_${PaletteShade}` | NoShadeColorName;

type Pallete = {
	readonly [Id in PalleteColorId]: Color3;
};

function generatePalette(): Pallete {
	const palette: {
		[name: string]: Color3;
	} = {};

	for (const [name, color] of pairs(PaletteColorScheme)) {
		if (typeIs(color, 'string')) {
			palette[name] = Color3.fromHex(color);
		} else {
			for (const [shade, hex] of pairs(color)) {
				palette[`${name}_${shade}`] = Color3.fromHex(hex);
			}
		}
	}

	return palette as Pallete;
}

export const palette = generatePalette();
