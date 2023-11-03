import {HourlyTemperature} from "../../models/hourlyTemperature";
import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {FONT_SIZE, GAPS, SIZES} from "../../constatnts";
import GenericStationCard from "./GenericStationCard";

type Props = {
    hourlyTemperatures: HourlyTemperature[]
}
export const HourlyTemperatureList: React.FC<Props> = (props: Props) => {

    const cardIcon = require("../../assets/icons/hourly_prediction.png")

    return (
        <GenericStationCard title={"Stündliche Vorhersage"} headerIcon={cardIcon}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.hourlyTemperatureListContainer}>
                    {props.hourlyTemperatures.map(d =>
                        <View key={d.date.getTime()} style={styles.hourlyTemperatureItem}>
                            <Text style={styles.itemTitle}>
                                {d.date.toLocaleTimeString([], {hour: "2-digit"})} Uhr
                            </Text>
                            <Image
                                source={d.icon}
                                resizeMode="contain"
                                style={styles.iconMedium}
                            />
                            <Text style={styles.itemTemperature}>
                                {d.temp}
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </GenericStationCard>
    )
}

const styles = StyleSheet.create({
    iconMedium: {
        width: 20,
        height: 20,
    },
    hourlyTemperatureListContainer: {
        flexDirection: "row",
        gap: GAPS.gap5,
        paddingHorizontal: SIZES.medium,
    },
    hourlyTemperatureItem: {
        gap: GAPS.gap2,
        justifyContent: "flex-end",
        alignContent: "center",
        alignItems: "center",
    },
    itemTitle: {
        fontWeight: "600",
        fontSize: FONT_SIZE.xSmall,
    },
    itemTemperature: {
        fontWeight: "600",
        fontSize: FONT_SIZE.small,
    }
})