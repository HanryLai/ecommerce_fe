import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationStackParamList, PropsNavigate } from '../types/Navigation.type'
import { Login, Register } from '../../component/auth'
import { HomePage } from '../../component/home'
import { RootTab } from './RootTab.stack'

const Stack = createNativeStackNavigator<NavigationStackParamList>()
export const RootNavigation = ({ navigation }: PropsNavigate) => {
	return (
		<Stack.Navigator initialRouteName="homepage" screenOptions={{ headerShown: false }}>
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
		</Stack.Navigator>
	)
}
