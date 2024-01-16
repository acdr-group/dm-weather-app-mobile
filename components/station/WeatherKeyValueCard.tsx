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

/**
 * WeatherKeyValueCard component displays a weather key-value card.
 * It is a functional component that accepts props as an argument.
 *
 * @param {object} props - The props for the WeatherKeyValueCard component.
 * @param {string} props.cardTitle - The title of the card.
 * @param {number} props.value - The value to be displayed in the card.
 * @param {string} props.unit - The unit for the value.
 * @param {string} props.cardIcon - The icon to be displayed in the card header.
 * @param {number} props.max - The maximum value for the progress bar.
 *
 * @returns {React.ReactNode} Returns the rendered WeatherKeyValueCard component.
 */
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
