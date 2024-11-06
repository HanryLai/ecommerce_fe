import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type NavigationStackParamList = {
	homepage: {
		id: string
		username: string
	}
	login: undefined
	register: undefined
	Tab: undefined
	main: undefined
	category: undefined
}

export type PropsNavigate<NavigationName extends keyof NavigationStackParamList> =
	NativeStackScreenProps<NavigationStackParamList, NavigationName>
