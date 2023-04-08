import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar/Navbar";
import AccordionComponent from "@/components/Accordion/Accordion";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<Head>
				<title>Bisafi App</title>
				<meta
					name='description'
					content='Test app for bisafi company'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link
					rel='icon'
					href='/favicon.ico'
				/>
			</Head>
			<header>
				<Navbar />
			</header>
			<main className={styles.main}>
				<TextField
					sx={{ backgroundColor: "white", marginBottom: 2, borderRadius: 0.8}}
					label='Search...'
					id=''
					fullWidth
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
        <Box></Box>
				<AccordionComponent />
			</main>
		</>
	);
}
