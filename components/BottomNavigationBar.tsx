import React from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import {COLORS, SIZES} from "../constatnts";
import {PageTitle} from "../context/PageContext";
import { StyleSheet } from "react-native";

type BottomNavigationButtonType = {
    label: PageTitle
    icon: string
    onPress: () => void
}

/**
 * BottomNavigationBar component displays a bottom navigation bar with buttons that navigate to different pages.
 *
 * @returns {React.Node} The rendered BottomNavigationBar component.
 */
const BottomNavigationBar: React.FC = () => {

    const router = useRouter()

    const navigationButtons: BottomNavigationButtonType[] = [
        {
            temperature: PageTitle.START_PAGE_TITLE,
            icon: require("../assets/icons/home.png"),
            onPress: () => router.push("/")
        },
        {
            temperature: PageTitle.ANALYSIS_PAGE_TITLE,
            icon: require("../assets/icons/analytics.png"),
            onPress: () => router.push("/analysis")
        },
        {
            temperature: PageTitle.SETTINGS_PAGE_TITLE,
            icon: require("../assets/icons/settings.png"),
            onPress: () => router.push("/settings")
        },
    ]

    return (
        <View style={styles.infoCardListContainer}>
            {navigationButtons.map((button) =>
                <TouchableOpacity
                    key={button.temperature}
                    onPress={button.onPress}
                    style={styles.wrapperButton}
                >
                    <View style={styles.buttonContentContainer}>
                        <Image
                            // @ts-ignore
                            source={button.icon}
                            resizeMode="contain"
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.buttonLabel}>
                            {button.temperature}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    infoCardListContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderTopWidth: 0.3,
        borderTopColor: COLORS.gray,
        paddingTop: SIZES.xxSmall,
        paddingRight: SIZES.xSmall,
        paddingBottom: 2,
        paddingLeft: SIZES.xSmall,
    },
    wrapperButton: {
        justifyContent: "center",
    },
    buttonContentContainer: {
        gap: 4,
        alignItems: "center",
        alignContent: "center",
        width: 150,
    },
    buttonIcon: {
        width: 23,
        height: 23,
    },
    buttonLabel: {
        color: COLORS.black,
        fontSize: SIZES.xxSmall,
        fontWeight: "500",
    }
})

export default BottomNavigationBar
