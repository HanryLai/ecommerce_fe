import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login, Register } from '../../component/auth'
import { NavigationStackParamList } from '../types/Navigation.type'
import { RootTab } from './RootTab.stack'
import { Category } from '../../component/category'

const Stack = createNativeStackNavigator<NavigationStackParamList>()
export const RootNavigation = () => {
	return (
		<Stack.Navigator initialRouteName="category">
			<Stack.Screen name="login" component={Login} options={{ title: 'Login' }}></Stack.Screen>
			<Stack.Screen
				name="register"
				component={Register}
				options={{ title: 'Register' }}
			></Stack.Screen>
			<Stack.Screen
				name="homepage"
				component={RootTab}
				options={{ title: 'Homepage' }}
			></Stack.Screen>
			<Stack.Screen
				name="category"
				component={Category}
				options={{ title: 'Category' }}
			></Stack.Screen>
		</Stack.Navigator>
	)
}
