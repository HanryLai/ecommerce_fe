import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TabStackParamList } from './Tab.type'
import { Order } from './type/order.type'

export type NavigationStackParamList = {
	homepage: {
		id?: string
		username?: string
		screen: keyof TabStackParamList
	}
	login: undefined
	register: undefined
	Tab: undefined
	main: undefined
	shoppingCart: {
		id: string
	}
	category: {
		id: string
	}
	detailInformation: undefined
	functionAuth: undefined
	productDetails: {
		id: string
	}
	PaymentComponent: undefined
	MyOrder: undefined
	MyComment: undefined
	feedback: {
		order: Order
	}
	orders: undefined
}

export type PropsNavigate<NavigationName extends keyof NavigationStackParamList> =
	NativeStackScreenProps<NavigationStackParamList, NavigationName>
