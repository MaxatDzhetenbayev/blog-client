import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
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
			console.log(res.data)
			setData(res.data)
			setIsLoading(false)
			console.log(res.data.user)
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
				imageUrl={"http://localhost:4000" + data.image}
				user={data.user}
				createdAt={data.createdAt}
				viewsCount={data.viesCount}
				commentsCount={3}
				tags={data.tags}
				isFullPost
			>
				<p>
					{data.text}
				</p>
			</Post>
			<CommentsBlock
				items={[
					{
						user: {
							fullName: "Вася Пупкин",
							avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
						},
						text: "Это тестовый комментарий 555555",
					},
					{
						user: {
							fullName: "Иван Иванов",
							avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
						},
						text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
					},
				]}
				isLoading={false}
			>
				<Index />
			</CommentsBlock>
		</>
	);
};
