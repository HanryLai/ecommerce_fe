import AntDesign from "@expo/vector-icons/AntDesign";
import { NavigationProp, useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useDispatch } from "react-redux";
import { IAccountEntity } from "../../interfaces";
import api from "../../utils/axios";
import { accountHook, AppDispatch, useAppSelector } from "../../utils/redux";
import { NavigationStackParamList, PropsTab } from "../../utils/types";
import { ProductType } from "../../utils/types/type/product.type";
import ProductComponent from "../products/productComponent";

export const Favorite = ({ navigation, route }: PropsTab<"Favorite">) => {
    const navigationHook = useNavigation<NavigationProp<NavigationStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();
    const selectedCategory = useAppSelector((state) => state.categoryReducer.selectedCategory);
    const accountSelector = useAppSelector(accountHook) as IAccountEntity;
    const [products, setProducts] = useState<ProductType[]>([]);
    const focus = useIsFocused();

    // kiểm tra xem người dùng đã đăng nhập chưa
    useEffect(() => {
        setProducts([]);
        console.log("acc" + accountSelector);

        if (Object.keys(accountSelector).length === 0) {
            console.log("Bạn chua đăng nhập");

            Alert.alert(
                "Inform",
                "Please Sign In to check your profile, and you can Sign Up if not have account",
                [
                    {
                        text: "Home Page",
                        onPress: () => navigation.navigate("Home"),
                        style: "cancel",
                    },
                    { text: "Sign in", onPress: () => navigationHook.navigate("login") },
                    { text: "Sign up", onPress: () => navigationHook.navigate("register") },
                ]
            );
        } else {
            getFavorite();
        }
    }, [focus]);

    function getFavorite() {
        api.get("/favorites/my-favorites")
            .then((response) => response.data.data)
            .then((data) => {
                const products: ProductType[] = data.map((item: any) => {
                    return {
                        id: item.product.id,
                        title: item.product.title,
                        description: item.product.description,
                        image_url: item.product.image_url,
                        price: item.product.price,
                        name: item.product.name,
                    };
                });
                setProducts(products.slice(0, 4));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getAllFavorite() {
        api.get("/favorites/my-favorites")
            .then((response) => response.data.data)
            .then((data) => {
                const products: ProductType[] = data.map((item: any) => {
                    return {
                        id: item.product.id,
                        title: item.product.title,
                        description: item.product.description,
                        image_url: item.product.image_url,
                        price: item.product.price,
                        name: item.product.name,
                    };
                });
                setProducts(products);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Lấy danh sách products, trạng thái loading và error từ store

    return (
        <View style={styles.container}>
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
                    <Text style={styles.TextBold}>Favorites: </Text>
                </View>

                <View>
                    <FlatList
                        data={products}
                        style={{
                            margin: "auto",
                        }}
                        renderItem={({ item }) => <ProductComponent item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                    />
                </View>

                {/* button see all */}

                <TouchableOpacity
                    style={{ backgroundColor: "#F3F4F6", borderRadius: 5, padding: 8 }}
                    onPress={() => {
                        getAllFavorite();
                        //ẩn button
                    }}
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
        </View>
    );
};

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
