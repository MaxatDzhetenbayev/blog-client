import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import axios from '../axios'


import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {

	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(true)

	const { id } = useParams()

	useEffect(() => {
		axios.get(`/posts/${id}`).then(res => {
			setIsLoading(true)
			setData(res.data)
			setIsLoading(false)
		})

	}, [])


	if (isLoading) {
		return <Post isFullPost isLoading={isLoading} />
	}

	return (
		<>
			<Post
				id={data._id}
				title={data._title}
				imageUrl={data.image && "http://localhost:4000" + data.image}
				user={data.user}
				createdAt={data.createdAt}
				viewsCount={data.viewsCount}
				commentsCount={data.comments.length}
				tags={data.tags}
				isFullPost
			>
				<ReactMarkdown children={data.text} />,
			</Post>
			<CommentsBlock
				items={data.comments && data.comments}
				isLoading={false}
			>
				<Index />
			</CommentsBlock>
		</>
	);
};
