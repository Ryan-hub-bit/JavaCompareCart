import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { CheckBox } from "react-native-elements";

export default function NewItem({
    upc,
    name,
    price,
    groceryProvider,
    addToItemList,
    deleteFromItemList,
    imgUrl,
}) {
    const [isChecked, setChecked] = useState(false);

    function addDeleteItem() {
        if (!isChecked) {
            addToItemList({
                upc: upc,
                name: name,
                groceryProvider: groceryProvider,
                price: price,
                quantity: 1,
                imgUrl: imgUrl,
            });
        } else {
            deleteFromItemList({
                upc: upc,
                name: name,
                groceryProvider: groceryProvider,
                price: price,
                quantity: 1,
                imgUrl: imgUrl,
            });
        }
        setChecked(!isChecked);
    }

    return (
        <View style={styles.item}>
            <Image
                style={styles.smallImg}
                source={{
                    uri: imgUrl,
                }}
            />
            <View style={styles.nameAndPrice}>
                <Text style={styles.nameText}>{name}</Text>
                <Text>{groceryProvider}</Text>
            </View>
            <View style={styles.priceCheckContainer}>
                <Text style={styles.priceText}>${price.toFixed(2)}</Text>
                <CheckBox
                    center
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={isChecked}
                    onPress={() => addDeleteItem()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
    nameAndPrice: {
        marginVertical: 10,
        flex: 3,
    },
    nameText: {
        fontSize: 18,
        fontFamily: "Roboto",
    },
    priceText: {
        fontSize: 18,
        fontFamily: "Roboto",
    },
    quantityText: {
        fontSize: 24,
        fontFamily: "Roboto",
        fontWeight: "500",
    },
    priceCheckContainer: {
        padding: 10,
        alignItems: "center",
    },
    smallImg: {
        width: 50,
        height: 50,
        marginVertical: 10,
        marginRight: 15,
        // marginTop: 30
    },
});
