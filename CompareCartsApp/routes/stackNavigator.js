import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import GroceryLists from "../screens/groceryLists";
import List from "../screens/list";
import Login from "../screens/login";
import Signup from "../screens/Signup";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="GroceryLists" component={GroceryLists} />
            <Stack.Screen name="List" component={List} />
        </Stack.Navigator>
    );
}

export default function StackNavigator() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
