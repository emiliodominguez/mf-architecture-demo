import { useState, useEffect, lazy, Suspense, MouseEvent } from "react";
import { IPokemon, IPokemonResponse } from "../../models/pokemon";
import { capitalize, getFromEndpoint, getRandomNumber } from "../../shared/functions";
import styles from "./App.module.scss";

const Spinner = lazy(() => import("ui/Library/Spinner"));

export default function App(): JSX.Element {
	const [pokemons, setPokemons] = useState<IPokemon[]>([]);

	async function getPokemons(): Promise<void> {
		const initialData = await getFromEndpoint<IPokemonResponse>("https://pokeapi.co/api/v2/pokemon?limit=151").catch(error => console.error(error));
		const completeData = await Promise.all((initialData?.results ?? []).map(result => getFromEndpoint(result.url)));
		setPokemons(completeData as IPokemon[]);
	}

	function handleMouseEnter(e: MouseEvent<HTMLDivElement>): void {
		const card = e.currentTarget;
		card.style.setProperty("--rotation", `${getRandomNumber(-5, 5)}deg`);
	}

	function handleMouseMove(e: MouseEvent<HTMLDivElement>): void {
		const card = e.currentTarget;
		const cardRect = card.getBoundingClientRect();
		const x = e.clientX - cardRect.left;
		const y = e.clientY - cardRect.top;

		card.style.setProperty("--shadow-x", `${x * -0.5}px`);
		card.style.setProperty("--shadow-y", `${y * -0.5}px`);
	}

	useEffect(() => {
		getPokemons();
	}, []);

	return pokemons.length > 0 ? (
		<>
			<h1 className={styles.title}>First generation Pokémon</h1>

			<div className={styles.cards}>
				{pokemons.map(pokemon => (
					<div key={pokemon.id} className={styles.card} onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove}>
						<h2>{capitalize(pokemon.name)}</h2>

						<ul>
							{pokemon.stats.map(stat => (
								<li key={stat.stat.name}>
									<b>{stat.stat.name.length > 2 ? capitalize(stat.stat.name) : stat.stat.name.toUpperCase()}: </b>
									{stat.base_stat}
								</li>
							))}
						</ul>

						<img src={pokemon.sprites.front_default} alt={pokemon.name} />
					</div>
				))}
			</div>
		</>
	) : (
		<Suspense>
			<Spinner />
		</Suspense>
	);
}
