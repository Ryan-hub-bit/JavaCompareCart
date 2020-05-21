import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import ListComponent from "../shared/listComponent";
import FlatButton from "../shared/customButton";
import { GroceryListForm, ShareForm } from "./forms";
import { Overlay } from "react-native-elements";

export default function GroceryLists({ navigation, route }) {
    const { accountID } = route.params;
    const [lists, setLists] = useState([]);
    const [dummyRefresh, setRefreshDummy] = useState(false);

    var ACCOUNT_ID = accountID.toString();

    async function fetchData() {
        fetch("https://comparecarts.herokuapp.com/" + ACCOUNT_ID + "/lists")
            .then((res) => res.text())
            .then((text) => (text.length ? JSON.parse(text) : [])) // If it returns nothing
            .then((res) => {
                setLists([]);
                setRefreshDummy(!dummyRefresh);
                setLists(res);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function postNewList(newList) {
        fetch("https://comparecarts.herokuapp.com/" + ACCOUNT_ID, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newList.listName,
                accountID: ACCOUNT_ID,
            }),
        })
            .then(fetchData())
            .catch((error) => {
                console.error(error);
            });
    }

    async function postSharedList(list) {
        fetch(
            "https://comparecarts.herokuapp.com/share/" +
                list.listName +
                "/" +
                list.personShare +
                "/" +
                list.listId,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        ).catch((error) => {
            console.error(error);
        });
    }

    const [overlayVisible, setOverlayVisible] = useState(false);
    const [shareVisible, setShareVisible] = useState(false);
    const [listShare, setListShare] = useState({});

    function openShareOverlay(listId, listName) {
        setListShare({
            listId: listId,
            listName: listName,
        });
        setShareVisible(true);
    }

    const addListPost = (list) => {
        postNewList(list);
        setOverlayVisible(false);
    };

    const shareList = (list) => {
        postSharedList(list);
        setShareVisible(false);
    };

    function checkEmptyList() {
        if (Array.isArray(lists) && !lists.length) {
            return (
                <View style={styles.emptyCart}>
                    <Image source={require("../assets/basket.png")} />
                    <Text style={styles.noListsText}>
                        You Don't Have Any Lists!
                    </Text>
                    <Text style={styles.subNoListsText}>
                        Create a list by pressing "Add Grocery List" below to
                        get started!
                    </Text>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={lists}
                    refreshing={false}
                    onRefresh={() => fetchData()}
                    keyExtractor={(item) => item.listId}
                    style={{ flex: 1 }}
                    renderItem={({ item }) => (
                        <ListComponent
                            numItems={item.numItems}
                            listName={item.name}
                            navigation={navigation}
                            listId={item.listId}
                            fetchData={fetchData}
                            openShareOverlay={openShareOverlay}
                            ACCOUNT_ID={ACCOUNT_ID}
                            // month={item.month}
                            // day={item.day}
                        />
                    )}
                />
            );
        }
    }

    return (
        <View style={styles.globalContainer}>
            <Overlay
                isVisible={overlayVisible}
                onBackdropPress={() => setOverlayVisible(false)}
                width="80%"
                height="auto"
                borderRadius={15}
            >
                <View>
                    <GroceryListForm addList={addListPost} />
                </View>
            </Overlay>
            <Overlay
                isVisible={shareVisible}
                onBackdropPress={() => setShareVisible(false)}
                width="80%"
                height="auto"
                borderRadius={15}
            >
                <View>
                    <ShareForm listShare={listShare} shareList={shareList} />
                </View>
            </Overlay>
            <Text style={styles.header}>Your Grocery Lists</Text>
            <View style={styles.listStyle}>{checkEmptyList()}</View>
            <View style={styles.footerStyle}>
                <FlatButton
                    text="Add Grocery List"
                    onPress={() => setOverlayVisible(true)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        marginTop: 40,
        marginBottom: 10,
        marginLeft: 20,
        fontSize: 30,
        fontWeight: "600",
        fontFamily: "Roboto",
    },
    listStyle: {
        padding: 10,
        flex: 1,
        flexDirection: "row",
    },
    footerStyle: {
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    emptyCart: {
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
        paddingTop: 40,
        paddingBottom: 10,
    },
    subNoListsText: {
        fontSize: 20,
        fontWeight: "600",
        fontFamily: "Roboto",
        textAlign: "center",
    },
});
