import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../types";
import { Home, Tab_2 } from "../../component/tabs";

const Tab = createBottomTabNavigator<TabStackParamList>();

export const RootTab = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Tab_2" component={Tab_2} />
        </Tab.Navigator>
    );
};
