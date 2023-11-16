import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import useFetch from "../../hooks/useFetch";
import ErrorMessageComponent from "../../components/shared/ErrorMessageComponent";
import {Station} from "../../models/station";
import {COLORS, FONT_SIZE, GAPS} from "../../constatnts";
import PageWrapperComponent from "../../components/shared/PageWrapperComponent";
import {HourlyTemperature} from "../../models/hourlyTemperature";
import {SensorMeasurementWithTimestamps} from "../../models/sensorMeasurement";
import {SensorId} from "../../models/sensor";
import {useRouter} from "expo-router";
import {HourlyTemperatureList} from "../../components/station/HourlyTemperatureList";
import WeatherKeyValueCard from "../../components/station/WeatherKeyValueCard";
import DateTimePickerComponent from "../../components/shared/DateTimePickerComponent";

type Props = {}

const INITIAL_DATE = new Date("2022-09-01T00:00:00Z")

type WeatherKeyValue = {
    value: number
    max: number
    min: number
    units: string[]
    icon?: any
}

const StartComponent: React.FC<Props> = (props: Props) => {

    const [selectedDate, setSelectedDate] = useState<Date>(INITIAL_DATE)

    const {
        data,
        isLoading,
        error,
    } = useFetch<Station>(`stations/${process.env.EXPO_PUBLIC_DM_TECH_STATION_ID}`)

    const handleDateChange = (event: any, dateSelected: Date) => setSelectedDate(dateSelected)

    const icons = {
        calendarMonth: require("../../assets/icons/calendar_month.png"),
    }

    if (isLoading || data === undefined) return <ActivityIndicator size={"large"}/>

    if (error) return <ErrorMessageComponent reason={error.toString()}/>

    return (
        <ScrollView style={styles.mainScrollView}>
            <PageWrapperComponent>
                <View style={styles.stationHeaderContainer}>
                    <Text style={styles.stationLabel}>Karlsruhe</Text>
                    <Text style={styles.stationSubtitle}>dmTECH</Text>
                </View>
                <View style={styles.filterWrapper}>
                    <DateTimePickerComponent
                        testID="dateTimePicker-start-screen"
                        value={selectedDate}
                        icon={icons.calendarMonth}
                        //mode={"date"}
                        nativeID={"start-date"}
                        onChange={handleDateChange}
                    />
                </View>
                <WeatherKeyValueListComponent selectedDate={selectedDate}/>
            </PageWrapperComponent>
        </ScrollView>
    )
}

