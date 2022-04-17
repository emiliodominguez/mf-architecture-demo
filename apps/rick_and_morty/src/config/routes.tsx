import Characters from "../components/Characters";
import Locations from "../components/Locations";
import Episodes from "../components/Episodes";

const routes = Object.freeze({
	characters: {
		url: "characters",
		label: "Characters",
		component: <Characters />
	},
	locations: {
		url: "locations",
		label: "Locations",
		component: <Locations />
	},
	episodes: {
		url: "episodes",
		label: "Episodes",
		component: <Episodes />
	}
});

export default routes;
