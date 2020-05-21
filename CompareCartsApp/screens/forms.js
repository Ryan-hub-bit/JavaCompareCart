import { Formik } from "formik";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import FlatButton from "../shared/customButton";
import * as yup from "yup";

const ReviewSchema = yup.object({
    listName: yup.string().required().min(4),
});

export function GroceryListForm({ addList }) {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.globalContainer}>
                <Text style={styles.header}>Create a new list</Text>
                <Formik
                    initialValues={{
                        listName: "",
                        purchaseDate: "",
                        numItems: 0,
                        // key: Math.random().toString()
                    }}
                    validationSchema={ReviewSchema}
                    onSubmit={(values, actions) => {
                        actions.resetForm();
                        addList(values);
                    }}
                >
                    {(props) => (
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="List Name"
                                onChangeText={props.handleChange("listName")}
                                value={props.values.listName}
                                onBlur={props.handleBlur("listName")}
                            />

                            <Text style={styles.errorText}>
                                {props.touched.listName &&
                                    props.errors.listName}
                            </Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Date to Purchase"
                                onChangeText={props.handleChange(
                                    "purchaseDate"
                                )}
                                value={props.values.purchaseDate}
                                onBlur={props.handleBlur("purchaseDate")}
                            />

                            <Text style={styles.errorText}>
                                {props.touched.purchaseDate &&
                                    props.errors.purchaseDate}
                            </Text>
                            <View style={styles.button}>
                                <FlatButton
                                    text="Create"
                                    onPress={props.handleSubmit}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    );
}

export function ShareForm({ listShare, shareList }) {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.globalContainer}>
                <Text style={styles.header}>
                    Share Grocery List {listShare.listName}
                </Text>
                <Formik
                    initialValues={{
                        personShare: "",
                        listId: listShare.listId,
                        listName: listShare.listName,
                    }}
                    validationSchema={ReviewSchema}
                    onSubmit={(values, actions) => {
                        actions.resetForm();
                        shareList(values);
                    }}
                >
                    {(props) => (
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Mobile Number To Share With"
                                onChangeText={props.handleChange("personShare")}
                                value={props.values.personShare}
                                onBlur={props.handleBlur("personShare")}
                            />

                            <Text style={styles.errorText}>
                                {props.touched.listName &&
                                    props.errors.listName}
                            </Text>

                            <View style={styles.button}>
                                <FlatButton
                                    text="Share"
                                    onPress={props.handleSubmit}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    globalContainer: {
        padding: 10,
    },
    header: {
        fontSize: 30,
        fontWeight: "600",
        fontFamily: "Roboto",
        textAlign: "center",
        paddingBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginBottom: 12,
    },
    errorText: {
        color: "crimson",
        fontWeight: "bold",
        textAlign: "center",
    },
    button: {
        alignItems: "center",
    },
});
