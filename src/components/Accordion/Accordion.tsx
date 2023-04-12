import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

// type ItemProps = {
// 	image: string;
// 	itemName: string;
// 	quatity: string;
// 	unit: string;
// }[];

interface ItemProps {
	items: {
		image: string;
		itemName: string;
		itemPrice: string;
		quantity: string;
		unit: string;
	}[],
	search : string,
}

const AccordionComponent: React.FC<ItemProps> = (props) => {
	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange =
		(panel: string) =>
		(event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	return (
		<div>
			{props.items.filter((item) => {
				return props.search.toLowerCase() === "" ? item : item.itemName.toLowerCase().includes(props.search)
			}).map((item, index) => (
				<Accordion
					key={index}
					expanded={expanded === `panel${index}`}
					onChange={handleChange(`panel${index}`)}
					sx={{ marginBottom: 2 }}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`panel${index}bh-content`}
						id={`panel${index}bh-header`}
						sx={{
							margin: 0,
							paddingLeft: 0,
							"& .MuiAccordionSummary-content": {
								margin: 0,
							},
							"& .MuiAccordionSummary-content.Mui-expanded": {
								marginTop: 0,
							},
						}}
					>
						<Grid
							container
							alignItems='center'
							justifyContent='space-between'
						>
							<Grid item>
								<Grid
									item
									container
									alignItems='center'
									spacing={1}
								>
									<Grid item>
										<Avatar
											alt='Remy Sharp'
											src={item.image}
											variant='square'
											sx={{ width: 56, height: 56 }}
										/>
									</Grid>
									<Grid item>
										<Typography
											sx={{ color: "text.secondary" }}
										>
											{item.itemName}
										</Typography>
									</Grid>
								</Grid>
							</Grid>

							<Grid
								item
								sx={{ marginRight: "1rem" }}
							>
								<Grid
									item
									container
									direction='column'
								>
									<Grid
										item
										alignSelf='end'
									>
										<Typography
											variant='subtitle1'
											component='div'
										>
											$ {item.itemPrice}
										</Typography>
									</Grid>
									<Grid item>
										<Typography
											variant='subtitle1'
											component='div'
										>
											{item.unit} {item.quantity}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</AccordionSummary>
					<AccordionDetails>
						<Button
							variant='contained'
							color='error'
							size='small'
							sx={{color: "white"}}
						>
							<DeleteIcon />
						</Button>
						<Button
							variant='contained'
							color='primary'
							size='small'
							sx={{ color: "white", marginLeft: "1rem" }}
						>
							<ModeEditIcon />
						</Button>
						<Button
							variant='contained'
							size='small'
							sx={{
								color: "white",
								marginLeft: "1rem",
								borderRadius: "50%",
								backgroundColor: "#D9D9D9",
							}}
						>
							<PriorityHighIcon />
						</Button>
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
};

export default AccordionComponent;
