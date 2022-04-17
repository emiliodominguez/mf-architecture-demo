import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: IButtonProps): JSX.Element {
	return (
		<button {...props} className={[props.className, styles.button].join(" ")}>
			{props.children}
		</button>
	);
}
