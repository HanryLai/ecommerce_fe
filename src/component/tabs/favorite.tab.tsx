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
	Alert,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { accountHook, AppDispatch, RootState, useAppSelector } from '../../utils/redux'
import { CategoryType } from '../../utils/types/type/category.type'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import axios from 'axios'
import api from '../../utils/axios'
import productSlice from '../../utils/redux/reducers/product.redux'
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native'
import { NavigationStackParamList, PropsTab } from '../../utils/types'
import { ProductType } from '../../utils/types/type/product.type'
import { IAccountEntity } from '../../interfaces'
import ProductComponent from '../products/productComponent'

export const Favorite = ({ navigation, route }: PropsTab<'Favorite'>) => {
	const navigationHook = useNavigation<NavigationProp<NavigationStackParamList>>()
	const dispatch = useDispatch<AppDispatch>()
	const selectedCategory = useAppSelector((state) => state.categoryReducer.selectedCategory)
	const accountSelector = useAppSelector(accountHook) as IAccountEntity
	const [products, setProducts] = useState<ProductType[]>([])
	const focus = useIsFocused()

	// kiểm tra xem người dùng đã đăng nhập chưa
	useEffect(() => {
		setProducts([])
		console.log('acc' + accountSelector)

		if (Object.keys(accountSelector).length === 0) {
			console.log('Bạn chua đăng nhập')

			Alert.alert(
				'Inform',
				'Please Sign In to check your profile, and you can Sign Up if not have account',
				[
					{
						text: 'Home Page',
						onPress: () => navigation.navigate('Home'),
						style: 'cancel',
					},
					{ text: 'Sign in', onPress: () => navigationHook.navigate('login') },
					{ text: 'Sign up', onPress: () => navigationHook.navigate('register') },
				]
			)
		} else {
			api
				.get('/favorites/my-favorites')
				.then((response) => response.data.data)
				.then((data) => {
					const products: ProductType[] = data.map((item: any) => {
						return {
							id: item.product.id,
							title: item.product.title,
							description: item.product.description,
							image_url: item.product.image_url,
							price: item.product.price,
							name: item.product.name,
						}
					})
					setProducts(products)
				})
				.catch((error) => {
					console.error(error)
				})
		}
	}, [focus])

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
						keyExtractor={(item, index) => index.toString()}
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
