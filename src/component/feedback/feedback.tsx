import React, { useEffect, useState } from 'react'
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TextInput,
	TouchableOpacity,
	FlatList,
	Image,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '../../utils/redux'
import { AntDesign } from '@expo/vector-icons'
import api from '../../utils/axios'
import productSlice from '../../utils/redux/reducers/product.redux'
import feedbackSlice from '../../utils/redux/reducers/feekback.redux'
import { PropsTab } from '../../utils/types'

export function Feedback({ navigation, route }: PropsTab<'Feedback'>) {
	const dispatch = useDispatch<AppDispatch>()
	const products = useAppSelector((state) => state.productReducer.value)
	const [ratings, setRatings] = useState<{ [key: string]: number }>({})
	const [comments, setComments] = useState<{ [key: string]: string }>({})

	const selectedRating = (productId: string, rating: number) => {
		setRatings((prev) => ({ ...prev, [productId]: rating }))
	}

	const handleCommentChange = (productId: string, text: string) => {
		setComments((prev) => ({ ...prev, [productId]: text }))
	}

	const sendFeedback = (productId: string) => {
		const feedbackData = {
			product_id: productId,
			comment: comments[productId] || '',
			rating: ratings[productId] || 0,
			account: 'user',
			image_url: 'https://picsum.photos/200',
		}

		api
			.post('/feedbacks', feedbackData)
			.then(() => {
				api.get('/feedbacks').then((response) => {
					dispatch(feedbackSlice.actions.storefeedback(response.data))
				})
			})
			.catch((error) => {
				console.error('Error sending feedback:', error)
			})

		// Reset feedback for the product
		setComments((prev) => ({ ...prev, [productId]: '' }))
		setRatings((prev) => ({ ...prev, [productId]: 0 }))
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.card}>
				<Text style={styles.heading}>Feedback</Text>

				{products.map((product) => (
					<View key={product.id} style={styles.card}>
						<View style={styles.item}>
							{/* <Image source={{ uri: product.icon }} style={styles.icon} /> */}
							<Text style={styles.title}>{product.name}</Text>
							<View>
								<Text style={styles.description}>Chất lượng sản phẩm:</Text>
								<FlatList
									data={[1, 2, 3, 4, 5]}
									keyExtractor={(item) => item.toString()}
									horizontal
									renderItem={({ item }) => (
										<TouchableOpacity onPress={() => selectedRating(product.id, item)}>
											<AntDesign
												name="star"
												size={24}
												color={item <= (ratings[product.id] || 0) ? '#ffc107' : '#6c757d'}
												style={styles.star}
											/>
										</TouchableOpacity>
									)}
								/>
							</View>
							<Text style={styles.title}>Nhận xét của bạn</Text>
							<TextInput
								style={styles.textarea}
								placeholder="Hãy chia sẻ nhận xét cho sản phẩm này của bạn nhé!"
								multiline
								numberOfLines={5}
								value={comments[product.id] || ''}
								onChangeText={(text) => handleCommentChange(product.id, text)}
							/>
							<TouchableOpacity style={styles.button} onPress={() => sendFeedback(product.id)}>
								<Text style={styles.buttonText}>Gửi đánh giá</Text>
							</TouchableOpacity>
						</View>
					</View>
				))}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 16,
		backgroundColor: '#f9f9f9',
	},
	card: {
		backgroundColor: '#fff',
		padding: 16,
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
		marginBottom: 16,
	},
	heading: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 16,
	},
	item: {
		marginBottom: 16,
	},
	icon: {
		width: 64,
		height: 64,
		marginBottom: 8,
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 8,
	},
	description: {
		fontSize: 14,
		color: '#6c757d',
		marginBottom: 8,
	},
	textarea: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 8,
		textAlignVertical: 'top',
		marginBottom: 8,
	},
	star: {
		marginHorizontal: 4,
	},
	button: {
		backgroundColor: '#007bff',
		padding: 10,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
	},
})
