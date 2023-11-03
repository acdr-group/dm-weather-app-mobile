import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Stack} from "expo-router";
import PageWrapperComponent from "../../components/shared/PageWrapperComponent";
import {PageTitle} from "../../context/PageContext";
import GenericList, {ListItem} from "../../components/shared/GenericList";
import {COLORS, GAPS, SIZES} from "../../constatnts/theme";

type Props = {

}
const Settings: React.FC<Props> = (props: Props) => {

    const appInfoList: ListItem[] = [
        {
            title: "App-Version",
            leftSideText: "1.0.0",
        },
        {
            title: "Last release",
            leftSideText: "15.11.2023",
        },
    ]

    const dataSourceList: ListItem[] = [
        {
            title: "Anzeigeregion",
            leftSideText: "Karlsruhe",
        },
        {
            title: "Datenquelle",
            leftSideText: "Heidelberg Universität",
        },
        {
            title: "Wetterstation",
            leftSideText: "Karlsruhe dmTECH",
        },
    ]

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                }}
            />
            <ScrollView style={styles.scrollView}>
                <PageWrapperComponent title={PageTitle.SETTINGS_PAGE_TITLE}>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryLabel}>Anwendungsstammdaten</Text>
                        <GenericList listData={appInfoList}/>
                    </View>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryLabel}>Datenherkunft</Text>
                        <GenericList listData={dataSourceList}/>
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
        gap: GAPS.gap1,
    },
    categoryLabel: {
        marginHorizontal: SIZES.medium,
        color: COLORS.gray,
    }
})

export default Settings
