import styles from "./Table.module.scss";

interface ITableProps {
	columns: string[];
	rows: (string | number | JSX.Element)[][];
}

export default function Table(props: ITableProps): JSX.Element {
	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<thead>
					<tr>
						{props.columns.map(element => (
							<th key={element}>{element}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{props.rows.map((row, i) => (
						<tr key={`row_${i}`}>
							{row.map((element, i) => (
								<td key={`element_${i}`}>{element || "-"}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
