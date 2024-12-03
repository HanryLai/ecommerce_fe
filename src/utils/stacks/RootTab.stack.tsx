import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AccountIconSVG, FavoriteSVG, HomeIconSVG, InboxSVG } from "../../common/svg";
import { Favorite, Home, Inbox } from "../../component/tabs";
import { Account } from "../../component/tabs/account.tab";
import { Color } from "../../style";
import { TabStackParamList } from "../types";

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
