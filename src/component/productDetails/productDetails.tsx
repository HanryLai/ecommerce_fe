import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TextInput,
	TouchableOpacity,
	FlatList,
	ListRenderItem,
	ActivityIndicator,
	Image,
	Alert,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { AppDispatch, RootState, selectProduct, useAppSelector } from '../../utils/redux'
import { selectCategory } from '../../utils/redux/reducers/category.redux'
import { CategoryType } from '../../utils/types/type/category.type'
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductType } from '../../utils/types/type/product.type'
import api from '../../utils/axios'
import productSlice from '../../utils/redux/reducers/product.redux'
import feedbackSlice from '../../utils/redux/reducers/feekback.redux'
import { Modal, PaperProvider, Portal, RadioButton } from 'react-native-paper'

export function ProductDetails() {
	const dispatch = useDispatch<AppDispatch>()
	const selectedProduct = useAppSelector((state) => state.productReducer.selectedproduct)
	const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({})
	const [quantity, setQuantity] = useState(1)

	const [visible, setVisible] = useState(false)

	const increaseQuantity = () => setQuantity((prev) => prev + 1)
	const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))

	const showModal = () => setVisible(true)
	const hideModal = () => setVisible(false)

	const handleOptionSelect = (optionId: string, listOptionId: string) => {
		setSelectedOptions((prev) => ({ ...prev, [optionId]: listOptionId }))
	}

	// const feedbacks = useAppSelector((state) => state.feedbackReducer.value)
	// const [feedback, setFeedback] = useState('')
	// useEffect(() => {
	// 	const feekbacks = api
	// 		.get('/feedbacks')
	// 		.then((response) => response.data)
	// 		.then((data) => {
	// 			dispatch(feedbackSlice.actions.storefeedback(data))
	// 		})
	// 		.catch((error) => {
	// 			console.error(error)
	// 		})
	// }, [])

	// function sendFeedback(feedback: string) {
	// 	console.log('feedback', feedback)

	// 	const data = {
	// 		comment: feedback,
	// 		account: 'user',
	// 		image_url: 'https://picsum.photos/200',

	// 		product_id: 1,
	// 	}
	// 	api.post('/feedbacks', data)

	// 	api.get('/feedbacks').then((response) => {
	// 		dispatch(feedbackSlice.actions.storefeedback(response.data))
	// 	})

	// 	setFeedback('')
	// }

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
							<Text style={{ fontSize: 16, fontWeight: 700 }}>4.5</Text>
							<Text style={styles.TextLight}> (150 reviews)</Text>
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
										Alert.alert('Add to cak')
										hideModal()
									}}
								>
									<Text style={styles.TextBold}>Add to cart</Text>
								</TouchableOpacity>
							</View>
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
						{/* {feedbacks.map((item) => (
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
									source={{ uri: item.image_url }}
									style={{ width: 50, height: 50, borderRadius: 50 }}
								/>
							</View>
							<View style={{ flexDirection: 'column', flex: 1 }}>
								<Text style={styles.TextBold}>{item.account}</Text>
								<Text numberOfLines={5}> {item.comment}</Text>
							</View>
							<View style={styles.separator}></View>
						</View>
					))} */}

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
