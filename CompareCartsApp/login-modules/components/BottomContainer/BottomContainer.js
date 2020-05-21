import React from "react";
import PropTypes from "prop-types";
import { Switch, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Card from "../Card/Card";
import Icon from "react-native-dynamic-vector-icons";
import styles, { container } from "./BottomContainer.style";

const BottomContainer = props => {
    const {
        switchText,
        switchValue,
        disableSwitch,
        IconComponent,
        usernameTitle,
        passwordTitle,
        backgroundColor,
        switchTextStyle,
        onPressSettings,
        disableSettings,
        contentComponent,
        usernamePlaceholder,
        passwordPlaceholder,
        onSwitchValueChange,
        usernameOnChangeText,
        passwordOnChangeText,
        usernameIconComponent,
        passwordIconComponent,
        usernameTextInputValue,
        passwordTextInputValue,
        navigation
    } = props;
    return (
        <View style={container(backgroundColor)}>
            {contentComponent}
            <View style={styles.containerGlue}>
                <Card
                    title={usernameTitle}
                    value={usernameTextInputValue}
                    placeholder={usernamePlaceholder}
                    onChangeText={usernameOnChangeText}
                    iconComponent={usernameIconComponent}
                    {...props}
                />
                <Card
                    name="key"
                    secureTextEntry
                    type="FontAwesome"
                    title={passwordTitle}
                    value={passwordTextInputValue}
                    placeholder={passwordPlaceholder}
                    onChangeText={text => passwordOnChangeText(text)}
                    iconComponent={passwordIconComponent}
                    {...props}
                />
            </View>
            <View style={styles.footerContainer}>
                {!disableSwitch && (
                    <TouchableOpacity
                        onPress={() => navigation.push("Signup")}
                    >
                        <Text style={styles.switchTextStyle}>{switchText}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

BottomContainer.propTypes = {
    switchText: PropTypes.string,
    disableSwitch: PropTypes.bool,
    passwordTitle: PropTypes.string,
    usernameTitle: PropTypes.string,
    disableSettings: PropTypes.bool,
    backgroundColor: PropTypes.string,
    usernamePlaceholder: PropTypes.string,
    passwordPlaceholder: PropTypes.string
};

BottomContainer.defaultProps = {
    IconComponent: Icon,
    disableSwitch: false,
    disableSettings: false,
    usernameTitle: "Username",
    passwordTitle: "Password",
    switchText: "Remember me",
    usernamePlaceholder: "Username",
    passwordPlaceholder: "Password",
    backgroundColor: "rgba(255,255,255,0.45)"
};

export default BottomContainer;
