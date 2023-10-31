import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import useFetch from "../../../hooks/useFetch";
import ErrorMessageComponent from "../../../components/shared/ErrorMessageComponent";
import {Station} from "../../../models/station";
import {COLORS, FONT_SIZE, GAPS, SIZES} from "../../../constatnts/theme";
import PageWrapperComponent from "../../../components/shared/PageWrapperComponent";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {HourlyTemperature} from "../../../models/hourlyTemperature";
import {HourlyTemperatureList} from "../../../components/station/HourlyTemperatureList";
import WeatherKeyValueCard from "../../../components/station/WeatherKeyValueCard";
import {SensorMeasurementWithTimestamps} from "../../../models/sensorMeasurement";
import {SensorId} from "../../../models/sensor";

type Props = {}

const INITIAL_DATE = new Date("2022-09-01T00:00:00Z")

type WeatherKeyValue = {
    value: number
    units: string[]
    icon?: any
}

const StationItem: React.FC<Props> = (props: Props) => {

    const [selectedDate, setSelectedDate] = useState<Date>(INITIAL_DATE)

    const {
        data: station,
        isLoading: stationIsLoading,
        error: stationError,
    } = useFetch<Station>(`stations/${process.env.EXPO_PUBLIC_DM_TECH_STATION_ID}`)

    const {
        data: sensorMeasurementWithTimestamps,
        isLoading: sensorMeasurementWithTimestampsIsLoading,
        error: sensorMeasurementWithTimestampsError,
        reFetch: reloadSensorMeasurementWithTimestamps,
    } = useFetch<SensorMeasurementWithTimestamps>("readings", {
        start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 2, 0).toISOString(),
        end: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 25, 0).toISOString(),
        stations: process.env.EXPO_PUBLIC_DM_TECH_STATION_ID,
        sensors: `
            ${SensorId.AIR_TEMPERATURE},
            ${SensorId.WIND_SPEED},
            ${SensorId.WIND_DIRECTION},
            ${SensorId.PRECIPITATION_AMOUNT},
            ${SensorId.AIR_HUMIDITY},
            ${SensorId.AIR_PRESSURE}
        `,
    })

    useEffect(() => {
        reloadSensorMeasurementWithTimestamps()
        console.log("selected date", selectedDate)
    }, [selectedDate])

    const onDateChange = (event: any, dateSelected: Date) => setSelectedDate(dateSelected)

    const hourlyTemperatures: HourlyTemperature[] = mapTimeLabelToValues(
        sensorMeasurementWithTimestamps?.time,
        sensorMeasurementWithTimestamps?.sensorMeasurements[0].values
    )
        ?.map(d => {
            return {
                date: d.date,
                icon: require("../../../assets/icons/weather-stages/cloudy.png"),
                temp: `${d.value.toFixed(0)}°`,
            }
        })

    const calenderIcon = require("../../../assets/icons/calendar_month.png")

    const getWindSpeedAndDirection = (): WeatherKeyValue => {
        const windSpeedMeasurement = sensorMeasurementWithTimestamps
            ?.sensorMeasurements.find(m => m.id === SensorId.WIND_SPEED)

        const windDirectionMeasurement = sensorMeasurementWithTimestamps
            ?.sensorMeasurements.find(m => m.id === SensorId.WIND_DIRECTION)

        return {
            value: windSpeedMeasurement.avg,
            units: [windSpeedMeasurement.unit, `${windDirectionMeasurement.avg} ${windDirectionMeasurement.unit}`],
        }
    }

    const getWeatherKeyValue = (sensorId: SensorId): WeatherKeyValue => {
        const measurement = sensorMeasurementWithTimestamps
            ?.sensorMeasurements.find(m => m.id === sensorId)

        return {
            value: measurement.avg,
            units: [measurement.unit],
        }
    }

    if (stationIsLoading ||
        sensorMeasurementWithTimestampsIsLoading ||
        station === undefined
    ) return <ActivityIndicator size={"large"}/>

    if (stationError ||
        sensorMeasurementWithTimestampsError
    ) return <ErrorMessageComponent reason={(stationError ?? sensorMeasurementWithTimestampsError).toString()}/>

    return (
        <ScrollView style={{ height: "100%" }}>
            <PageWrapperComponent>
                <View style={styles.stationHeaderContainer}>
                    <Text style={styles.stationLabel}>Karlsruhe</Text>
                    <Text style={styles.stationSubtitle}>dmTECH</Text>
                </View>
                <View style={styles.filterWrapper}>
                    <View style={styles.filterContainer}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: COLORS.gray2,
                            borderRadius: SIZES.xxSmall,
                            padding: SIZES.xxxSmall,
                            paddingLeft: SIZES.xSmall,
                            justifyContent: "space-between",
                        }}>
                            <Image source={calenderIcon} style={styles.icon}/>
                            <RNDateTimePicker
                                testID="dateTimePicker"
                                value={selectedDate}
                                mode={"date"}
                                nativeID={"start-date"}
                                onChange={onDateChange}
                            />
                        </View>
                    </View>
                </View>
                <HourlyTemperatureList hourlyTemperatures={hourlyTemperatures}/>
                <View style={styles.itemListContainer}>
                    <WeatherKeyValueCard
                        cardTitle={"Wind"}
                        value={getWindSpeedAndDirection().value}
                        units={getWindSpeedAndDirection().units}
                        cardIcon={require("../../../assets/icons/air.png")}
                    />
                    <WeatherKeyValueCard
                        cardTitle={"Niederschlag"}
                        value={getWeatherKeyValue(SensorId.PRECIPITATION_AMOUNT).value}
                        units={getWeatherKeyValue(SensorId.PRECIPITATION_AMOUNT).units}
                        cardIcon={require("../../../assets/icons/water_drop.png")}
                    />
                </View>

                <View style={styles.itemListContainer}>
                    <WeatherKeyValueCard
                        cardTitle={"Feutigkeit"}
                        value={getWeatherKeyValue(SensorId.AIR_HUMIDITY).value}
                        units={getWeatherKeyValue(SensorId.AIR_HUMIDITY).units}
                        cardIcon={require("../../../assets/icons/humidity_percentage.png")}
                    />
                    <WeatherKeyValueCard
                        cardTitle={"Luftdruck"}
                        value={getWeatherKeyValue(SensorId.AIR_PRESSURE).value}
                        units={getWeatherKeyValue(SensorId.AIR_PRESSURE).units}
                        cardIcon={require("../../../assets/icons/compress.png")}
                    />
                </View>
            </PageWrapperComponent>
        </ScrollView>
    )
}

const mapTimeLabelToValues = (time: string[], values: number[]): {date: Date, value: number}[] => {
    const dates = time?.map(t => new Date(t))
    return dates
        ?.map((d, i) => ({date: d, value: values[i]}))
        .filter(d => d.date.getMinutes() === 0)
}

const styles = StyleSheet.create({
    stationHeaderContainer: {
        alignItems: 'center',
        alignContent: 'center',
    },
    stationLabel: {
        fontSize: FONT_SIZE.xxxLarge,
        fontWeight: "500",
    },
    stationSubtitle: {
        fontSize: FONT_SIZE.small,
        color: COLORS.gray,
        fontWeight: "600",
    },
    filterWrapper: {
        flexDirection: "row",
        justifyContent: "center",
    },
    filterContainer: {
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        rowGap: GAPS.gap1,
    },
    filterItemLael: {
        fontSize: FONT_SIZE.small,
        textAlign: "center",
    },
    itemListContainer: {
        flex: 1,
        flexDirection: "row",
        gap: GAPS.gap4,
        justifyContent: "space-between",
        alignItems: "stretch",
    },
    icon: {
        width: 25,
        height: 25,
    }
})

export default StationItem
