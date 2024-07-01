/// <reference types="@rbxts/testez/globals" />

import { shuffle } from './index';

function isArrayEqual<T>(a: T[], b: T[]): boolean {
	if (a.size() !== b.size()) {
		return false;
	}

	for (let i = 0; i < a.size(); i++) {
		if (a[i] !== b[i]) {
			return false;
		}
	}

	return true;
}

export = (): void => {
	describe('shuffle function tests', () => {
		it('should preserve all original elements', () => {
			const originalArray = [1, 2, 3, 4, 5];
			shuffle(originalArray);

			expect(originalArray.size()).to.equal(5);
			expect(isArrayEqual(originalArray.sort(), [1, 2, 3, 4, 5])).to.equal(true);
		});

		it('should not preserve the array in the same order every time', () => {
			const originalArray = [1, 2, 3, 4, 5];

			// Test for non-equality in a loop to statistically ensure shuffling over multiple runs.
			let shuffledCount = 0;
			const iterations = 10;

			for (let i = 0; i < iterations; i++) {
				const arrayCopy = [...originalArray];
				shuffle(arrayCopy);
				if (isArrayEqual(arrayCopy, originalArray)) {
					continue;
				}

				shuffledCount += 1;
				break;
			}

			// It's statistically improbable for the array to remain in the same order every time.
			expect(shuffledCount > 0).to.equal(true);
		});
	});
};
