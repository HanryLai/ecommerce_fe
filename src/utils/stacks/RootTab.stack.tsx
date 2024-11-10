import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../types";
import { Favorite, Home, Inbox, Search } from "../../component/tabs";
import { Account } from "../../component/tabs/account.tab";
import {
    AccountIconSVG,
    FavoriteSVG,
    HomeIconSVG,
    InboxSVG,
    PersonalSVG,
    SearchSVG,
} from "../../common/svg";
import { Color } from "../../style";

const Tab = createBottomTabNavigator<TabStackParamList>();

export const RootTab = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => <HomeIconSVG width={32} height={32} />,
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: () => <SearchSVG width={42} height={42} />,
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={Favorite}
                options={{
                    tabBarIcon: () => <FavoriteSVG size={32} color={Color.primary} />,
                }}
            />
            <Tab.Screen
                name="Inbox"
                component={Inbox}
                options={{
                    tabBarIcon: () => <InboxSVG width={32} height={32} color={Color.primary} />,
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarIcon: () => <AccountIconSVG width={32} height={32} />,
                }}
            />
        </Tab.Navigator>
    );
};
