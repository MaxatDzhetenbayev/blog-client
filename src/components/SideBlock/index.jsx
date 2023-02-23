import React from "react";
import { useNavigate, useParams } from 'react-router-dom'

import styles from "./SideBlock.module.scss";
import { Typography, Paper, Button, Box } from "@mui/material";


export const SideBlock = ({ title, children }) => {

	const navigate = useNavigate()
	const { tag } = useParams()


	const clearTagFilter = () => {
		navigate('/')
	}


	return (
		<Paper classes={{ root: styles.root }}>
			<Box className={styles.top}>
				<Typography variant="h6" classes={{ root: styles.title }}>
					{title}
				</Typography>
				{tag && <Button onClick={clearTagFilter}>Очистить</Button>}
			</Box>

			{children}

		</Paper>
	);
};
