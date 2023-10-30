import React from 'react';
import GenericStationCard from "./GenericStationCard";
import {StyleSheet, Text, View} from "react-native";
import {FONT_SIZE, GAPS, SIZES} from "../../constatnts/theme";

type Props = {
    cardTitle: string
    value: number
    units: string[]
    cardIcon: any
}

const WeatherKeyValueCard: React.FC<Props> = (props: Props) => {
    return (
        <GenericStationCard title={props.cardTitle} headerIcon={props.cardIcon}>
            <View style={styles.content}>
                <Text style={styles.value}>{props.value}</Text>
                <View style={styles.unitContainer}>
                    {props.units.map(u =>
                        <Text key={u} style={styles.unit}>
                            {u}
                        </Text>
                    )}
                </View>
            </View>
        </GenericStationCard>
    )
}

const styles = StyleSheet.create({
    content: {
        gap: GAPS.gap1,
        paddingHorizontal: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        minHeight: 100,
    },
    value: {
        fontSize: FONT_SIZE.xxxLarge,
        fontWeight: "600",
    },
    unit: {
        fontSize: FONT_SIZE.medium,
        fontWeight: "500",
    },
    unitContainer: {
        alignItems: "center",
        gap: GAPS.gap1,
        justifyContent: "center",
        textAlign: "center",
    }
})


export default WeatherKeyValueCard
