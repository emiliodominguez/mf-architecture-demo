import { useState, useEffect, lazy, Suspense } from "react";
import { ICharacter, ICharacterEndpointResponse } from "../../models/character";
import { endpoints, getFromEndpoint } from "../../shared";
import styles from "./Characters.module.scss";

const Table = lazy(() => import("ui/Library/Table"));

export default function Characters(): JSX.Element {
	const [characters, setCharacters] = useState<ICharacter[]>([]);

	useEffect(() => {
		(async () => {
			const data = await getFromEndpoint<ICharacterEndpointResponse>(endpoints.characters);
			if (data) setCharacters(data.results);
		})();
	}, []);

	return characters.length > 0 ? (
		<Suspense>
			<Table
				headers={["ID", "Image", "Name", "Status", "Species", "Type", "Gender", "Origin", "Created"]}
				rows={characters.map(character => [
					character.id,
					<img className={styles.thumb} src={character.image} alt={character.name} />,
					character.name,
					character.status,
					character.species,
					character.type,
					character.gender,
					character.origin.name,
					new Date(character.created).toLocaleDateString()
				])}
			/>
		</Suspense>
	) : (
		<h3>No elements to display</h3>
	);
}
