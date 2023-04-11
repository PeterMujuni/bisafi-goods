import * as React from 'react';
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar/Navbar";
import AccordionComponent from "@/components/Accordion/Accordion";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button"
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const inter = Inter({ subsets: ["latin"] });

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function Home() {
	const [open, setOpen] = React.useState(false);
	const [unit, setUnit] = React.useState('Gram');
	const [file, setFile] = React.useState<File | null>(null)
	const [preview, setPreview] = React.useState("")

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleChange = (event: SelectChangeEvent) => {
		setUnit(event.target.value as string);
	};
	const pickedHandler = (e: Event) => {
		let pickedFile
		const target = e.target as HTMLInputElement
		if (target.files && target.files.length === 1) {
			pickedFile = target.files[0]
			setFile(pickedFile)
			console.log(pickedFile)
		}
	}


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
					sx={{ backgroundColor: "white", marginBottom: 2, borderRadius: 0.8 }}
					label='Search...'
					id=''
					fullWidth
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<SearchIcon sx={{ color: "#34A853", fontSize: "2rem" }} />
							</InputAdornment>
						),
					}}
				/>
				<AccordionComponent />
				<Button variant="contained" color="primary" sx={{ color: "white", alignSelf: "flex-end" }} startIcon={<AddIcon />} onClick={handleOpen}>Add Item</Button>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					disableScrollLock
				>
					<Box sx={style}>

						<TextField fullWidth id="item-name" label="Item Name" variant="outlined" sx={{ marginBottom: 2 }} />


						<TextField fullWidth id="quantity" label="Quantity" variant="outlined" sx={{ marginBottom: 2 }} />


						<FormControl fullWidth sx={{ marginBottom: 2 }}>
							<InputLabel id="demo-simple-select-label">Unit of measurement</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={unit}
								label="Unit of measurement"
								onChange={handleChange}
							>
								<MenuItem value={10}>Gram</MenuItem>
								<MenuItem value={20}>Kilogram</MenuItem>
								<MenuItem value={30}>Milliliter</MenuItem>
							</Select>
						</FormControl>
						<IconButton color="primary" aria-label="upload picture" component="label" sx={{ width: "100%" }}>
							<input hidden accept="image/*" type="file" onChange={pickedHandler} />
							<PhotoCamera fontSize='large' />
						</IconButton>
						<Stack direction="row" spacing={3}>
							<Button variant='contained' color='error' fullWidth><CloseIcon /></Button>
							<Button variant='contained' color='success' fullWidth><DoneIcon /></Button>
						</Stack>
					</Box>
				</Modal>
			</main>
		</>
	);
}
