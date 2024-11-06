import { RouteProp, useRoute } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { Props, PropsData } from '../../common/types/props.type'
import { PropsNavigate } from '../../utils/types'

export const HomePage = ({ navigation }: Props) => {
	const route = useRoute<RouteProp<PropsData, 'homepage'>>()
	const { id, username } = route.params

	return (
		<View>
			<Text>
				Welcome{'  '}
				<Text style={{ fontSize: 20, color: '#2241b9', marginHorizontal: 20 }}>{username}</Text>
				{'  '}
				to homepage
			</Text>
		</View>
	)
}
