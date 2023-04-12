import React, { ChangeEvent } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";

interface PaginationProps {
	count: number;
	pageSize: number;
	to: number;
	from: number;
    pagination: {}
	setPagination: Function;
}

const AppPagination = (props: PaginationProps) => {
    
	const handlePageChange = (
		event: ChangeEvent<unknown>,
		page: number
	) => {
		const from = (page - 1) * props.pageSize;
		const to = (page - 1) * props.pageSize + props.pageSize;

		props.setPagination({ ...props.pagination, from: from, to: to });
	};

	return (
		<Box
			justifyContent={"center"}
			alignItems={"center"}
			display={"flex"}
			sx={{
				backgroundColor: "white",
				marginBottom: "1rem",
				paddingBlock: "0.5rem",
			}}
		>
			<Pagination
				count={Math.ceil(props.count / props.pageSize)}
				size='large'
				renderItem={(item) => (
					<PaginationItem
						slots={{
							previous: ArrowBackIcon,
							next: ArrowForwardIcon,
						}}
						{...item}
					/>
				)}
				sx={{
					"& .MuiButtonBase-root.MuiPaginationItem-root.MuiPaginationItem-previousNext":
						{
							backgroundColor: "#D9D9D9",
							color: "white",
						},
					"& .MuiButtonBase-root.MuiPaginationItem-root.MuiPaginationItem-previousNext.Mui-disabled":
						{
							visibility: "hidden",
						},
					"&.MuiPagination-root": {
						width: "100%",
					},
					"& .MuiPagination-ul": {
						justifyContent: "center",
					},
				}}
				onChange={handlePageChange}
			/>
		</Box>
	);
};

export default AppPagination;
