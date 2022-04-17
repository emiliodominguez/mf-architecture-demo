import { lazy, Suspense } from "react";
import Home from "../components/Home";

const PokemonApp = lazy(() => import("pokemon/Pokemon"));
const RickAndMortyApp = lazy(() => import("rick_and_morty/RickAndMorty"));

const routes = Object.freeze({
	home: {
		url: "/",
		label: "Home",
		component: <Home />
	},
	pokemon: {
		url: "pokemon/*",
		label: "Pokemon",
		component: (
			<Suspense fallback="Loading...">
				<PokemonApp />
			</Suspense>
		)
	},
	rickAndMorty: {
		url: "rick-and-morty/*",
		label: "Rick & Morty",
		component: (
			<Suspense fallback="Loading...">
				<RickAndMortyApp />
			</Suspense>
		)
	}
});

export default routes;