type PropsWeatherKeyValueList = {
    selectedDate: Date
}
const WeatherKeyValueListComponent: React.FC<PropsWeatherKeyValueList> = (props: PropsWeatherKeyValueList) => {

    const router =  useRouter()
    const { selectedDate } = props

    const readingsRequestOptions = {
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
    }

    const {
        data,
        isLoading,
        error,
        reFetch,
    } = useFetch<SensorMeasurementWithTimestamps>("readings", readingsRequestOptions)

    const icons = {
        cloudy: require("../../assets/icons/weather-stages/cloudy.png"),
        windSpeedAndDirection: require("../../assets/icons/air.png"),
        waterDrop: require("../../assets/icons/water_drop.png"),
        humidityPercentage: require("../../assets/icons/humidity_percentage.png"),
        airPressure: require("../../assets/icons/compress.png"),
        arrowUpward: require("../../assets/icons/arrow_upward.png"),
        arrowDownward: require("../../assets/icons/arrow_downward.png"),
    }

    // TODO: Make mapTimeLabelToValues a global helper function!
    const hourlyTemperatures: HourlyTemperature[] = useMemo<HourlyTemperature[]>(() => {
        if (data === undefined) return []
        return mapTimeLabelToValues(data.time, data.sensorMeasurements[0].values)
            .map(d => {
                return {
                    date: d.date,
                    icon: icons.cloudy,
                    temp: `${d.value.toFixed(0)}°`,
                }
            })
    }, [selectedDate, data])

    useEffect(() => {
        reFetch()
    }, [selectedDate])

    const getWindSpeedAndDirection = (): WeatherKeyValue => {
        const windSpeedMeasurement = data?.sensorMeasurements.find(m => m.id === SensorId.WIND_SPEED)
        const windDirectionMeasurement = data?.sensorMeasurements.find(m => m.id === SensorId.WIND_DIRECTION)
        return {
            value: windSpeedMeasurement.avg,
            max: windDirectionMeasurement.max,
            min: windDirectionMeasurement.min,
            units: [windSpeedMeasurement.unit, `${windDirectionMeasurement.avg} ${windDirectionMeasurement.unit}`],
        }
    }

    const getWeatherKeyValue = (sensorId: SensorId): WeatherKeyValue => {
        const measurement = data?.sensorMeasurements.find(m => m.id === sensorId)

        return {
            value: measurement.avg,
            max: measurement.max,
            min: measurement.min,
            units: [measurement.unit],
        }
    }

    if (isLoading || data === undefined) return <ActivityIndicator size="large"/>

    if (error) return <ErrorMessageComponent reason={error.toString()}/>

    return (
        <>
            <View style={styles.temperaturePreviewContainer}>
                <Text style={styles.previewAverageTemperature}>
                    {`${getWeatherKeyValue(SensorId.AIR_TEMPERATURE).value} ${getWeatherKeyValue(SensorId.AIR_TEMPERATURE).units.toString()}`}
                </Text>
                <View style={styles.minMaxTemperatureContainer}>
                    <View style={styles.minMaxTemperatureItem}>
                        <Image source={icons.arrowDownward} style={styles.iconSmall}/>
                        <Text>{`${getWeatherKeyValue(SensorId.AIR_TEMPERATURE).min} ${getWeatherKeyValue(SensorId.AIR_TEMPERATURE).units.toString()}`}</Text>
                    </View>
                    <View style={styles.minMaxTemperatureItem}>
                        <Image source={icons.arrowUpward} style={styles.iconSmall}/>
                        <Text>{`${getWeatherKeyValue(SensorId.AIR_TEMPERATURE).max} ${getWeatherKeyValue(SensorId.AIR_TEMPERATURE).units.toString()}`}</Text>
                    </View>
                </View>
            </View>

            <HourlyTemperatureList hourlyTemperatures={hourlyTemperatures}/>
            <View style={styles.itemListContainer}>
                <WeatherKeyValueCard
                    cardTitle={"Wind"}
                    value={getWindSpeedAndDirection().value}
                    units={getWindSpeedAndDirection().units}
                    cardIcon={icons.windSpeedAndDirection}
                />
                <WeatherKeyValueCard
                    cardTitle={"Niederschlag"}
                    value={getWeatherKeyValue(SensorId.PRECIPITATION_AMOUNT).value}
                    units={getWeatherKeyValue(SensorId.PRECIPITATION_AMOUNT).units}
                    cardIcon={icons.waterDrop}
                />
            </View>

            <View style={styles.itemListContainer}>
                <WeatherKeyValueCard
                    cardTitle={"Feutigkeit"}
                    value={getWeatherKeyValue(SensorId.AIR_HUMIDITY).value}
                    units={getWeatherKeyValue(SensorId.AIR_HUMIDITY).units}
                    cardIcon={icons.humidityPercentage}
                />
                <WeatherKeyValueCard
                    cardTitle={"Luftdruck"}
                    value={getWeatherKeyValue(SensorId.AIR_PRESSURE).value}
                    units={getWeatherKeyValue(SensorId.AIR_PRESSURE).units}
                    cardIcon={icons.airPressure}
                />
            </View>

            <Button
                title={"Zur detailierten Analyse"}
                onPress={() => router.push("/analysis")}
            />
        </>
    )
}

const mapTimeLabelToValues = (time: string[], values: number[]): {date: Date, value: number}[] => {
    const dates = time?.map(t => new Date(t))
    return dates
        ?.map((d, i) => {
            return {
                date: d,
                value: values[i]
            }
        })
        .filter(d => d.date.getMinutes() === 0)
}

const styles = StyleSheet.create({
    mainScrollView: {
        height: "100%",
    },
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
    temperaturePreviewContainer: {
        alignItems: "center",
        alignContent: "center",
    },
    minMaxTemperatureContainer: {
        flexDirection: "row",
        gap: GAPS.gap2,
    },
    minMaxTemperatureItem: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    previewAverageTemperature: {
        fontSize: (FONT_SIZE.xxxLarge * 1.5),
        fontWeight: "300",
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
    iconMedium: {
        width: 25,
        height: 25,
    },
    iconSmall: {
        width: 16,
        height: 16,
    }
})

export default StartComponent
