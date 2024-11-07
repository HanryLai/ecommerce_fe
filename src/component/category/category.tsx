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
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '../../utils/redux'
import { fetchCategoryList, selectCategory } from '../../utils/redux/reducers/category.redux'
import { CategoryType } from '../../utils/types/type/category.type'
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'

// Tạo renderCategory bên ngoài func Category và truyền handleCategorySelect vào đó
const renderCategory = (
	{ item }: { item: CategoryType },
	handleCategorySelect: (category: CategoryType) => void
) => (
	<TouchableOpacity
		style={styles.category}
		onPress={() => handleCategorySelect(item)} // Sử dụng handleCategorySelect từ tham số
	>
		<Text>{item.name}</Text>
	</TouchableOpacity>
)

export function Category() {
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
				<View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10 }}>
					<Text style={styles.TextBold}>Categories</Text>
					<Text style={styles.TextLight}>See all</Text>
				</View>

				{/* Category list */}
				{loading ? (
					<ActivityIndicator size="large" color="#0000ff" />
				) : error ? (
					<Text style={styles.errorText}>{error}</Text>
				) : (
					<FlatList
						data={categories}
						renderItem={({ item }) => renderCategory({ item }, handleCategorySelect)} // Truyền handleCategorySelect vào đây
						keyExtractor={(item) => item.id}
						horizontal={true}
						extraData={selectedCategory}
						contentContainerStyle={{ paddingLeft: 10 }}
						ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
						showsHorizontalScrollIndicator={false}
					/>
				)}

				{/* Other Options */}
				<View>
					<TouchableOpacity>
						<Text>Best Sale</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>Best Matched</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>Popular</Text>
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
		width: 105,
		height: 105,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 4,
		borderRadius: 10,
	},
	errorText: {
		color: 'red',
		textAlign: 'center',
	},
})
