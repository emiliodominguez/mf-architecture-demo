export async function getFromEndpoint<T>(endpoint: string): Promise<T | undefined> {
	try {
		const response = await fetch(endpoint);

		if (response.status >= 200 && response.status < 300) {
			return await response.json();
		}
	} catch (error) {
		console.error(error);
	}
}
