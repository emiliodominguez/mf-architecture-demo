import { useEffect } from "react";
import { Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";
import routes from "../../config/routes";
import Characters from "../Characters";
import styles from "./App.module.scss";

export default function App(): JSX.Element {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname.at(-1) === "*") {
			navigate(routes.characters.url);
		}
	}, [location, navigate]);

	return (
		<>
			<ul className={styles.menu}>
				{Object.values(routes).map(route => (
					<li key={route.url}>
						<NavLink to={route.url}>{route.label}</NavLink>
					</li>
				))}
			</ul>

			<Routes>
				<Route path="*" element={<Characters />} />

				{Object.values(routes).map(route => (
					<Route key={route.label} path={route.url} element={route.component} />
				))}
			</Routes>
		</>
	);
}
