import { useRef, useState, useEffect, useCallback, lazy, Suspense } from "react";
import { ICharacterEndpointResponse } from "../../models/character";
import { endpoints, getFromEndpoint } from "../../shared";
import styles from "./Characters.module.scss";

const Table = lazy(() => import("ui/Library/Table"));
const Pagination = lazy(() => import("ui/Library/Pagination"));

export default function Characters(): JSX.Element {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [charactersData, setCharactersData] = useState<ICharacterEndpointResponse>();

	function goToPage(page: number): void {
		sectionRef.current?.parentElement?.scroll({ top: 0, behavior: "smooth" });
		setCurrentPage(page);
	}

	const getCharactersData = useCallback(async (): Promise<void> => {
		const data = await getFromEndpoint<ICharacterEndpointResponse>(`${endpoints.characters}?page=${currentPage}`).catch(error => console.error(error));
		if (data) setCharactersData(data);
	}, [currentPage]);

	useEffect(() => {
		getCharactersData();
	}, [getCharactersData]);

	return charactersData ? (
		<div ref={sectionRef}>
			<Suspense>
				<Table
					columns={["ID", "Image", "Name", "Status", "Species", "Type", "Gender", "Origin", "Created"]}
					rows={(charactersData.results ?? []).map(character => [
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

			<Suspense>
				<Pagination
					current={currentPage}
					total={charactersData.info.pages}
					disablePrevious={currentPage === 1}
					disableNext={currentPage === charactersData.info.pages}
					goToPage={goToPage}
					pageSelectorToTop
				/>
			</Suspense>
		</div>
	) : (
		<h3>No elements to display</h3>
	);
}
