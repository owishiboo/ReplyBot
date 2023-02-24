import styles from "../styles/main.module.css";
import { useState ,useEffect} from "react";
import { useRouter } from "next/router";
import Logo from "./Logo";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
  let user="";
  const router = useRouter();
  if (typeof window !== 'undefined') {
    user = localStorage.getItem("token");
  }

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<Logo/>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>	
			</nav>
		</div>
	);
};

export default Main;