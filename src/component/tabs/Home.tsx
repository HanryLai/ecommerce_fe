import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { TabStackParamList } from '../../utils/types'
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar } from 'react-native-screens'
import { ListRenderItem } from 'react-native'
import { Category } from '../category'

type Item = {
	id: string
	name: string
	image: string
}

const categories: Item[] = [
	{ id: '1', name: 'Phone', image: 'phone' },
	{ id: '2', name: 'Laptop', image: 'laptop' },
	{ id: '3', name: 'Tablet', image: 'tablet' },
	{ id: '4', name: 'Watch', image: 'watch' },
	{ id: '5', name: 'Headphone', image: 'headphone' },
	{ id: '6', name: 'Camera', image: 'camera' },
	{ id: '7', name: 'Speaker', image: 'speaker' },
	{ id: '8', name: 'TV', image: 'tv' },
]

const renderCategory: ListRenderItem<Item> = ({ item }) => (
	<TouchableOpacity style={styles.category}>
		<View style={styles.circle}>
			<Image source={require('../../../assets/categoryPhone.png')} />
		</View>
		<Text style={{ textAlign: 'center' }}>{item.name}</Text>
	</TouchableOpacity>
)

type Props = NativeStackScreenProps<TabStackParamList, 'Home'>

export const Home = ({ navigation, route }: Props) => {
	return (
		<SafeAreaView style={styles.container}>
			{/* search bar */}
			<View style={styles.SearchBar}>
				<View style={[styles.search, { backgroundColor: '#F3F4F6', width: '90%' }]}>
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
			<View style={styles.categories}>
				<FlatList
					data={categories}
					renderItem={renderCategory}
					keyExtractor={(item) => item.id}
					horizontal={true}
				/>
			</View>

			{/* advertisement */}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: 'pink',
		padding: 20,
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
	categories: {
		flexDirection: 'row',
	},
	category: {
		width: 85,
		margin: 2,
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
})
