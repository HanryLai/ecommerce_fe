import AntDesign from '@expo/vector-icons/AntDesign'
import {
	FlatList,
	Image,
	ListRenderItem,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationStackParamList, PropsTab } from '../../utils/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-virtualized-view'
import { useDispatch, useSelector } from 'react-redux'
import {
	AppDispatch,
	RootState,
	selectedCategory,
	store,
	storeCategories,
	useAppDispatch,
	useAppSelector,
} from '../../utils/redux'
import { useEffect } from 'react'
import { selectCategory } from '../../utils/redux/reducers'
import { CategoryType } from '../../utils/types/type/category.type'
import axios from 'axios'
import api from '../../utils/axios'
import categorySlice from '../../utils/redux/reducers/category.redux'
import productSlice from '../../utils/redux/reducers/product.redux'
import ProductComponent from '../products/productComponent'
// import { navigationHook } from "../../utils/stacks/RootNavigation.stack";

// category
export type Category = {
	id: string
	name: string
	image: string
}

export const Home = ({ navigation, route }: PropsTab<'Home'>) => {
	const navigationHook = useNavigation<NavigationProp<NavigationStackParamList>>()
	const dispatch = useAppDispatch<AppDispatch>()
	const selectCategory = useAppSelector(selectedCategory)
	const storeCategoriescont = useAppSelector(storeCategories)

	const products = useAppSelector((state) => state.productReducer.value)

	useEffect(() => {
		api
			.get('/products')
			.then((response) => response.data.data)
			.then((data) => {
				console.log(data)

				dispatch(productSlice.actions.storeproduct(data))
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	useEffect(() => {
		const categories = api
			.get('/category')
			.then((response) => response.data.data)
			.then((data) => {
				dispatch(categorySlice.actions.storeCategory(data))
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])
	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, gap: 20 }}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				nestedScrollEnabled={true}
			>
				{/* search bar */}
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

				{/* category */}
				<View>
					<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Categories:</Text>
				</View>
				<View style={styles.categories}>
					<FlatList
						data={storeCategoriescont}
						renderItem={({ item }) => {
							return (
								<TouchableOpacity
									style={styles.category}
									onPress={() => {
										navigationHook.navigate('category', { id: item.id })
										dispatch(categorySlice.actions.selectCategory(item))
									}}
								>
									<View style={styles.circle}>
										<Image
											source={{ uri: item.image }}
											style={{ width: 85, height: 85, borderRadius: 50 }}
										/>
									</View>
									<Text style={{ textAlign: 'center' }}>{item.title}</Text>
								</TouchableOpacity>
							)
						}}
						keyExtractor={(item) => item.id}
						horizontal={true}
					/>
				</View>

				{/* advertisement */}
				<View style={styles.advertisement}>
					<View style={styles.advertisementTop}>
						<View style={{ gap: 5, justifyContent: 'center' }}>
							<Text style={{ color: '#00BDD6', fontSize: 24, fontWeight: 'bold' }}>Shoe</Text>
							<Text style={{ color: '#929292', fontSize: 16 }}>50% off</Text>
							<TouchableOpacity style={{ backgroundColor: 'black' }}>
								<Text
									style={{
										color: 'white',
										fontSize: 12,
										fontWeight: 'bold',
										paddingHorizontal: 10,
										paddingVertical: 5,
									}}
								>
									Buy now
								</Text>
							</TouchableOpacity>
						</View>
						<Image source={require('../../../assets/Snicker.png')} />
					</View>
					<View style={styles.advertisementBot}>
						<Image source={require('../../../assets/bag.png')} style={{ width: '48%' }} />
						<Image source={require('../../../assets/laptop.png')} style={{ width: '48%' }} />
					</View>
				</View>

				{/* recommendation */}
				<View>
					<View>
						<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Recommended for you</Text>
					</View>
					<FlatList
						data={products}
						renderItem={({ item }) => <ProductComponent item={item} />}
						keyExtractor={(item) => item.id}
						horizontal={true}
					/>
				</View>
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
		paddingHorizontal: 10,
		paddingVertical: 0,
	},
	search: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderRadius: 5,
		marginVertical: 20,
	},
	SearchBar: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 10,
		borderRadius: 5,
	},
	categories: {
		flexDirection: 'row',
	},
	category: {
		width: 85,
		margin: 4,
	},
	circle: {
		backgroundColor: '#8353E2',
		width: 85,
		height: 85,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	advertisement: {
		borderRadius: 10,
		width: '100%',
	},
	advertisementTop: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		backgroundColor: '#F5F2FD',
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		paddingVertical: 15,
		paddingHorizontal: 10,
	},
	advertisementBot: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
		paddingVertical: 15,
		gap: 10,
	},
	recommendedProduct: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
		paddingHorizontal: 10,
		gap: 2,
	},
})
