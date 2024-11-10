import AntDesign from "@expo/vector-icons/AntDesign";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    ListRenderItem,
    ActivityIndicator,
    Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../utils/redux";
import { fetchCategoryList, selectCategory } from "../../utils/redux/reducers/category.redux";
import { CategoryType } from "../../utils/types/type/category.type";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductType } from "../../utils/types/type/product.type";
import { ScrollView } from "react-native-virtualized-view";

const products: ProductType[] = [
    // id: string
    // name: string
    // image: string
    // price: number
    {
        id: "1",
        name: "Product 1",
        image: "https://picsum.photos/200/300",
        price: 100,
    },
    {
        id: "2",
        name: "Product 2",
        image: "https://picsum.photos/200/300",
        price: 200,
    },
    {
        id: "3",
        name: "Product 3",
        image: "https://picsum.photos/200/300",
        price: 300,
    },
    {
        id: "4",
        name: "Product 4",
        image: "https://picsum.photos/200/300",
        price: 400,
    },
];
// Tạo renderCategory bên ngoài func Category và truyền handleCategorySelect vào đó
const renderCategory = (
    { item }: { item: CategoryType },
    handleCategorySelect: (category: CategoryType) => void
) => (
    <TouchableOpacity
        style={styles.category}
        onPress={() => handleCategorySelect(item)} // Sử dụng handleCategorySelect từ tham số
    >
        <Text>{item.name}</Text>
    </TouchableOpacity>
);

const renderProduct = ({ item }: { item: ProductType }) => (
    // handleCategorySelect: (category: CategoryType) => void
    <TouchableOpacity
        style={styles.product}
        // onPress={() => handleCategorySelect(item)} // Sử dụng handleCategorySelect từ tham số
    >
        <View style={{ flexDirection: "row" }}>
            <Image source={require("../../../assets/categoryPhone.png")} />
            <View>
                <View>
                    <Text style={styles.TextBold}>{item.name}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <AntDesign name="star" size={12} color="yellow" />
                        <AntDesign name="star" size={12} color="yellow" />
                        <AntDesign name="star" size={12} color="yellow" />
                        <AntDesign name="star" size={12} color="yellow" />
                        <AntDesign name="star" size={12} color="yellow" />
                    </View>
                </View>
            </View>
        </View>
        <View>
            <AntDesign name="plus" size={24} color="black" />
            <Text style={styles.TextBold}>${item.price}</Text>
        </View>
    </TouchableOpacity>
);

export function Category() {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categoryReducer.value);
    const selectedCategory = useSelector(
        (state: RootState) => state.categoryReducer.selectedCategory
    );
    const loading = useSelector((state: RootState) => state.categoryReducer.loading);
    const error = useSelector((state: RootState) => state.categoryReducer.error);

    // Lấy danh sách category từ Redux khi component render lần đầu
    useEffect(() => {
        if (!categories.length) {
            dispatch(fetchCategoryList()); // Fetch categories if not loaded
        }
    }, [dispatch, categories.length]);

    // Handle khi người dùng chọn category
    const handleCategorySelect = (category: CategoryType) => {
        dispatch(selectCategory(category)); // Dispatch action chọn category
    };

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

                {/* Category list */}
                <View style={styles.categories}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : error ? (
                        <Text style={styles.errorText}>{error}</Text>
                    ) : (
                        <FlatList
                            data={categories}
                            renderItem={({ item }) =>
                                renderCategory({ item }, handleCategorySelect)
                            } // Truyền handleCategorySelect vào đây
                            keyExtractor={(item) => item.id}
                            horizontal={true}
                            extraData={selectedCategory}
                            contentContainerStyle={{ paddingLeft: 10 }}
                            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                            showsHorizontalScrollIndicator={false}
                        />
                    )}
                </View>

                {/* Other Options */}
                <View style={styles.options}>
                    <TouchableOpacity style={styles.option}>
                        <Text>Best Sale</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <Text>Best Matched</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <Text>Popular</Text>
                    </TouchableOpacity>
                </View>

                {/* products */}
                <View style={styles.products}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : error ? (
                        <Text style={styles.errorText}>{error}</Text>
                    ) : (
                        <FlatList
                            data={products}
                            renderItem={({ item }) => renderProduct({ item })} // Truyền handleCategorySelect vào đây
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                            showsHorizontalScrollIndicator={false}
                        />
                    )}
                </View>

                {/* button see all */}

                <TouchableOpacity
                    style={{ backgroundColor: "#F3F4F6", borderRadius: 5, padding: 8 }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                        }}
                    >
                        See all
                    </Text>
                </TouchableOpacity>

                {/* banner */}
                <View
                    style={{
                        height: 100,
                        width: "100%",
                        marginTop: 10,
                        borderRadius: 10,
                    }}
                >
                    <Image
                        source={{
                            uri: "https://picsum.photos/200/300",
                        }}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 10,
                        }}
                    />
                </View>
            </ScrollView>
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
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 2,
        borderRadius: 10,
    },
    errorText: {
        color: "red",
        textAlign: "center",
    },
    categories: {
        marginBottom: 10,
    },
    options: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    option: {
        backgroundColor: "pink",
        padding: 4,
        borderRadius: 10,
    },
    products: {
        width: "100%",
        marginVertical: 10,
    },
    product: {
        width: "100%",
        height: 80,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
});
