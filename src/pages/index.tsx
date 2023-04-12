import * as React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar/Navbar";
import AccordionComponent from "@/components/Accordion/Accordion";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Item } from "./items.model";
import axios from "axios";
import { Container } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function Home() {
	const [open, setOpen] = React.useState(false);
	const [selectedImage, setSelectedImage] = React.useState("");
	const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
	const [itemName, setItemName] = React.useState("");
	const [itemPrice, setItemPrice] = React.useState("");
	const [quantity, setQuantity] = React.useState("");
	const [unit, setUnit] = React.useState("");
	const [items, setItems] = React.useState<Item[]>([]);
	const [search, setSearch] = React.useState("")

	React.useEffect(() => {
		const items = JSON.parse(localStorage.getItem("items") || "[]");
		if (items.length != 0) {
			setItems(items);
		}
	}, []);
	
	React.useEffect(() => {
		localStorage.setItem("items", JSON.stringify(items));
	}, [items]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		clearSubmitFieldsHandler();
	};
	const handleChange = (event: SelectChangeEvent) => {
		setUnit(event.target.value as string);
	};

	const submitHandler = async () => {

		const item = {
			itemName,
			quantity,
			unit,
			itemPrice,
			image: selectedImage,
		};

		setItems((prev) => {
			return [
				...prev,
				item
			]
		})

		clearSubmitFieldsHandler();
		handleClose();
	};

	const clearSubmitFieldsHandler = () => {
		setItemName("");
		setItemPrice("")
		setQuantity("");
		setUnit("");
		setSelectedImage("");
		setSelectedFile(null);
		setOpen(false);
	};

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
				<Container sx={{ display: "flex", flexDirection: "column" }}>
					<TextField
						label='Search...'
						id=''
						fullWidth
						sx={{
							backgroundColor: "white",
							marginBottom: 2,
							borderRadius: 0.8,
						}}
						onChange={(e) => setSearch(e.target.value)}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<SearchIcon
										sx={{
											color: "#34A853",
											fontSize: "2rem",
										}}
									/>
								</InputAdornment>
							),
						}}
					/>
					<AccordionComponent items={items} search={search} />
					<Button
						variant='contained'
						color='primary'
						sx={{
							color: "white",
							alignSelf: "flex-end",
							marginTop: "2rem",
						}}
						startIcon={<AddIcon />}
						onClick={handleOpen}
					>
						Add Item
					</Button>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby='modal-modal-title'
						aria-describedby='modal-modal-description'
						disableScrollLock
					>
						<Box sx={style}>
							<TextField
								fullWidth
								id='item-name'
								label='Item Name'
								variant='outlined'
								sx={{ marginBottom: 2 }}
								value={itemName}
								onInput={(e) => {
									const input = e.target as HTMLInputElement;
									setItemName(input.value);
								}}
								helperText='Entry must be filled.'
								required
							/>
							<TextField
								fullWidth
								id='item-price'
								label='Price'
								variant='outlined'
								sx={{ marginBottom: 2 }}
								value={itemPrice}
								onInput={(e) => {
									const input = e.target as HTMLInputElement;
									setItemPrice(input.value);
								}}
								helperText='Entry must be filled.'
								required
							/>

							<TextField
								fullWidth
								id='quantity'
								label='Quantity'
								variant='outlined'
								sx={{ marginBottom: 2 }}
								value={quantity}
								onInput={(e) => {
									const input = e.target as HTMLInputElement;
									setQuantity(input.value);
								}}
								helperText='Entry must be filled.'
								required
							/>

							<FormControl
								fullWidth
								sx={{ marginBottom: 2 }}
								required
							>
								<InputLabel id='demo-simple-select-label'>
									Unit of measurement
								</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={unit}
									label='Unit of measurement'
									onChange={handleChange}
									required
								>
									<MenuItem value={"Gram"}>Gram</MenuItem>
									<MenuItem value={"Kilogram"}>
										Kilogram
									</MenuItem>
									<MenuItem value={"Milliliter"}>
										Milliliter
									</MenuItem>
								</Select>
							</FormControl>

							<IconButton
								color='primary'
								aria-label='upload picture'
								component='label'
								sx={{ width: "100%" }}
							>
								<input
									hidden
									accept='image/*'
									type='file'
									onChange={({ target }) => {
										if (target.files) {
											const file = target.files[0];
											const fr = new FileReader();
											fr.readAsDataURL(file);

											fr.addEventListener("load", () => {
												const url = fr.result as string;
												console.log(url);
												setSelectedImage(url);
											});

											setSelectedFile(file);
										}
									}}
									required
								/>
								<PhotoCamera fontSize='large' />
							</IconButton>
							{selectedImage && (
								<Avatar
									alt='Remy Sharp'
									src={`${selectedImage}`}
									sx={{
										width: 56,
										height: 56,
										margin: "1rem auto",
									}}
									variant='square'
								/>
							)}
							<Stack
								direction='row'
								spacing={3}
							>
								<Button
									variant='contained'
									color='error'
									sx={{ color: "white" }}
									fullWidth
									onClick={clearSubmitFieldsHandler}
								>
									<CloseIcon />
								</Button>
								<Button
									variant='contained'
									color='success'
									fullWidth
									onClick={submitHandler}
								>
									<DoneIcon />
								</Button>
							</Stack>
						</Box>
					</Modal>
				</Container>
			</main>
		</>
	);
}
