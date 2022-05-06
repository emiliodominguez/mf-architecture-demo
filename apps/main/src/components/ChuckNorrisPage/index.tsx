import { useCallback, useEffect, useState } from "react";
import { useChuckNorris } from "chuck_norris/ChuckNorrisContext";
import styles from "./ChuckNorrisPage.module.scss";

export default function ChuckNorrisPage(): JSX.Element {
	const { getRandomJoke } = useChuckNorris();
	const [randomJoke, setRandomJoke] = useState<any>(null);

	const getJoke = useCallback(() => {
		const abortController = new AbortController();

		getRandomJoke(abortController.signal)
			.then(setRandomJoke)
			.catch(() => console.error("There was an error fetching a random joke..."));

		return { abortController };
	}, [getRandomJoke]);

	useEffect(() => {
		const { abortController } = getJoke();

		return () => {
			abortController.abort();
		};
	}, [getJoke]);

	return (
		<div className={styles.page}>
			{randomJoke ? (
				<>
					<h3>{randomJoke.value}</h3>
					<button onClick={getJoke}>Get another joke</button>
				</>
			) : (
				<small>Loading initial joke...</small>
			)}
		</div>
	);
}
