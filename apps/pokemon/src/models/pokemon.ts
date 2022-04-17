export interface IBasePokemon {
	name: string;
	url: string;
}

export interface IPokemon {
	abilities: any[];
	base_experience: number;
	forms: any[];
	game_indices: any[];
	height: number;
	held_items: any[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: any[];
	name: string;
	order: number;
	past_types: any[];
	species: { name: string; url: string };
	sprites: {
		back_default: string;
		back_female: string;
		back_shiny: string;
		back_shiny_female: string;
		front_default: string;
		front_female: string;
		front_shiny: string;
		front_shiny_female: string;
	};
	stats: any[];
	types: any[];
	weight: number;
}

export interface IPokemonResponse {
	count: number;
	next: string;
	previous: string;
	results: IBasePokemon[];
}
