import {SafeAreaView, StatusBar, StatusBarStyle, StyleSheet} from "react-native"
import {Stack} from "expo-router";
import {COLORS} from "../constatnts";
import React from "react";
import StartComponent from "./start";

const Home: React.FC = () => {

    const statusBarStyle: StatusBarStyle = "dark-content"

    return (
        <SafeAreaView style={styles.pageContainer}>
            <StatusBar
                barStyle={statusBarStyle}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                    headerTransparent: true,
                    headerShadowVisible: true,
                }}
            />
            <StartComponent/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
})

export default Home;
