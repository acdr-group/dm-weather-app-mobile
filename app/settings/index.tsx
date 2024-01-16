import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StatusBarStyle, StyleSheet, Text, View} from "react-native";
import {Stack} from "expo-router";
import PageWrapperComponent from "../../components/shared/PageWrapperComponent";
import {PageTitle} from "../../context/PageContext";
import GenericList, {ListItem} from "../../components/shared/GenericList";
import {COLORS, FONT_SIZE, GAPS, SIZES} from "../../constatnts";

/**
 * React functional component representing the Settings page.
 */
const Settings: React.FC = () => {
    const statusBarStyle: StatusBarStyle = "light-content"

    const appInfoList: ListItem[] = [
        {
            title: "App-Version",
            leftSideText: process.env.EXPO_PUBLIC_APP_VERSION,
        },
        {
            title: "Last release",
            leftSideText: process.env.EXPO_PUBLIC_LAST_RELEASE_DATE,
        },
    ]

    const dataSourceList: ListItem[] = [
        {
            title: "Anzeigeregion",
            leftSideText: "Karlsruhe",
        },
        {
            title: "Datenquelle",
            leftSideText: process.env.EXPO_PUBLIC_WEATHER_DATA_PROVIDER,
        },
        {
            title: "Wetterstation",
            leftSideText: process.env.EXPO_PUBLIC_WEATHER_DATA_PROVIDER,
        },
    ]

    return (
        <SafeAreaView>
            <StatusBar
                barStyle={statusBarStyle}
            />
            <Stack.Screen
                options={{
                    headerTitle: PageTitle.SETTINGS_PAGE_TITLE,
                    headerShown: true,
                    headerTitleStyle: { color: COLORS.white },
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTitleAlign: "center",
                    headerTintColor: COLORS.white,
                    headerBackTitleVisible: true,
                    headerTransparent: false,
                    headerShadowVisible: false,
                    headerBackVisible: true,
                }}
            />
            <ScrollView style={styles.scrollView}>
                <PageWrapperComponent>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryLabel}>Datenherkunft</Text>
                        <GenericList listData={dataSourceList}/>
                    </View>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryLabel}>Anwendungsstammdaten</Text>
                        <GenericList listData={appInfoList}/>
                    </View>
                </PageWrapperComponent>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%",
    },
    categoryContainer: {
        gap: GAPS.gap2,
    },
    categoryLabel: {
        fontSize: FONT_SIZE.small,
        marginHorizontal: SIZES.medium,
        color: COLORS.gray,
    }
})

export default Settings
