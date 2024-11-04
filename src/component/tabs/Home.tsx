import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { TabStackParamList } from '../../utils/types'
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar } from 'react-native-screens'

type Props = NativeStackScreenProps<TabStackParamList, 'Home'>

export const Home = ({ navigation, route }: Props) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.SearchBar}>
				<View style={[styles.search, { backgroundColor: '#F3F4F6', width: '90%' }]}>
					<AntDesign name="search1" size={20} color="black" />
					<TextInput placeholder="Search..." placeholderTextColor="gray" />
				</View>

				<View
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
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'pink',
		padding: 20,
	},
	search: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderRadius: 5,
	},
	SearchBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 10,
		borderRadius: 5,
	},
})
