import React, {useCallback, useMemo} from 'react';
import GenericCard from "./station/GenericCard";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {COLORS, FONT_SIZE, GAPS, SIZES} from "../constatnts";
import * as Progress from 'react-native-progress';
import {computeValueForBarChart} from "../helpers/charts";
import {Forecast} from "../api/forecast";
import {Weather} from "../api/weather";

type TemperatureValuesOfADay = {
    day: Date
    min: number
    max: number
    avg: number
    unit: string
    iconSource: string
}

type Props = {
    forecast: Forecast
}
const WeeklyTemperaturesCardComponent: React.FC<Props> = (props: Props) => {

    const { forecast } = props;

    const extractDatesFromWeatherList = useCallback<() => Weather[]>(() => {
        return forecast.weatherList.reduce((acc: Weather[], curr: Weather) =>
                (acc as Weather[])
                    .find(w => w.dateTime.getDate() === curr.dateTime.getDate()) ?
                    acc : [...acc, curr]
            , [])
    }, [forecast.weatherList])

    const temperatureValues = useMemo<TemperatureValuesOfADay[]>(() => {
        return extractDatesFromWeatherList().map<TemperatureValuesOfADay>((w) => ({
            day: w.dateTime,
            min: Number(w.tempMin.toFixed(1)),
            max: Number(w.tempMax.toFixed(1)),
            avg: Number(w.temp),
            unit: "°C",
            iconSource: `https://openweathermap.org/img/wn/${w.icon}@2x.png`
        })).slice(0, 5)
    }, [forecast.weatherList]);

    return (
        <GenericCard title={`${temperatureValues.length}-Tage-Vorhersage`} orientation={"vertical"}>
            <View style={styles.container}>
                {temperatureValues.map((item, index, arr) =>
                    <View
                        key={index}
                        style={[
                            styles.dayTemperatureItemContainer,
                            index !== arr.length - 1 ? styles.borderBottom : undefined
                        ]}
                    >
                        <View style={styles.dateColumn}>
                            <Text style={styles.weekDay}>
                                {item.day.getDate() === new Date().getDate() ?
                                    "Heute" :
                                    new Intl.DateTimeFormat("de-DE", {weekday: "long"}).format(item.day)
                                }
                            </Text>
                            <Text style={styles.restOfDate}>
                                {new Intl.DateTimeFormat("de-DE", {day: "2-digit", month: "short", year: "numeric"})
                                    .format(item.day)
                                }
                            </Text>
                        </View>
                        <View style={styles.iconWrapper}>
                            <Image
                                source={{ uri: item.iconSource }}
                                alt={"weather-indicator"}
                                style={styles.iconMedium}
                            />
                        </View>
                        <View style={styles.minMaxContainer}>
                            <View>
                                <Text style={styles.temperature}>
                                    {`${item.min.toFixed()}°`}
                                </Text>
                            </View>
                            <View style={styles.chartWrapper}>
                                <Progress.Bar
                                    progress={computeValueForBarChart(item.avg * 10)}
                                    width={null}
                                    height={6}
                                    borderWidth={0}
                                    borderRadius={10}
                                    color={COLORS.primary}
                                    unfilledColor={COLORS.gray2}
                                    indeterminateAnimationDuration={2000}

                                />
                            </View>
                            <View>
                                <Text style={styles.temperature}>
                                    {`${item.max.toFixed()}°`}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </GenericCard>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SIZES.medium,
    },
    dayTemperatureItemContainer: {
        flexDirection: "row",
        gap: GAPS.gap1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: GAPS.gap4,
        //flex: 1,
    },
    dateColumn: {
        flex: 1,
        minWidth: 50,
        //width: "50%",
        //maxWidth: 100,
    },
    borderBottom: {
        borderBottomColor: COLORS.gray2,
        borderBottomWidth: 0.8,
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
    chartWrapper: {
        flex: 0,
        width: "30%"
    },
    weekDay: {
        fontWeight: "500",
        fontSize: FONT_SIZE.medium,
    },
    restOfDate: {
        color: COLORS.gray,
        fontSize: FONT_SIZE.small,
    },
    temperature: {
        fontSize: FONT_SIZE.small,
    },
    minMaxContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignContent: "center",
        alignItems: "center",
        gap: GAPS.gap1,
    }
})
export default WeeklyTemperaturesCardComponent
