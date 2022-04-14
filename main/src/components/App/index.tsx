import { lazy, Suspense } from "react";
import styles from "./App.module.scss";

const PokemonApp = lazy(() => import("pokemon/Pokemon"));
const RickAndMortyApp = lazy(() => import("rick_and_morty/RickAndMorty"));

export default function App() {
	return (
		<main>
			<h1>Main app</h1>

			<Suspense fallback="Loading Button">
				<PokemonApp />
			</Suspense>

			<Suspense fallback="Loading Button">
				<RickAndMortyApp />
			</Suspense>
		</main>
	);
}
