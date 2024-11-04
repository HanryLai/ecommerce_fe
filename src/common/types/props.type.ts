import { NavigationProp, RouteProp } from '@react-navigation/native'

export type Props = {
	navigation: NavigationProp<any>
}

export type RootStackParamList = {
	homepage: { id: string; username: string }
}

export type PropsData = {
	homepage: {
		id: string
		username: string
	}
	category: {
		id: string
	}
}
