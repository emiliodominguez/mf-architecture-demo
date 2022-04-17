import { useState, useEffect, lazy, Suspense } from "react";
import { IEpisode, IEpisodeEndpointResponse } from "../../models/episode";
import { endpoints, getFromEndpoint } from "../../shared";

const Table = lazy(() => import("ui/Library/Table"));

export default function Episodes(): JSX.Element {
	const [episodes, setEpisodes] = useState<IEpisode[]>([]);

	useEffect(() => {
		(async () => {
			const data = await getFromEndpoint<IEpisodeEndpointResponse>(endpoints.episodes);
			if (data) setEpisodes(data.results);
		})();
	}, []);

	return episodes.length > 0 ? (
		<Suspense>
			<Table
				headers={["ID", "Name", "Air date", "Episode", "URL", "Created"]}
				rows={episodes.map(episode => [episode.id, episode.name, episode.air_date, episode.episode, episode.url, new Date(episode.created).toLocaleDateString()])}
			/>
		</Suspense>
	) : (
		<h3>No elements to display</h3>
	);
}
