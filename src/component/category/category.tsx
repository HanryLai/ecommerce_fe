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
import { useEffect } from 'react'
import { AppDispatch, RootState, useAppSelector } from '../../utils/redux'
import { CategoryType } from '../../utils/types/type/category.type'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import axios from 'axios'
import api from '../../utils/axios'
import productSlice from '../../utils/redux/reducers/product.redux'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NavigationStackParamList } from '../../utils/types'

export function Category() {
	const navigationHook = useNavigation<NavigationProp<NavigationStackParamList>>()
	const dispatch = useDispatch<AppDispatch>()
	const selectedCategory = useAppSelector((state) => state.categoryReducer.selectedCategory)
	const products = useAppSelector((state) => state.productReducer.value)

	useEffect(() => {
		const categories = api
			.get('/products')
			.then((response) => response.data)
			.then((data) => {
				dispatch(productSlice.actions.storeproduct(data))
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	// Lấy danh sách products, trạng thái loading và error từ store

	return (
		<SafeAreaView style={styles.container}>
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

				{/* products */}
				<View style={styles.products}>
					<FlatList
						data={products}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={styles.product}
								onPress={() => {
									navigationHook.navigate('productDetails', { id: item.id })
									dispatch(productSlice.actions.selectproduct(item))
								}}
							>
								<View style={{ flexDirection: 'row' }}>
									<Image
										source={{ uri: item.images_url }}
										style={{ width: 60, height: 60, borderRadius: 10 }}
									/>
									<View>
										<View>
											<Text style={styles.TextBold}>{item.name}</Text>
											<View style={{ flexDirection: 'row' }}>
												<AntDesign name="star" size={12} color="yellow" />
												<AntDesign name="star" size={12} color="yellow" />
												<AntDesign name="star" size={12} color="yellow" />
												<AntDesign name="star" size={12} color="yellow" />
												<AntDesign name="star" size={12} color="yellow" />
											</View>
										</View>
									</View>
								</View>
								<View>
									<AntDesign name="plus" size={24} color="black" />
									<Text style={styles.TextBold}>${item.price}</Text>
								</View>
							</TouchableOpacity>
						)} // Truyền handleCategorySelect vào đây
						keyExtractor={(item) => item.id}
						ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
						showsHorizontalScrollIndicator={false}
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

				{/* banner */}
				<View
					style={{
						height: 100,
						width: '100%',
						marginTop: 10,
						borderRadius: 10,
					}}
				>
					<Image
						source={{
							uri: 'https://picsum.photos/200/300',
						}}
						style={{
							width: '100%',
							height: '100%',
							borderRadius: 10,
						}}
					/>
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
})
