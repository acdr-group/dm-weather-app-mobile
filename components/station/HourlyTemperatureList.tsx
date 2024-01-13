import React, {useMemo} from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {COLORS, FONT_SIZE, GAPS, SIZES} from "../../constatnts";
import GenericCard from "./GenericCard";
import {Weather} from "../../api/weather";

type HourlyTemperature = {
    date: Date,
    iconSource: string,
    temp: string,
}

type Props = {
    weatherList: Weather[]
}
export const HourlyTemperatureList: React.FC<Props> = (props: Props) => {
    const { weatherList } = props

    const hourlyTemperatures: HourlyTemperature[] = useMemo<HourlyTemperature[]>(() => {
        return weatherList.map(w => {
            return {
                date: w.dateTime,
                temp: `${w.temp.toFixed()}°`,
                iconSource: `https://openweathermap.org/img/wn/${w.icon}@2x.png`
            }
        })
    }, [weatherList])

    return (
        <GenericCard orientation={"vertical"} title={"Temperaturen in den nächsten Stunden"}>
            <View style={styles.mainContainer}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.hourlyTemperatureListContainer}>
                        {hourlyTemperatures.map(d =>
                            <View key={d.date.getTime()} style={styles.hourlyTemperatureItem}>
                                <Text style={styles.itemTitle}>
                                    {`${d.date.toLocaleString([], {hour: "2-digit"})} Uhr`}
                                </Text>
                                <View style={styles.dateOfHourContainer}>
                                    <Text style={styles.dateOfHour}>
                                        {d.date.toLocaleString("de-DE", {day: "2-digit", month: "2-digit"})}
                                    </Text>
                                </View>
                                <View style={styles.iconWrapper}>
                                    <Image
                                        source={{ uri: d.iconSource }}
                                        alt={"weather-indicator"}
                                        style={styles.iconMedium}
                                    />
                                </View>
                                <Text style={styles.itemTemperature}>
                                    {d.temp}
                                </Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </GenericCard>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
      gap: GAPS.gap3,
    },
    iconWrapper: {
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.primaryGrey,
        shadowColor: COLORS.secondary,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    iconMedium: {
        width: 40,
        height: 40,
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
    dateOfHourContainer: {
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.xxSmall,
        paddingVertical: SIZES.xxxSmall,
    },
    dateOfHour: {
        color: COLORS.white,
        backgroundColor: COLORS.primary,
    },
    itemTemperature: {
        fontWeight: "600",
        fontSize: FONT_SIZE.small,
    }
})