import React from 'react';
import GenericCard from "./GenericCard";
import {StyleSheet, View} from "react-native";
import {COLORS, FONT_SIZE, GAPS, SIZES} from "../../constatnts";
import CircularProgress from 'react-native-circular-progress-indicator';

type Props = {
    cardTitle: string
    value: number
    min?: number
    max?: number
    unit: string
    cardIcon?: any
    orientation?: "vertical" | "horizontal"
}

const WeatherKeyValueCard: React.FC<Props> = (props: Props) => {

    const cardSubtitle = String(props.value) + props.unit

    return (
        <GenericCard
            title={props.cardTitle}
            subtitle={cardSubtitle}
            headerIcon={props.cardIcon}
        >
            <View style={styles.circularProgressContainer}>
                <CircularProgress
                    value={props.value}
                    maxValue={props.max}
                    title={props.unit}
                    duration={1000}
                    progressValueColor={COLORS.primary}
                    titleColor={COLORS.primary}
                    activeStrokeColor={COLORS.primary}
                    inActiveStrokeColor={COLORS.gray2}
                    radius={50}
                    progressValueStyle={styles.value}
                    titleStyle={styles.unit}
                />
            </View>
        </GenericCard>
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
        fontSize: FONT_SIZE.xLarge,
        fontWeight: "600",
    },
    unit: {
        fontSize: FONT_SIZE.small,
        fontWeight: "500",
    },
    circularProgressContainer: {
        gap: GAPS.gap1,
        justifyContent: "center",
        textAlign: "center",
        paddingRight: GAPS.gap3,
    }
})


export default WeatherKeyValueCard
