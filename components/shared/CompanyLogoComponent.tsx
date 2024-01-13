import React from 'react';
import { View, Image } from 'react-native';
import {StyleSheet} from "react-native";
import {COLORS} from "../../constatnts";

export const CompanyLogoComponent = () => {
    return (
        <View style={styles.mainContainer}>
            <Image
                style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    alignSelf: "center",
                }}
                source={require("../../assets/icon.png")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignSelf: "center",
        alignItems: 'center',
    }
})