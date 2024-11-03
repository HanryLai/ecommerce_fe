import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../types";
import { Tab_1, Tab_2 } from "../../component/tabs";

const Tab = createBottomTabNavigator<TabStackParamList>();

export const RootTab = () => {
    return (
        <Tab.Navigator initialRouteName="Tab_1">
            <Tab.Screen name="Tab_1" component={Tab_1} />
            <Tab.Screen name="Tab_2" component={Tab_2} />
        </Tab.Navigator>
    );
};
