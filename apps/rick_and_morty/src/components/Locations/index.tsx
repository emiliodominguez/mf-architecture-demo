import { useState, useEffect, lazy, Suspense } from "react";
import { ILocation, ILocationEndpointResponse } from "../../models/location";
import { endpoints, getFromEndpoint } from "../../shared";

const Table = lazy(() => import("ui/Library/Table"));

export default function Location(): JSX.Element {
	const [locations, setLocations] = useState<ILocation[]>([]);

	useEffect(() => {
		(async () => {
			const data = await getFromEndpoint<ILocationEndpointResponse>(endpoints.locations);
			if (data) setLocations(data.results);
		})();
	}, []);

	return locations.length > 0 ? (
		<Suspense>
			<Table
				headers={["ID", "Name", "Type", "Dimension", "URL", "Created"]}
				rows={locations.map(location => [
					location.id,
					location.name,
					location.type,
					location.dimension,
					location.url,
					new Date(location.created).toLocaleDateString()
				])}
			/>
		</Suspense>
	) : (
		<h3>No elements to display</h3>
	);
}
