import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FlatButton({ text, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.buttonContainer}
            activeOpacity={0.5}
        >
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export function AddItem({ onPress, icon, size }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.iconButton}
            activeOpacity={0.5}
        >
            <View style={styles.iconButtonInner}>
                <Ionicons name={icon} size={size} style={styles.icon} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: "75%"
    },
    button: {
        //position: "relative",
        //top: -25,
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: "#3AC4FF",
        borderColor: "white",
        borderWidth: 2
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 16,
        textAlign: "center"
    },
    icon: {
        color: "white"
    },
    iconButton: {
        top: -25,
        borderRadius: 30,
        // paddingVertical: 6,
        marginHorizontal: 90,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3AC4FF",
        borderColor: "white",
        borderWidth: 3
    }
});
