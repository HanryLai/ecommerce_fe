import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    FlatList,
    ListRenderItem,
    Button,
} from "react-native";
import { PropsNavigate } from "../../utils/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { PropsData } from "../../common/types/props.type";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CategoryType } from "../../utils/types/type/category.type";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, store, useAppDispatch } from "../../utils/redux";
import { show } from "../../utils/redux/reducers/category.redux";

// category

const categories: CategoryType[] = [
    { id: "1", name: "Phone", image: "phone" },
    { id: "2", name: "Laptop", image: "laptop" },
    { id: "3", name: "Tablet", image: "tablet" },
    { id: "4", name: "Watch", image: "watch" },
    { id: "5", name: "Headphone", image: "headphone" },
    { id: "6", name: "Camera", image: "camera" },
    { id: "7", name: "Speaker", image: "speaker" },
    { id: "8", name: "TV", image: "tv" },
];

const renderCategory: ListRenderItem<CategoryType> = ({ item }) => (
    <TouchableOpacity style={styles.category}>
        <Text>Thêm hình dô</Text>
    </TouchableOpacity>
);

export function Category({ navigation, route }: PropsNavigate<"category">) {
    const value = route.params.id;
    const valueSelector = useSelector((e: RootState) => e.categoryReducer.value);
    const dispatch = useAppDispatch<AppDispatch>();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {/* Search Bar */}
                <View style={styles.SearchBar}>
                    <View style={[styles.search, { backgroundColor: "#F3F4F6", width: "85%" }]}>
                        <AntDesign name="search1" size={20} color="black" />
                        <TextInput placeholder="Search..." placeholderTextColor="gray" />
                    </View>

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#F3F4F6",
                            width: "10%",
                            height: 46,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 5,
                        }}
                    >
                        <AntDesign name="filter" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Category */}
                <View
                    style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        marginVertical: 10,
                    }}
                >
                    <Text style={styles.TextBold}>Categories</Text>
                    <Text style={styles.TextLight}>See all</Text>
                </View>

                <View>
                    <FlatList
                        data={categories}
                        renderItem={renderCategory}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                    />
                </View>
            </ScrollView>
            <Button title="123" onPress={() => store.dispatch(show())} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "white",
        padding: 10,
        gap: 20,
    },
    search: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
    },
    SearchBar: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
        borderRadius: 5,
    },
    TextBold: {
        fontWeight: "bold",
        fontSize: 16,
    },
    TextLight: {
        fontWeight: "300",
        fontSize: 12,
    },
    category: {
        backgroundColor: "red",
        width: 105,
        height: 105,
        justifyContent: "center",
        alignItems: "center",
        margin: 4,
        borderRadius: 10,
    },
});
