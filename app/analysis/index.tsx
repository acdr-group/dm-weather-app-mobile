import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Stack} from "expo-router";
import PageWrapperComponent from "../../components/shared/PageWrapperComponent";
import {PageTitle} from "../../context/PageContext";
import {ListItem} from "../../components/shared/GenericList";
import {COLORS, FONT_SIZE, GAPS, SIZES} from "../../constatnts/theme";

type Props = {

}
const Analysis: React.FC<Props> = (props: Props) => {

    const analysisCategories: ListItem[] = [
        {
            title: "Temperatur",
            icon: require("../../assets/icons/thermometer.png")
        },
        {
            title: "Feuchte",
            icon: require("../../assets/icons/humidity_percentage.png")
        },
        {
            title: "Nierderschlag",
            icon: require("../../assets/icons/water_drop.png")
        },
        {
            title: "Windgeschwindigkeit",
            icon: require("../../assets/icons/air.png")
        },
        {
            title: "Wind-Richtung",
            icon: require("../../assets/icons/explore.png")
        },
    ]

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                }}
            />
            <ScrollView>
                <PageWrapperComponent title={PageTitle.ANALYSIS_PAGE_TITLE}>
                    <View style={styles.listContainer}>
                        {analysisCategories.map(c =>
                            <View key={c.title}>
                                <View style={styles.listItemContent}>
                                    <Image source={c.icon} style={styles.icon}/>
                                    <Text style={styles.itemTitle}>
                                        {c.title}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                </PageWrapperComponent>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        gap: GAPS.gap2,

    },
    listItemContent: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        gap: GAPS.gap2,
        padding: SIZES.large,
        borderRadius: SIZES.xxSmall,
        borderWidth: 1,
        borderColor: COLORS.gray2,
    },
    itemTitle: {
        fontSize: FONT_SIZE.medium,
        fontWeight: "400",
    },
    icon: {
        height: 20,
        width: 20,
    }
})

export default Analysis
