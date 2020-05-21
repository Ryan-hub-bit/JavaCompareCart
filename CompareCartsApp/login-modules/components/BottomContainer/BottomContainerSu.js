import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Card from '../Card/Card';
import Icon from 'react-native-dynamic-vector-icons';
import styles, {container} from './BottomContainerSu.style';

const BottomContainer = props => {
  const {
    switchText,
    switchValue,
    disableSwitch,
    IconComponent,
    usernameTitle,
    passwordTitle,
    confirmedPasswordTitle,
    fullNameTitle,
    mobileNumberTitle,
    addressTitle,
    backgroundColor,
    switchTextStyle,
    onPressSettings,
    disableSettings,
    contentComponent,
    usernamePlaceholder,
    passwordPlaceholder,
    confirmedPasswordPlaceholder,
    confirmedPasswordOnChangeText,
    fullNamePlaceholder,
    mobileNumberPlaceholder,
    addressPlaceholder,
    onSwitchValueChange,
    usernameOnChangeText,
    passwordOnChangeText,
    fullNameOnChangeText,
    mobileNumberOnChangeText,
    addressOnChangeText,
    usernameIconComponent,
    passwordIconComponent,
    usernameTextInputValue,
    passwordTextInputValue,
    fullNameTextInputValue,
    mobileNumberTextInputValue,
    addressTextInputValue,
    confirmedPasswordTextInputValue,
    navigation,
  } = props;
  return (
    <View style={container (backgroundColor)}>
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
        {/* <Card
          name="key"
          secureTextEntry
          type="FontAwesome"
          title={confirmedPasswordTitle}
          value={confirmedPasswordTextInputValue}
          placeholder={confirmedPasswordPlaceholder}
          onChangeText={text => passwordOnChangeText(text)}
          iconComponent={passwordIconComponent}
          {...props}
        /> */}
        <Card
          title={fullNameTitle}
          value={fullNameTextInputValue}
          placeholder={fullNamePlaceholder}
          onChangeText={fullNameOnChangeText}
          iconComponent={usernameIconComponent}
          {...props}
        />

        <Card
          title={mobileNumberTitle}
          value={mobileNumberTextInputValue}
          placeholder={mobileNumberPlaceholder}
          onChangeText={mobileNumberOnChangeText}
          iconComponent={usernameIconComponent}
          {...props}
        />

        <Card
          title={addressTitle}
          value={addressTextInputValue}
          placeholder={addressPlaceholder}
          onChangeText={addressOnChangeText}
          iconComponent={usernameIconComponent}
          {...props}
        />

      </View>
      <View style={styles.footerContainer}>
        {!disableSwitch &&
          <TouchableOpacity onPress={() => navigation.push ("Login")}>
            <Text style={styles.switchTextStyle}>{switchText}</Text>
          </TouchableOpacity>}
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
  passwordPlaceholder: PropTypes.string,
  fullNameTextInputValue: PropTypes.string,
  mobileNumberTextInputValue: PropTypes.string,
  addressTextInputValue: PropTypes.string,
  addressPlaceholder: PropTypes.string,
  confirmedPasswordTextInputValue: PropTypes.string,
  confirmedPasswordPlaceholder: PropTypes.string,
  fullNamePlaceholder: PropTypes.string,
  mobileNumberPlaceholder: PropTypes.string,
  addressPlaceholder: PropTypes.string,
  confirmedPasswordTitle: PropTypes.string,
  fullNameTitle: PropTypes.string,
  mobileNumberTitle: PropTypes.string,
  addressTitle: PropTypes.string,
};

BottomContainer.defaultProps = {
  IconComponent: Icon,
  disableSwitch: false,
  disableSettings: false,
  usernameTitle: 'Username',
  passwordTitle: 'Password',
  confirmedPasswordTitle: 'ConfirmedPassword',
  fullNameTitle: 'FullName',
  mobileNumberTitle: 'MobileNumber',
  addressTitle: 'Address',
  switchText: 'Remember me',
  usernamePlaceholder: 'Username',
  passwordPlaceholder: 'Password',
  confirmedPasswordPlaceholder: 'ConfirmedPassword',
  fullNamePlaceholder: 'FullName',
  mobileNumberPlaceholder: 'MobileNumber',
  addressPlaceholder: 'Address',
  backgroundColor: 'rgba(255,255,255,0.45)',
};

export default BottomContainer;
