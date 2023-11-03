import React, {useMemo} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";
import PageWrapperComponent from "../../../components/shared/PageWrapperComponent";
import useFetch from "../../../hooks/useFetch";
import {Sensor} from "../../../models/sensor";
import ErrorMessageComponent from "../../../components/shared/ErrorMessageComponent";
import LineChartComponent, {ChartDataType} from "../../../components/shared/LineChartComponent";
import {SensorMeasurementWithTimestamps} from "../../../models/sensorMeasurement";
import {FONT_SIZE, GAPS} from "../../../constatnts";
import WeatherKeyValueCard from "../../../components/station/WeatherKeyValueCard";

type Props = {}
const SensorAnalysis: React.FC<Props> = (props: Props) => {

    const { id } = useLocalSearchParams<{id: string}>()

    const {
        data: sensor,
        isLoading,
        error,
    } = useFetch<Sensor>(`stations/${process.env.EXPO_PUBLIC_DM_TECH_STATION_ID}/sensors/${id}`)

    if (error) return <ErrorMessageComponent reason={error.toString()}/>

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerBackTitleVisible: true,
                    headerTitle: "",
                }}
            />
            {isLoading || sensor === undefined ?
                <ActivityIndicator size="large"/>
                :
                <ScrollView>
                    <PageWrapperComponent
                        title={sensor.name.replace("_", "-")}
                        size="medium"
                        description={`Beschreibung des Sensoren hier. Also was der Sensor misst, Einheit und was die Werte bedeuten. Diese Beschreibung sollte man auch ein- und ausblenden können.`}
                    >
                        <ChartAndKeyValuesComponent sensorId={id} />
                    </PageWrapperComponent>
                </ScrollView>
            }
        </SafeAreaView>
    )
}

type PropsChartAndKeyValues = {
    sensorId: string
}

const ChartAndKeyValuesComponent: React.FC<PropsChartAndKeyValues> = (props: PropsChartAndKeyValues) => {

    // TODO: Replace this date with the selected date from a datepicker!
    const startDate = "2022-07-30T22:00:00.000Z"
    const endDate = "2022-09-01T22:00:00.000Z"
    const readingsRequestOptions = {
        start: startDate,
        end: endDate,
        stations: process.env.EXPO_PUBLIC_DM_TECH_STATION_ID,
        sensors: props.sensorId,
    }

    const {
        data,
        isLoading,
        error,
    } = useFetch<SensorMeasurementWithTimestamps>("readings", readingsRequestOptions)

    const chartData = useMemo<ChartDataType[] | undefined>(() => {
        if (data === undefined) return undefined
        return mapTimeLabelToValues(data.time, data.sensorMeasurements[0].values).map(d => {
            return {
                value: d.value ?? 0,
                date: d.date.toLocaleString([], {day: "2-digit", month: "short", year: "2-digit"}),
            }
        })
    }, [data])

    const getSensorData = () => data.sensorMeasurements[0]

    const icons = {
        arrowUpward: require("../../../assets/icons/arrow_upward.png"),
        arrowDownward: require("../../../assets/icons/arrow_downward.png"),
        average: require("../../../assets/icons/functions.png")
    }

    if (error) return <ErrorMessageComponent reason={error.toString()}/>

    return (
        <>
            {isLoading || chartData === undefined ?
                <ActivityIndicator size="large"/> :
                <LineChartComponent
                    data={chartData}
                    unit={getSensorData().unit}
                />
            }

            <Text style={styles.sectionTitle}>Schlüsselindikatoren</Text>

            {isLoading || data === undefined ?
                <ActivityIndicator size="large"/> :
                <>
                    <View style={styles.keyValueListContainer}>
                        <WeatherKeyValueCard
                            cardTitle={"Min. Wert"}
                            value={getSensorData().min}
                            units={[getSensorData().unit]}
                            cardIcon={icons.arrowDownward}
                        />
                        <WeatherKeyValueCard
                            cardTitle={"Max. Wert"}
                            value={getSensorData().max}
                            units={[getSensorData().unit]}
                            cardIcon={icons.arrowUpward}
                        />
                    </View>
                    <View style={styles.keyValueListContainer}>
                        <WeatherKeyValueCard
                            cardTitle={"Durchschnitt"}
                            value={getSensorData().avg}
                            units={[getSensorData().unit]}
                            cardIcon={icons.average}
                        />
                    </View>
                </>
            }
        </>
    )
}

const mapTimeLabelToValues = (time: string[], values: number[]): {date: Date, value: number}[] => {
    const dates = time.map(t => new Date(t))
    return dates.map((d, i) => {
            return {
                date: d,
                value: values[i]
            }
        })
        // TODO: To filter data out and get dates with starting at 0 minutes. Do we really need this ?
    .filter(d => d.date.getMinutes() === 0)
}

const styles = StyleSheet.create({
    keyValueListContainer: {
        flex: 1,
        flexDirection: "row",
        gap: GAPS.gap4,
        justifyContent: "space-between",
        alignItems: "stretch",
    },
    sectionTitle: {
        fontSize: FONT_SIZE.large,
        fontWeight: "500",
    },
})

export default SensorAnalysis
