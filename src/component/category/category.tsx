import { Text, View } from 'react-native'
import { PropsNavigate } from '../../utils/types'
import { RouteProp, useRoute } from '@react-navigation/native'
import { PropsData } from '../../common/types/props.type'

export function Category({ navigation }: PropsNavigate) {
	const route = useRoute<RouteProp<PropsData, 'category'>>()
	return (
		<View>
			<Text>HHeheeheh</Text>
		</View>
	)
}
