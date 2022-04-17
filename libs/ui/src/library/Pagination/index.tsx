import { useRef, useState, useEffect, useCallback } from "react";
import Button from "../Button";
import styles from "./Pagination.module.scss";

interface IPaginationProps {
	current: number;
	total: number;
	pageSelectorToTop?: boolean;
	disablePrevious?: boolean;
	disableNext?: boolean;
	goToPage: (page: number) => void;
}

export default function Pagination(props: IPaginationProps): JSX.Element {
	const selectorRef = useRef<HTMLButtonElement>(null);
	const [selectorVisible, setSelectorVisible] = useState<boolean>(false);

	const handleClickOutsideSelector = useCallback(
		(e: MouseEvent): void => {
			if (selectorRef.current && selectorVisible && !selectorRef.current.contains(e.target as HTMLElement)) {
				setSelectorVisible(false);
			}
		},
		[selectorVisible]
	);

	useEffect(() => {
		window.addEventListener("click", handleClickOutsideSelector);

		return () => {
			window.removeEventListener("click", handleClickOutsideSelector);
		};
	}, [handleClickOutsideSelector]);

	return (
		<div className={styles.pagination}>
			<Button title="Go to previous page" disabled={props.disablePrevious} onClick={() => props.goToPage(props.current - 1)}>
				Previous
			</Button>

			<button
				ref={selectorRef}
				className={[styles.pageSelector, props.pageSelectorToTop ? styles.toTop : ""].join(" ")}
				onClick={() => setSelectorVisible(!selectorVisible)}
			>
				<span>
					{props.current} / {props.total}
				</span>

				{selectorVisible && (
					<ul>
						{[...Array(props.total).keys()].map(page => (
							<li key={`page_${page}`}>
								<button onClick={() => props.goToPage(page++)}>{++page}</button>
							</li>
						))}
					</ul>
				)}
			</button>

			<Button title="Go to next page" disabled={props.disableNext} onClick={() => props.goToPage(props.current + 1)}>
				Next
			</Button>
		</div>
	);
}
