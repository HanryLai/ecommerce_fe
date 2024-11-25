import AntDesign from '@expo/vector-icons/AntDesign'
import {
	Text,
	View,
	StyleSheet,
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
import { CategoryType } from '../../utils/types/type/category.type'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import axios from 'axios'
import api from '../../utils/axios'
import productSlice from '../../utils/redux/reducers/product.redux'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NavigationStackParamList } from '../../utils/types'
import ProductComponent from '../products/productComponent'
import { ProductType } from '../../utils/types/type/product.type'

export function Category() {
	const navigationHook = useNavigation<NavigationProp<NavigationStackParamList>>()
	const dispatch = useDispatch<AppDispatch>()
	const selectedCategory = useAppSelector((state) => state.categoryReducer.selectedCategory)
	const [products, setProducts] = useState<ProductType[]>([])
	const feedbacks = useAppSelector((state) => state.feedbackReducer.value)

	useEffect(() => {
		console.log('id category: ', selectedCategory?.id)

		api
			.get(`/categories/${selectedCategory?.id}`)
			.then((response) => response.data.data)
			.then((data) => {
				setProducts(data)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [selectedCategory?.id, dispatch])

	// Lấy danh sách products, trạng thái loading và error từ store

	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				{/* Search Bar */}
				<View style={styles.SearchBar}>
					<View style={[styles.search, { backgroundColor: '#F3F4F6', width: '85%' }]}>
						<AntDesign name="search1" size={20} color="black" />
						<TextInput placeholder="Search..." placeholderTextColor="gray" />
					</View>

					<TouchableOpacity
						style={{
							backgroundColor: '#F3F4F6',
							width: '10%',
							height: 46,
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 5,
						}}
					>
						<AntDesign name="filter" size={24} color="black" />
					</TouchableOpacity>
				</View>

				{/* banner */}
				<View
					style={{
						height: 200,
						width: '100%',
						marginTop: 10,
						borderRadius: 10,
					}}
				>
					<Image
						source={{
							uri: selectedCategory?.image,
						}}
						style={{
							width: '100%',
							height: '100%',
							borderRadius: 10,
						}}
					/>
				</View>

				{/* Category */}
				<View
					style={{
						justifyContent: 'space-between',
						flexDirection: 'row',
						marginVertical: 10,
					}}
				>
					<Text style={styles.TextBold}>Categories</Text>
					<Text style={styles.TextLight}>See all</Text>
				</View>

				<View>
					<FlatList
						data={products}
						renderItem={({ item }) => <ProductComponent item={item} />}
						keyExtractor={(item) => item.id}
						numColumns={2}
					/>
				</View>

				{/* button see all */}

				<TouchableOpacity style={{ backgroundColor: '#F3F4F6', borderRadius: 5, padding: 8 }}>
					<Text
						style={{
							textAlign: 'center',
						}}
					>
						See all
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
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
})
