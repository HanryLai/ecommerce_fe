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
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 16,
                },
                tabBarStyle: {
                    paddingVertical: 4,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => <HomeIconSVG width={28} height={28} />,
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: () => <SearchSVG width={28} height={28} color={"red"} />,
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={Favorite}
                options={{
                    tabBarIcon: () => <FavoriteSVG size={28} color={Color.primary} />,
                }}
            />
            <Tab.Screen
                name="Inbox"
                component={Inbox}
                options={{
                    tabBarIcon: () => <InboxSVG width={28} height={28} color={Color.primary} />,
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarIcon: () => <AccountIconSVG width={28} height={28} color="red" />,
                }}
            />
        </Tab.Navigator>
    );
};
