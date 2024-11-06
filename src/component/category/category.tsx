import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { PropsNavigate } from '../../utils/types'
import { RouteProp, useRoute } from '@react-navigation/native'
import { PropsData } from '../../common/types/props.type'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign'

export function Category({ navigation }: PropsNavigate<'category'>) {
	const route = useRoute<RouteProp<PropsData, 'category'>>()
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
})
