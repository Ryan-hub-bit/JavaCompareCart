import React, { useState } from "react";
import { View, StyleSheet, Image, StatusBar, Alert } from "react-native";
import LoginScreen from "../login-modules/LoginScreen";

export default function Login({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [switchValue, setSwitchValue] = useState(false);

    function loginNavigate(accountID) {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: "GroceryLists",
                    params: { accountID: accountID },
                },
            ],
        });
    }

    async function verifyUserPass() {
        fetch("https://comparecarts.herokuapp.com/login/1", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            // .then(() => loginNavigate(7))
            .then((response) => response.json())
            .then((json) => json.account)
            .then((jsonAcc) => loginNavigate(jsonAcc))
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <View>
            <StatusBar barStyle="light-content" />
            <LoginScreen
                source={require("../assets/background.jpeg")}
                switchValue={switchValue}
                loginButtonBackgroundColor="white"
                onPressLogin={() =>
                    username && password
                        ? verifyUserPass()
                        : Alert.alert(
                              "Usernames and Passwords cannot be empty!",
                              "Try logging in again.",
                              [
                                  {
                                      text: "OK",
                                  },
                              ],
                              { cancelable: true }
                          )
                }
                usernameOnChangeText={(username) => setUsername(username)}
                passwordOnChangeText={(password) => setPassword(password)}
                onSwitchValueChange={(switchValue) => {
                    setSwitchValue(switchValue);
                }}
                disableSettings={true}
                loginButtonTextStyle={styles.loginText}
                logoText="CompareCarts"
                switchText="Don't have an account? Sign up!"
                navigation={navigation}
                logoComponent={
                    <Image
                        source={require("../assets/logo.png")}
                        style={{ width: 340, height: 80 }}
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loginText: {
        color: "blue",
        fontSize: 20,
        fontWeight: "400",
        fontFamily: "Roboto",
    },
});
