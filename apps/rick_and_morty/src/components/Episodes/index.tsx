import { useRef, useState, useEffect, useCallback, lazy, Suspense } from "react";
import { IEpisodeEndpointResponse } from "../../models/episode";
import { endpoints, getFromEndpoint } from "../../shared";

const Table = lazy(() => import("ui/Library/Table"));
const Pagination = lazy(() => import("ui/Library/Pagination"));

export default function Episodes(): JSX.Element {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [episodesData, setEpisodesData] = useState<IEpisodeEndpointResponse>();

	function goToPage(page: number): void {
		sectionRef.current?.parentElement?.scroll({ top: 0, behavior: "smooth" });
		setCurrentPage(page);
	}

	const getEpisodesData = useCallback(async (): Promise<void> => {
		const data = await getFromEndpoint<IEpisodeEndpointResponse>(`${endpoints.episodes}?page=${currentPage}`).catch(error => console.error(error));
		if (data) setEpisodesData(data);
	}, [currentPage]);

	useEffect(() => {
		getEpisodesData();
	}, [getEpisodesData]);

	return episodesData ? (
		<div ref={sectionRef}>
			<Suspense>
				<Table
					columns={["ID", "Name", "Air date", "Episode", "Created"]}
					rows={(episodesData.results ?? []).map(episode => [
						episode.id,
						episode.name,
						episode.air_date,
						episode.episode,
						new Date(episode.created).toLocaleDateString()
					])}
				/>
			</Suspense>

			<Suspense>
				<Pagination
					current={currentPage}
					total={episodesData.info.pages}
					disablePrevious={currentPage === 1}
					disableNext={currentPage === episodesData.info.pages}
					goToPage={goToPage}
					pageSelectorToTop
				/>
			</Suspense>
		</div>
	) : (
		<h3>No elements to display</h3>
	);
}
