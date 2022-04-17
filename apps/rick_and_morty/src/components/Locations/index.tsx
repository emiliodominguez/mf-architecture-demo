import { useRef, useState, useEffect, useCallback, lazy, Suspense } from "react";
import { ILocationEndpointResponse } from "../../models/location";
import { endpoints, getFromEndpoint } from "../../shared";

const Table = lazy(() => import("ui/Library/Table"));
const Pagination = lazy(() => import("ui/Library/Pagination"));

export default function Episodes(): JSX.Element {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [locationsData, setLocationsData] = useState<ILocationEndpointResponse>();

	function goToPage(page: number): void {
		sectionRef.current?.parentElement?.scroll({ top: 0, behavior: "smooth" });
		setCurrentPage(page);
	}

	const getLocationsData = useCallback(async (): Promise<void> => {
		const data = await getFromEndpoint<ILocationEndpointResponse>(`${endpoints.locations}?page=${currentPage}`).catch(error => console.error(error));
		if (data) setLocationsData(data);
	}, [currentPage]);

	useEffect(() => {
		getLocationsData();
	}, [getLocationsData]);

	return locationsData ? (
		<div ref={sectionRef}>
			<Suspense>
				<Table
					columns={["ID", "Name", "Type", "Dimension", "Created"]}
					rows={locationsData.results.map(location => [
						location.id,
						location.name,
						location.type,
						location.dimension,
						new Date(location.created).toLocaleDateString()
					])}
				/>
			</Suspense>

			<Suspense>
				<Pagination
					current={currentPage}
					total={locationsData.info.pages}
					disablePrevious={currentPage === 1}
					disableNext={currentPage === locationsData.info.pages}
					goToPage={goToPage}
					pageSelectorToTop
				/>
			</Suspense>
		</div>
	) : (
		<h3>No elements to display</h3>
	);
}
