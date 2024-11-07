import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../types";
import { Favorite, Home, Inbox, Search } from "../../component/tabs";
import { Account } from "../../component/tabs/account.tab";

const Tab = createBottomTabNavigator<TabStackParamList>();

export const RootTab = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Favorite" component={Favorite} />
            <Tab.Screen name="Inbox" component={Inbox} />
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
    );
};
