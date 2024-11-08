import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../types";
import { Favorite, Home, Inbox, Search } from "../../component/tabs";
import { Account } from "../../component/tabs/account.tab";
import { SearchSVG } from "../../common/svg";

const Tab = createBottomTabNavigator<TabStackParamList>();

export const RootTab = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={
                    {
                        // tabBarIcon: () => <HomeIconSVGT width={42} height={42} />,
                    }
                }
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: () => <SearchSVG width={42} height={42} color="#fff" />,
                }}
            />
            <Tab.Screen name="Favorite" component={Favorite} />
            <Tab.Screen name="Inbox" component={Inbox} />
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
    );
};
