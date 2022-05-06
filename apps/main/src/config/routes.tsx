import { lazy, Suspense } from "react";
import Home from "../components/Home";
import ChuckNorrisPage from "../components/ChuckNorrisPage";

const PokemonApp = lazy(() => import("pokemon/Pokemon"));
const RickAndMortyApp = lazy(() => import("rick_and_morty/RickAndMorty"));
const ChuckNorrisContextProvider = lazy(() => import("chuck_norris/ChuckNorrisContext").then(m => ({ default: m.ChuckNorrisContextProvider })));

const routes = Object.freeze({
	home: {
		url: "/",
		label: "Home",
		component: <Home />
	},
	pokemon: {
		url: "pokemon",
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
	},
	chuckNorris: {
		url: "chuck-norris/*",
		label: "Chuck Norris",
		component: (
			<Suspense fallback="Loading...">
				<ChuckNorrisContextProvider>
					<ChuckNorrisPage />
				</ChuckNorrisContextProvider>
			</Suspense>
		)
	}
});

export default routes;
