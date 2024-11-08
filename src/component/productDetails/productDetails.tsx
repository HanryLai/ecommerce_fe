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
import { useEffect } from 'react'
import { AppDispatch, RootState } from '../../utils/redux'
import { fetchCategoryList, selectCategory } from '../../utils/redux/reducers/category.redux'
import { CategoryType } from '../../utils/types/type/category.type'
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductType } from '../../utils/types/type/product.type'

const products: ProductType[] = [
	// id: string
	// name: string
	// image: string
	// price: number
	{
		id: '1',
		name: 'Product 1',
		image: 'https://picsum.photos/200/300',
		price: 100,
	},
	{
		id: '2',
		name: 'Product 2',
		image: 'https://picsum.photos/200/300',
		price: 200,
	},
	{
		id: '3',
		name: 'Product 3',
		image: 'https://picsum.photos/200/300',
		price: 300,
	},
	{
		id: '4',
		name: 'Product 4',
		image: 'https://picsum.photos/200/300',
		price: 400,
	},
]

export function ProductDetails() {
	const dispatch = useDispatch<AppDispatch>()
	const categories = useSelector((state: RootState) => state.categoryReducer.value)
	const selectedCategory = useSelector((state: RootState) => state.categoryReducer.selectedCategory)
	const loading = useSelector((state: RootState) => state.categoryReducer.loading)
	const error = useSelector((state: RootState) => state.categoryReducer.error)

	// Lấy danh sách category từ Redux khi component render lần đầu
	useEffect(() => {
		if (!categories.length) {
			dispatch(fetchCategoryList()) // Fetch categories if not loaded
		}
	}, [dispatch, categories.length])

	// Handle khi người dùng chọn category
	const handleCategorySelect = (category: CategoryType) => {
		dispatch(selectCategory(category)) // Dispatch action chọn category
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<Text style={styles.TextBold}>Product Details</Text>
				{/* show img */}
				<View style={{ flexDirection: 'row' }}>
					<Image
						source={{
							uri: 'https://khothietke.net/wp-content/uploads/2021/04/PNGKhothietke.net-02351.png',
						}}
						style={{ width: '100%', height: 300 }}
					/>
				</View>
				{/* price and rate  */}
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text style={styles.TextBold}>Product 1</Text>
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
})
