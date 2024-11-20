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
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { AppDispatch, RootState, useAppSelector } from '../../utils/redux'
import { selectCategory } from '../../utils/redux/reducers/category.redux'
import { CategoryType } from '../../utils/types/type/category.type'
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductType } from '../../utils/types/type/product.type'
import api from '../../utils/axios'
import productSlice from '../../utils/redux/reducers/product.redux'
import feedbackSlice from '../../utils/redux/reducers/feekback.redux'

export function Feedback() {
	const dispatch = useDispatch<AppDispatch>()
	const selectedProduct = useAppSelector((state) => state.productReducer.selectedproduct)
	const feedbacks = useAppSelector((state) => state.feedbackReducer.value)
	const [feedback, setFeedback] = useState('')
	useEffect(() => {
		const feekbacks = api
			.get('/feedbacks')
			.then((response) => response.data)
			.then((data) => {
				dispatch(feedbackSlice.actions.storefeedback(data))
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	function sendFeedback(feedback: string) {
		console.log('feedback', feedback)

		const data = {
			comment: feedback,
			account: 'user',
			image_url: 'https://picsum.photos/200',

			product_id: 1,
		}
		api.post('/feedbacks', data)

		api.get('/feedbacks').then((response) => {
			dispatch(feedbackSlice.actions.storefeedback(response.data))
		})

		setFeedback('')
	}

	return (
		<SafeAreaView style={styles.container}>
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
				<Text style={styles.TextBold}>{selectedProduct?.name}</Text>
				{/* price and rate  */}
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text style={styles.TextBold}>${selectedProduct?.price}</Text>
					<View style={{ flexDirection: 'row' }}>
						<AntDesign name="star" size={16} color="yellow" />
						<Text style={styles.TextBold}>4.5</Text>
					</View>
				</View>
				{/* description */}
				<Text style={styles.TextBold}>Description</Text>
				<Text style={styles.TextLight}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, purus nec ultricies
					ultricies, metus purus ultricies sem, nec aliquam nisi nunc nec nunc. Quisque in nunc vel
					nunc ultricies ultricies. Sed nec arcu ac nunc ultricies ultricies. Sed nec arcu ac nunc
					ultricies ultricies.
				</Text>
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
					{feedbacks.map((item) => (
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
					))}

					{/* input review */}
					<View>
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
								{/* icon send */}
								<AntDesign name="arrowright" size={24} color="#00BDD6" />
							</TouchableOpacity>
						</View>
					</View>
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
		</SafeAreaView>
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
		fontSize: 12,
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
	options: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 10,
	},
	option: {
		backgroundColor: 'pink',
		padding: 4,
		borderRadius: 10,
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
})
