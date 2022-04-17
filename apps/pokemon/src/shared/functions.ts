export async function getFromEndpoint<T>(endpoint: string, abortSignal?: AbortSignal): Promise<T | undefined> {
	try {
		const response = await fetch(endpoint, { signal: abortSignal });

		if (response.status >= 200 && response.status < 300) {
			return await response.json();
		}
	} catch (error) {
		console.error(error);
	}
}

export function capitalize(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getRandomNumber(min: number, max: number): number {
	return Math.random() * (max - min + 1) + min;
}
