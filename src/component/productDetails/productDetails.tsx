import AntDesign from '@expo/vector-icons/AntDesign'
import { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Modal, PaperProvider, Portal, RadioButton } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '../../utils/redux'
import { pink100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors'
import api from '../../utils/axios'

export function ProductDetails() {
	const dispatch = useDispatch<AppDispatch>()
	const selectedProduct = useAppSelector((state) => state.productReducer.selectedproduct)
	const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({})
	const [quantity, setQuantity] = useState(1)
	const [visible, setVisible] = useState(false)

	const [rating, setRating] = useState(() => {
		const feedbacks = selectedProduct?.feedbacks
		if (feedbacks) {
			const ratings = feedbacks.map((feedback) => Number(feedback.rating))
			const totalRating = ratings.reduce((total, rating) => total + rating, 0)
			return totalRating / ratings.length
		}
	})

	const [numOfRating, setNumOfRating] = useState(() => {
		const feedbacks = selectedProduct?.feedbacks
		if (feedbacks) {
			return feedbacks.length
		}
	})

	const increaseQuantity = () => setQuantity((prev) => prev + 1)
	const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))

	const showModal = () => setVisible(true)
	const hideModal = () => setVisible(false)

	// Hàm xử lý khi chọn một option
	const handleOptionSelect = (itemId: string, value: string) => {
		setSelectedOptions((prev) => ({
			...prev,
			[itemId]: value,
		}))
	}

	// Hàm lấy danh sách các ID đã chọn
	const getSelectedIds = () => {
		return Object.values(selectedOptions)
	}

	//add to cart
	const addToCart = async () => {
		const itemId = selectedProduct?.id
		const response = await api.post('/carts/add-product', {
			itemId,
			quantity,
			listOptionId: getSelectedIds(),
		})
		if (response.data.statusCode === 200) {
			Alert.alert('Inform', 'Add to cart success')
			setQuantity(1)
			setSelectedOptions({})
		} else {
			Alert.alert('Inform', 'Add to cart fail')
		}
	}

	return (
		<PaperProvider>
			<View style={styles.container}>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1, gap: 10 }}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				>
					{/* show img */}
					<View style={{ flexDirection: 'row' }}>
						<Image
							source={{ uri: selectedProduct?.image_url }}
							style={{ width: '100%', height: 300 }}
						/>
					</View>
					{/* name */}
					<Text style={{ fontSize: 20, fontWeight: 700 }}>{selectedProduct?.name}</Text>
					{/* price and rate  */}
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
					>
						<Text style={{ fontSize: 20, fontWeight: 700 }}>${selectedProduct?.price}</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<AntDesign name="star" size={16} color="#FFD700" />
							<Text style={{ fontSize: 16, fontWeight: 700 }}>{rating?.toFixed(2)}</Text>
							<Text style={styles.TextLight}> ({numOfRating} reviews)</Text>
						</View>
					</View>
					{/* separator */}

					{/* options */}
					<Portal>
						<Modal
							visible={visible}
							onDismiss={hideModal}
							contentContainerStyle={styles.containerStyle}
						>
							<ScrollView
								contentContainerStyle={{ gap: 10 }}
								showsVerticalScrollIndicator={false}
								showsHorizontalScrollIndicator={false}
							>
								<View style={styles.options}>
									{selectedProduct?.options.map((item) => (
										<View key={item.id} style={styles.option}>
											<Text style={styles.optionTitle}>{item.name}</Text>
											<RadioButton.Group
												onValueChange={(value) => handleOptionSelect(item.id, value)}
												value={selectedOptions[item.id]}
											>
												{item.listOptions?.map((option) => (
													<View key={option.id} style={styles.optionItem}>
														<RadioButton value={option.id.toString()} />
														<Text style={styles.optionText}>{option.name}</Text>
													</View>
												))}
											</RadioButton.Group>
										</View>
									))}
									<View style={styles.quantityContainer}>
										<Text style={styles.quantityLabel}>Quantity:</Text>
										<View style={styles.quantityControls}>
											<TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
												<Text style={styles.quantityButtonText}>-</Text>
											</TouchableOpacity>
											<Text style={styles.quantityText}>{quantity}</Text>
											<TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
												<Text style={styles.quantityButtonText}>+</Text>
											</TouchableOpacity>
										</View>
									</View>
									<TouchableOpacity
										style={{
											backgroundColor: '#00BDD6',
											flex: 1,
											height: 50,
											justifyContent: 'center',
											alignItems: 'center',
											borderRadius: 5,
										}}
										onPress={() => {
											addToCart()
											hideModal()
										}}
									>
										<Text style={styles.TextBold}>Add to cart</Text>
									</TouchableOpacity>
								</View>
							</ScrollView>
						</Modal>
					</Portal>

					<View style={{ height: 0.5, backgroundColor: '#ccc' }} />
					{/* description */}

					<Text style={styles.TextLight}>{selectedProduct?.description}</Text>
					{/* service group */}
					<View style={styles.services}>
						<View style={styles.service}>
							<AntDesign name="hearto" size={24} color="#00BDD6" />
							<Text style={styles.textService}>Express</Text>
						</View>
						<View style={styles.service}>
							<AntDesign name="hearto" size={24} color="#00BDD6" />
							<Text style={styles.textService}>30 days free return</Text>
						</View>
						<View style={styles.service}>
							<AntDesign name="hearto" size={24} color="#00BDD6" />
							<Text style={styles.textService}>Good review</Text>
						</View>
						<View style={styles.service}>
							<AntDesign name="hearto" size={24} color="#00BDD6" />
							<Text style={styles.textService}>Express</Text>
						</View>
					</View>

					{/* separator */}
					<View style={styles.separator}></View>

					{/* review  */}
					<View>
						<View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
							<Text style={styles.TextBold}>Review</Text>
							<Text style={styles.TextLight}>SeeAll</Text>
						</View>
					</View>
					<View style={{ flex: 1 }}>
						{selectedProduct?.feedbacks?.map((item) => (
							<View
								key={item.id}
								style={{
									flexDirection: 'row',
									gap: 10,
									justifyContent: 'space-between',
									margin: 4,
									padding: 10,
								}}
							>
								<View>
									<Image
										source={{
											uri: item.account.detailInformation?.avatar_url
												? item.account.detailInformation.avatar_url
												: 'https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg',
										}}
										style={{ width: 50, height: 50, borderRadius: 50 }}
									/>
								</View>
								<View style={{ flexDirection: 'column', flex: 1 }}>
									<Text style={styles.TextBold}>
										{item.account.detailInformation?.full_name
											? item.account.detailInformation.full_name
											: 'Người dùng chưa có tên'}
									</Text>

									<Text numberOfLines={5}> {item.comment}</Text>
								</View>
								<View style={styles.separator}></View>
							</View>
						))}

						{/* input review */}
						{/* <View>
						<View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
							<Image
								source={{ uri: 'https://picsum.photos/200' }}
								style={{ width: 50, height: 50, borderRadius: 50 }}
							/>
							<View style={{ flex: 1 }}>
								<TextInput
									placeholder="Your comment...."
									style={{
										borderRadius: 5,
										padding: 5,
									}}
									onChangeText={(text) => setFeedback(text)}
									value={feedback}
								/>
							</View>

							<TouchableOpacity
								style={{
									width: 50,
									height: 50,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5,
								}}
								onPress={() => {
									sendFeedback(feedback)
								}}
							>
								
								<AntDesign name="arrowright" size={24} color="#00BDD6" />
							</TouchableOpacity>
						</View>
					</View> */}
					</View>

					{/* button */}
					<View style={{ flexDirection: 'row', gap: 10 }}>
						<TouchableOpacity
							style={{
								backgroundColor: '#00BDD6',
								width: '15%',
								height: 50,
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 5,
							}}
							onPress={() => {
								showModal()
							}}
						>
							<AntDesign name="shoppingcart" size={30} color="black" />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								backgroundColor: '#00BDD6',
								flex: 1,
								height: 50,
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 5,
							}}
						>
							<Text style={styles.TextBold}>Mua ngay</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</PaperProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: 'white',
		padding: 10,
		gap: 20,
	},
	search: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderRadius: 5,
	},
	SearchBar: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 10,
		borderRadius: 5,
	},
	TextBold: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	TextLight: {
		fontWeight: '300',
		fontSize: 14,
	},
	category: {
		backgroundColor: 'red',
		width: 100,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 2,
		borderRadius: 10,
	},
	errorText: {
		color: 'red',
		textAlign: 'center',
	},
	categories: {
		marginBottom: 10,
	},

	products: {
		width: '100%',
		marginVertical: 10,
	},
	product: {
		width: '100%',
		height: 80,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
	},
	services: {
		alignItems: 'center',
		marginTop: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignContent: 'center',
	},
	service: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '45%',
		gap: 10,
		padding: 8,
	},
	textService: {
		color: 'gray',
		fontSize: 12,
		fontWeight: 'light',
	},
	separator: {
		marginVertical: 10,
		borderBottomColor: '#EFEEEE',
		borderBottomWidth: 1,
	},
	options: {},
	option: {},
	optionTitle: {
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 8,
		color: '#333',
	},
	optionItem: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 6,
	},
	optionText: {
		fontSize: 14,
		marginLeft: 8,
		color: '#555',
	},
	containerStyle: {
		backgroundColor: 'white',
		padding: 20,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		alignSelf: 'center',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		maxHeight: '80%',
	},
	quantityContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 20,
	},
	quantityLabel: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
	},
	quantityControls: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	quantityButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F3F4F6',
		borderRadius: 5,
		marginHorizontal: 5,
	},
	quantityButtonText: {
		fontSize: 18,
		fontWeight: '700',
		color: '#333',
	},
	quantityText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
	},
})
