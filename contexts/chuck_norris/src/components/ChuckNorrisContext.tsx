import { createContext, PropsWithChildren, useContext } from "react";

interface Joke {}

interface ChuckNorrisContextPayload {
	getRandomJoke: (signal: AbortSignal) => Promise<Joke>;
}

const ChuckNorrisContext = createContext({} as ChuckNorrisContextPayload);

export function ChuckNorrisContextProvider(props: PropsWithChildren<ChuckNorrisContextPayload>): JSX.Element {
	async function getRandomJoke(signal: AbortSignal): Promise<Joke> {
		return await (await fetch("https://api.chucknorris.io/jokes/random", { signal })).json();
	}

	return <ChuckNorrisContext.Provider value={{ getRandomJoke }}>{props.children}</ChuckNorrisContext.Provider>;
}

export function useChuckNorris(): ChuckNorrisContextPayload {
	const context = useContext(ChuckNorrisContext);

	// if (!!Object.entries(context).length) throw new Error("useChuckNorris hook must be used within ChuckNorrisContext");

	return context;
}
