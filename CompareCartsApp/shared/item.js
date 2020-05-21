import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Image,
} from "react-native";

export default function Item({
    name,
    quantity,
    price,
    imgUrl,
    upc,
    deleteItem,
}) {
    function deleteItemAlert(name, upc) {
        Alert.alert(
            "Remove Item?",
            "Do you want to remove " + name + "?",
            [
                {
                    text: "No",
                },
                {
                    text: "Yes",
                    onPress: () => deleteItem(upc),
                    style: "cancel",
                },
            ],
            { cancelable: true }
        );
    }

    return (
        <TouchableOpacity onLongPress={() => deleteItemAlert(name, upc)}>
            <View style={styles.item}>
                <Image
                    style={styles.smallImg}
                    source={{
                        uri: imgUrl,
                    }}
                />
                <View style={styles.nameAndPrice}>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.priceText}>${price.toFixed(2)}</Text>
                </View>
                <View style={styles.quantityContainer}>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <Text style={styles.priceText}>Qty</Text>
                </View>
            </View>
        </TouchableOpacity>
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
        marginLeft: 18,
        marginVertical: 10,
        flex: 8,
    },
    nameText: {
        fontSize: 20,
        fontFamily: "Roboto",
    },
    priceText: {
        fontSize: 20,
        fontFamily: "Roboto",
    },
    quantityText: {
        fontSize: 30,
        fontFamily: "Roboto",
        fontWeight: "500",
    },
    quantityContainer: {
        marginRight: 10,
        alignItems: "center",
        flex: 1,
    },
    smallImg: {
        width: 50,
        height: 50,
        marginVertical: 15,
        // marginTop: 30
    },
});
