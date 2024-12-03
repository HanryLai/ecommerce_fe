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
	Alert,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '../../utils/redux'
import { AntDesign } from '@expo/vector-icons'
import api from '../../utils/axios'
import productSlice from '../../utils/redux/reducers/product.redux'
import feedbackSlice from '../../utils/redux/reducers/feekback.redux'
import { PropsTab, NavigationStackParamList, PropsNavigate } from '../../utils/types'
import orderSlice from '../../utils/redux/reducers/order.redux'
import { Order } from '../../utils/types/type/order.type'

export function Feedback({ navigation, route }: PropsNavigate<'feedback'>) {
	const dispatch = useDispatch<AppDispatch>()
	const products = useAppSelector((state) => state.productReducer.value)
	const [ratings, setRatings] = useState<{ [key: string]: number }>({})
	const [comments, setComments] = useState<{ [key: string]: string }>({})

	const selectorder1 = useAppSelector((state) => state.orderReducer.selectedorder)

	const [selectorder, setSelectedorder] = useState<Order>()

	const [tmp, setTmp] = useState<any>()

	useEffect(() => {
		const getorder = async () => {
			const res = await api.get(`/orders/${selectorder1?.id}`)
			setSelectedorder(res.data.data)
		}
		getorder()
	}, [tmp])

	// console.log('selectorder', selectorder?.orderItems.at(0)?.feedback)

	const selectedRating = (productId: string, rating: number) => {
		setRatings((prev) => ({ ...prev, [productId]: rating }))
	}

	const handleCommentChange = (productId: string, text: string) => {
		setComments((prev) => ({ ...prev, [productId]: text }))
	}

	const sendFeedback = async (productId: string, feedback_id: string) => {
		try {
			const feedbackData = {
				// product_id: productId,
				comment: comments[productId] || '',
				rating: ratings[productId] || 0,
				image_url: '',
			}

			await api.put(`/feedbacks/${feedback_id}`, feedbackData)
			const response = await api.get('/feedbacks')
			dispatch(feedbackSlice.actions.storefeedback(response.data))

			// Reset feedback for the product
			setComments((prev) => ({ ...prev, [productId]: '' }))
			setRatings((prev) => ({ ...prev, [productId]: 0 }))

			Alert.alert('Success', 'Feedback sent successfully!')
			setTmp(response.data)
		} catch (error) {
			console.error('Error sending feedback:', error)
		}
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.card}>
				<Text style={styles.heading}>Feedback</Text>

				{selectorder?.orderItems.map((orderItem) => (
					<>
						{!orderItem.feedback.isFeedback ? (
							<View key={orderItem.id} style={styles.card}>
								<View style={styles.item}>
									{/* <Image source={{ uri: product.icon }} style={styles.icon} /> */}
									<Text style={styles.title}>{orderItem.products.name}</Text>
									<View>
										<Text style={styles.description}>Chất lượng sản phẩm:</Text>
										<FlatList
											data={[1, 2, 3, 4, 5]}
											keyExtractor={(item) => item.toString()}
											horizontal
											renderItem={({ item }) => (
												<TouchableOpacity
													onPress={() => selectedRating(orderItem.products.id, item)}
												>
													<AntDesign
														name="star"
														size={24}
														color={
															item <= (ratings[orderItem.products.id] || 0) ? '#ffc107' : '#6c757d'
														}
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
										value={comments[orderItem.products.id] || ''}
										onChangeText={(text) => handleCommentChange(orderItem.products.id, text)}
									/>

									<TouchableOpacity
										style={styles.button}
										onPress={() => sendFeedback(orderItem.products.id, orderItem.feedback_id)}
									>
										<Text style={styles.buttonText}>Gửi đánh giá</Text>
									</TouchableOpacity>

									{/* {orderItem.isFeedback ? (
                                    <TouchableOpacity
                                        style={[styles.button, { backgroundColor: 'gray' }]}
                                        disabled={true}
                                    >
                                        <Text style={styles.buttonText}>Đã đánh giá</Text>
                                    </TouchableOpacity>
                                ) : (
                                    
                                )} */}
								</View>
							</View>
						) : (
							<>
								<View key={orderItem.id} style={styles.card}>
									<View style={styles.item}>
										{/* <Image source={{ uri: product.icon }} style={styles.icon} /> */}
										<Text style={styles.title}>{orderItem.products.name}</Text>
										<View>
											<Text style={styles.description}>Chất lượng sản phẩm:</Text>
											<FlatList
												data={[1, 2, 3, 4, 5]}
												keyExtractor={(item) => item.toString()}
												horizontal
												renderItem={({ item }) => (
													<TouchableOpacity>
														<AntDesign
															name="star"
															size={24}
															color={
																item <= parseInt(orderItem.feedback.rating) ? '#ffc107' : '#6c757d'
															}
															style={styles.star}
														/>
													</TouchableOpacity>
												)}
											/>
										</View>

										<TouchableOpacity
											style={{
												backgroundColor: '#CACFD2',
												padding: 10,
												borderRadius: 8,
												alignItems: 'center',
												marginTop: 8,
											}}
										>
											<Text style={styles.buttonText}>Đã đánh giá</Text>
										</TouchableOpacity>
									</View>
								</View>
							</>
						)}
					</>
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
