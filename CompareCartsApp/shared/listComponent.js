import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function ListComponent({
    listName,
    numItems,
    navigation,
    listId,
    fetchData,
    openShareOverlay,
    ACCOUNT_ID,
}) {
    async function deleteList(listId) {
        // var ACCOUNT_ID = 1;
        fetch(
            "https://comparecarts.herokuapp.com/deleteList/" +
                ACCOUNT_ID +
                "/" +
                listId,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
            .then(() => fetchData())
            .catch((error) => {
                console.error(error);
            });
    }
    return (
        <View style={styles.outerContainer}>
            <TouchableNativeFeedback
                activeOpacity={0.5}
                onPress={() =>
                    navigation.push("List", {
                        listName: listName,
                        listId: listId,
                        ACCOUNT_ID: ACCOUNT_ID,
                    })
                }
            >
                {/* <View style={{flexDirection: "row", alignItems: "center"}}> */}
                <View style={styles.container}>
                    <Text style={styles.itemText}>{numItems} Items </Text>
                    <Text style={styles.listText}>{listName}</Text>
                </View>
                {/* <View>
                    <Text style={{...styles.listText, color: "#696969"}}>{month}</Text>
                    <Text style={{...styles.listText, color: "#696969", fontSize: 25}}>{day}</Text>
                </View> */}
                {/* </View> */}
            </TouchableNativeFeedback>
            <View style={{ flexDirection: "column" }}>
                <Feather
                    name="trash-2"
                    size={32}
                    style={{ paddingTop: 20, color: "darkred" }}
                    onPress={() => deleteList(listId)}
                />
                <Feather
                    name="share-2"
                    size={30}
                    style={{ paddingTop: 20, color: "slategray" }}
                    onPress={() => openShareOverlay(listId, listName)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: "row",
    },
    container: {
        backgroundColor: "#00E9A3",
        margin: 10,
        paddingVertical: 30,
        borderRadius: 15,
        elevation: 7,
        width: "85%",
    },
    itemText: {
        fontSize: 20,
        color: "white",
        fontFamily: "Roboto",
        position: "relative",
        bottom: 20,
        left: 15,
    },
    listText: {
        fontSize: 30,
        color: "white",
        fontFamily: "Roboto",
        fontWeight: "bold",
        position: "relative",
        left: 15,
    },
    trash: {
        paddingTop: 20,
        color: "darkslategray",
    },
});
