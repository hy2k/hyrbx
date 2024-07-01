/**
 * Shuffle the array in place.
 */
export function shuffle<T>(array: T[]): void {
	for (let currentIndex = array.size() - 1; currentIndex > 0; currentIndex--) {
		const randomIndex = math.floor(math.random() * (currentIndex + 1));

		// Swap the elements
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
}
