import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Modal,
    SectionList,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
} from "react-native";
import Item from "../shared/item";
import { AddItem } from "../shared/customButton";
import { AntDesign } from "@expo/vector-icons";
import ItemSearch from "./itemSearch";

export default function List({ navigation, route }) {
    const { listName, listId, ACCOUNT_ID } = route.params;
    const [items, setItems] = useState([
        {
            title: "Walmart Grocery",
            data: [],
        },
        {
            title: "Amazon Fresh",
            data: [],
        },
        {
            title: "Peapod",
            data: [],
        },
    ]);

    const [modalOpen, setModalOpen] = useState(false);
    const [total, setTotal] = useState(0.0);
    const [saved, setSaved] = useState(0.0);
    const [dummyRefresh, setRefreshDummy] = useState(false);

    // var ACCOUNT_ID = "1";

    async function postItemToList(item) {
        fetch(
            "https://comparecarts.herokuapp.com/" +
                ACCOUNT_ID +
                "/lists/" +
                listId.toString(),
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: item.name,
                    upc: item.upc,
                    groceryProvider: item.groceryProvider,
                    price: item.price,
                    url: item.url,
                }),
            }
        ).catch((error) => {
            console.error(error);
        });
    }
    async function getListItems() {
        fetch(
            "https://comparecarts.herokuapp.com/" + ACCOUNT_ID + "/lists/" + listId.toString()
        )
            .then((res) => res.text())
            .then((text) => (text.length ? JSON.parse(text) : [])) // If it returns nothing
            .then((res) => {
                setItems([
                    {
                        title: "Walmart Grocery",
                        data: [],
                    },
                    {
                        title: "Amazon Fresh",
                        data: [],
                    },
                    {
                        title: "Peapod",
                        data: [],
                    },
                ]);
                setRefreshDummy(!dummyRefresh);
                for (let i = 0; i < res.length; i++) {
                    addItemsToList(
                        [
                            {
                                name: res[i].name,
                                groceryProvider: res[i].groceryProvider,
                                price: res[i].price,
                                quantity: res[i].quantity,
                                imgUrl: res[i].url,
                                upc: res[i].upc,
                            },
                        ],
                        false
                    );
                }
                setRefreshDummy(!dummyRefresh);
            })
            .then(() => getReqSaved())
            .catch((error) => {
                console.error(error);
            });
    }

    async function getReqSaved() {
        fetch(
            "https://comparecarts.herokuapp.com/" +
                ACCOUNT_ID +
                "/price/" +
                listId.toString(),
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.text())
            .then((text) => (text.length ? JSON.parse(text) : [])) // If it returns nothing
            .then((res) => {
                setSaved(res.saved);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function optimize() {
        fetch(
            "https://comparecarts.herokuapp.com/" +
                ACCOUNT_ID +
                "/lists/" +
                listId.toString() +
                "/opt",
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
            .then(getListItems())
            .catch((error) => {
                console.error(error);
            });
    }

    async function deleteItem(upc) {
        console.log(upc);
        fetch(
            "https://comparecarts.herokuapp.com/deleteProduct/" +
                listId.toString() +
                "/" +
                upc,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
            .then(getListItems())
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getListItems();
    }, []);

    function addItemsToList(itemList, post) {
        setItems((currentItems) => {
            let itemsCopy = JSON.parse(JSON.stringify(currentItems));

            for (let j = 0; j < itemList.length; j++) {
                var item = itemList[j];
                for (let i = 0; i < itemsCopy.length; i++) {
                    if (itemsCopy[i].title == item.groceryProvider) {
                        itemsCopy[i].data.push({
                            name: item.name,
                            quantity: parseInt(item.quantity),
                            price: parseFloat(item.price),
                            imgUrl: item.imgUrl,
                            upc: item.upc,
                        });
                        if (post) {
                            console.log(item);
                            postItemToList({
                                name: item.name,
                                upc: item.upc,
                                groceryProvider: item.groceryProvider,
                                price: item.price,
                                url: item.imgUrl,
                            });
                        }
                    }
                }
            }

            return itemsCopy;
        });
        setModalOpen(false);
    }

    function getSubtotal(providerItems) {
        var subtotal = 0;
        for (let i = 0; i < providerItems.length; i++) {
            subtotal += providerItems[i].price;
        }
        return subtotal;
    }

    function getTotal() {
        var temp = 0;
        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < items[i].data.length; j++) {
                temp += items[i].data[j].price;
            }
        }

        // if (temp < total) {
        //     setSaved(total - temp);
        //     setTotal(temp);
        // } else if (temp != total) {
        //     // setTotal(temp);
        // }

        return temp;
    }

    function getSaved() {
        return saved;
    }

    function checkIfEmptyList() {
        if (
            items[0].data.length == 0 &&
            items[1].data.length == 0 &&
            items[2].data.length == 0
        ) {
            return (
                <View style={styles.emptyCart}>
                    <Image
                        source={require("../assets/emptyBasket.png")}
                        style={{ width: 130, height: 130 }}
                    />
                    <Text style={styles.noItemsText}>Your list is empty!</Text>
                    <Text style={styles.subNoItemsText}>
                        Add an item by clicking "search for an item" below.
                    </Text>
                </View>
            );
        } else {
            return (
                <SectionList
                    sections={items}
                    keyExtractor={(item, index) => item + index}
                    refreshing={false}
                    onRefresh={() => getListItems()}
                    renderItem={({ item }) => (
                        <Item
                            name={item.name}
                            quantity={item.quantity}
                            price={item.price}
                            imgUrl={item.imgUrl}
                            upc={item.upc}
                            deleteItem={deleteItem}
                        />
                    )}
                    renderSectionHeader={({ section: { title, data } }) =>
                        data.length != 0 ? (
                            <Text style={styles.groceryProviderText}>
                                {title}
                            </Text>
                        ) : null
                    }
                    renderSectionFooter={({ section: { data } }) =>
                        data.length != 0 ? (
                            <Text style={styles.subtotalText}>
                                Subtotal: ${getSubtotal(data).toFixed(2)}
                            </Text>
                        ) : null
                    }
                />
            );
        }
    }

    return (
        <View style={styles.container}>
            <Modal
                visible={modalOpen}
                animationType="slide"
                onRequestClose={() => setModalOpen(false)}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.modalContent}>
                        <View
                            style={{ ...styles.headerContainer, marginTop: 20 }}
                        >
                            <AntDesign
                                name="left"
                                size={30}
                                style={styles.pageBack}
                                onPress={() => setModalOpen(false)}
                            />
                            <Text style={styles.listHeader}>
                                Search For An Item
                            </Text>
                        </View>
                        <ItemSearch
                            style={styles.itemSearchStyle}
                            addItemsToList={addItemsToList}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <View style={styles.headerContainer}>
                <AntDesign
                    name="left"
                    size={30}
                    style={styles.pageBack}
                    onPress={() => navigation.pop()}
                />
                <Text style={styles.listHeader}>{listName}</Text>
            </View>
            <View style={styles.listContainer}>{checkIfEmptyList()}</View>
            <View style={styles.footerStyle}>
                <View style={styles.bottomButtons}>
                    <AddItem
                        icon="md-color-wand"
                        onPress={() => optimize()}
                        size={30}
                    />
                    <AddItem
                        icon="ios-add"
                        onPress={() => setModalOpen(true)}
                        size={45}
                    />
                </View>
                <Text style={styles.totalText}>
                    Total: ${getTotal().toFixed(2)}
                </Text>
                <Text style={styles.savedText}>
                    You Saved: ${getSaved().toFixed(2)}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    headerContainer: {
        marginTop: 40,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    listHeader: {
        marginLeft: 10,
        fontSize: 30,
        fontWeight: "600",
        fontFamily: "Roboto",
    },
    listContainer: {
        flex: 8,
        marginHorizontal: 15,
        marginBottom: 25,
    },
    footerStyle: {
        flex: 1,
        backgroundColor: "#00E9A3",
        alignItems: "center",
    },
    groceryProviderText: {
        fontSize: 20,
        fontFamily: "Roboto",
        fontWeight: "bold",
        marginTop: 10,
    },
    subtotalText: {
        textAlign: "right",
        fontSize: 20,
        fontFamily: "Roboto",
        marginTop: 5,
    },
    totalText: {
        position: "relative",
        bottom: 10,
        fontSize: 25,
        color: "white",
        fontFamily: "Roboto",
        fontWeight: "bold",
    },
    savedText: {
        fontSize: 18,
        bottom: 8,
        color: "white",
        fontFamily: "Roboto",
        fontWeight: "bold",
    },
    modalContent: {
        flex: 1,
    },
    modalBack: {
        marginLeft: 20,
        marginTop: 20,
    },
    emptyCart: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    noItemsText: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Roboto",
        color: "#3AC4FF",
        textAlign: "center",
        paddingTop: 30,
        paddingBottom: 10,
    },
    subNoItemsText: {
        fontSize: 20,
        fontWeight: "600",
        fontFamily: "Roboto",
        textAlign: "center",
    },
    bottomButtons: {
        flexDirection: "row",
        flex: 1,
    },
});
