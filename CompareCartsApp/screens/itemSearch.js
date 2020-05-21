import React, { useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    FlatList,
    Image,
    Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import NewItem from "../shared/newItem";
import FlatButton from "../shared/customButton";

export default function ItemSearch({ addItemsToList }) {
    const [newItems, setNewItems] = useState([]);

    const [addedItems, setAddedItems] = useState([]);
    const [itemQuery, setQuery] = useState();

    var ACCOUNT_ID = "1";

    async function searchItem(itemQuery) {
        fetch("https://comparecarts.herokuapp.com/" + ACCOUNT_ID + "/product", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: itemQuery,
            }),
        })
            .then((res) => res.text())
            .then((text) => (text.length ? JSON.parse(text) : {})) // If it returns nothing
            .then((res) => {
                setNewItems(res);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const addToItemList = (item) => {
        setAddedItems((prevAddedItems) => {
            return [...prevAddedItems, item];
        });
    };

    const deleteFromItemList = (itemToDelete) => {
        setAddedItems((prevAddedItems) => {
            return prevAddedItems.filter(
                (item) => item.itemName != itemToDelete.itemName
            );
        });
    };

    function checkIfSearched() {
        if (newItems.length == 0) {
            return (
                <View style={styles.emptyList}>
                    <Image
                        source={require("../assets/search.png")}
                        style={{ width: 130, height: 130 }}
                    />
                    <Text style={styles.noListsText}>
                        Items Will Appear Here!
                    </Text>
                    <Text style={styles.subNoListsText}>
                        Search for an item by using the search box above.
                    </Text>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={newItems}
                    keyExtractor={(item) => item.upc}
                    renderItem={({ item }) => (
                        <NewItem
                            upc={item.upc}
                            name={item.name}
                            price={item.price}
                            groceryProvider={item.groceryProvider}
                            addToItemList={addToItemList}
                            deleteFromItemList={deleteFromItemList}
                            imgUrl={item.img}
                        />
                    )}
                />
            );
        }
    }

    return (
        <View style={styles.globalContainer}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBox}
                    placeholder="Search For Item!"
                    onChangeText={(text) => setQuery(text)}
                />
                <AntDesign
                    name="search1"
                    size={30}
                    style={styles.modalBack}
                    onPress={() => searchItem(itemQuery)}
                />
            </View>
            <View style={styles.itemList}>{checkIfSearched()}</View>
            <View style={styles.footerStyle}>
                <FlatButton
                    text="Add To Grocery List"
                    onPress={() => addItemsToList(addedItems, true)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    globalContainer: {
        padding: 20,
        justifyContent: "center",
        flex: 1,
        alignContent: "flex-start",
        backgroundColor: "#FFFFFF",
    },
    searchContainer: {
        alignItems: "center",
        flexDirection: "row",
    },
    searchBox: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ddd",
        padding: 8,
        margin: 10,
        width: "80%",
    },
    itemList: {
        flex: 10,
    },
    footerStyle: {
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1,
    },
    emptyList: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    noListsText: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Roboto",
        color: "#3AC4FF",
        textAlign: "center",
        paddingTop: 30,
        paddingBottom: 10,
    },
    subNoListsText: {
        fontSize: 20,
        fontWeight: "600",
        fontFamily: "Roboto",
        textAlign: "center",
        paddingBottom: 40,
    },
});
