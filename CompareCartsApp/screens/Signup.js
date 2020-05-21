import React, { useState } from "react";
import { View, StyleSheet, Image, StatusBar, Alert } from "react-native";
import SignupScreen from "../login-modules/SignupScreen";

export default function Signup({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [switchValue, setSwitchValue] = useState(false);

    async function verifyUserPass() {
        console.log(password);
        fetch("https://comparecarts.herokuapp.com/welcome/1", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                fullname: fullname,
                mobileNumber: mobileNumber,
                address: address,
            }),
        })
            .then((res) =>
                res.status == 201
                    ? navigation.reset({
                          index: 0,
                          routes: [
                              {
                                  name: "Login",
                                  params: { username: username },
                              },
                          ],
                      })
                    : Alert.alert(
                          "Invalid username, password, fullname, mobile number or address!",
                          "Try logging in again.",
                          [
                              {
                                  text: "OK",
                              },
                          ],
                          { cancelable: true }
                      )
            )
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <View>
            <StatusBar barStyle="light-content" />
            <SignupScreen
                source={require("../assets/background.jpeg")}
                switchValue={switchValue}
                loginButtonBackgroundColor="white"
                onPressLogin={() =>
                    username && password
                        ? verifyUserPass()
                        : Alert.alert(
                              "Usernames,passwords,fullname,mobileNumber,address cannot be empty!",
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
                fullNameOnChangeText={(fullname) => setFullname(fullname)}
                mobileNumberOnChangeText={(mobileNumber) =>
                    setMobileNumber(mobileNumber)
                }
                addressOnChangeText={(address) => setAddress(address)}
                onSwitchValueChange={(switchValue) => {
                    setSwitchValue(switchValue);
                }}
                disableSettings={true}
                loginButtonTextStyle={styles.loginText}
                logoText="CompareCarts"
                switchText="Already have an account? Sign in!"
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
