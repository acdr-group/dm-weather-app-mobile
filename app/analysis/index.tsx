import React, {useCallback, useMemo, useState} from 'react';
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView, StatusBar, StatusBarStyle,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {Stack, useRouter} from "expo-router";
import PageWrapperComponent from "../../components/shared/PageWrapperComponent";
import {PageTitle} from "../../context/PageContext";
import {COLORS, FONT_SIZE, GAPS, SIZES} from "../../constatnts";
import useFetch from "../../hooks/useFetch";
import ErrorMessageComponent from "../../components/shared/ErrorMessageComponent";
import {useApplicationContext} from "../../context/applicationContext";
import {Forecast} from "../../api/forecast";
import {ChartComponent, ChartDataSetType} from "../../components/ChartComponent";
import {Weather} from "../../api/weather";
import DropdownComponent from "../../components/shared/DropdownComponent";


enum Sensor {
    Temperatur = "Temperatur",
    Luftdruck = "Luftdruck",
    Luftfeuchtigkeit = "Luftfeuchtigkeit",
}

const Analysis: React.FC = () => {
    const statusBarStyle: StatusBarStyle = "light-content"
    const applicationContext = useApplicationContext()

    const [selectedSensor, setSelectedSensor] = useState<Sensor>(Sensor.Temperatur);

    const {
        data: forecast,
        isLoading,
        error,
    } = useFetch<Forecast>(applicationContext.getForecast())

    const resolveAttributNameOnWeatherObjectFromSensorName = (): string => {
        switch (selectedSensor) {
            case Sensor.Temperatur: return "temp";
            case Sensor.Luftdruck: return "pressure";
            case Sensor.Luftfeuchtigkeit: return "humidity";
            default: return "temp";
        }
    }

    const resolveUnitFromSensorName  = (): string => {
        switch (selectedSensor) {
            case Sensor.Temperatur: return "°C";
            case Sensor.Luftdruck: return "hPa";
            case Sensor.Luftfeuchtigkeit: return "%";
            default: return "°C";
        }
    }

    const handleSensorChange = (value: string) => {
        setSelectedSensor(value as Sensor)
    }

    const resolveChartData = useCallback((): ChartDataSetType[] => {
        const propertyName = resolveAttributNameOnWeatherObjectFromSensorName()
        return forecast === undefined ? [] : forecast.weatherList.map(w => {
            return {
                x: w.dateTime.toLocaleDateString("de-DE", {day: "2-digit", month: "short", year: "2-digit"}),
                // @ts-ignore
                y: w[propertyName]
            }
        })
    }, [forecast, selectedSensor])

    const extractDatesFromWeatherList = useCallback((): Weather[] => {
        return forecast?.weatherList.reduce((acc: Weather[], curr: Weather) =>
                (acc as Weather[])
                    .find(w => w.dateTime.getDate() === curr.dateTime.getDate()) ?
                    acc : [...acc, curr]
            , [])
    }, [forecast]);

    const sensorValues = useMemo(() => extractDatesFromWeatherList(), [forecast]);

    if (error) return <ErrorMessageComponent reason={error.toString()}/>

    return (
        <SafeAreaView>
            <StatusBar
                barStyle={statusBarStyle}
            />
            <Stack.Screen
                options={{
                    headerTitle: PageTitle.ANALYSIS_PAGE_TITLE,
                    headerShown: true,
                    headerTitleStyle: { color: COLORS.white },
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTitleAlign: "center",
                    headerTintColor: COLORS.white,
                    headerBackTitleVisible: true,
                    headerTransparent: false,
                    headerShadowVisible: false,
                    headerBackVisible: true,
                }}
            />
            <ScrollView>
                <PageWrapperComponent
                    description={"Sensor"}
                >
                    {isLoading ? <ActivityIndicator size="large"/> :
                        error ? <ErrorMessageComponent reason={error.toString()}/> :
                           <>
                               <View style={{ marginTop: -10, marginBottom: 30 }}>
                                   <DropdownComponent
                                       options={Object.values(Sensor)}
                                       onSelect={handleSensorChange}
                                       selectedValue={selectedSensor}
                                   />
                               </View>
                               <View>
                                   <Text style={styles.chartTitle}>
                                       {selectedSensor} in den nächten {sensorValues.length} Tagen
                                   </Text>
                                   <Text style={styles.unit}>
                                       Einheit in {resolveUnitFromSensorName()}
                                   </Text>
                               </View>
                               <ChartComponent
                                   dataSet={resolveChartData()}
                                   horizontalAxisLabel={"Zeitspanne"}
                                   verticalAxisLabel={selectedSensor}
                                   chartTitle={selectedSensor}
                                   unit={resolveUnitFromSensorName()}
                               />
                           </>
                    }
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
    },
    chartTitle: {
        fontSize: FONT_SIZE.large,
        fontWeight: "600",
    },
    unit: {
        color: COLORS.primary,
        fontSize: FONT_SIZE.medium,
    }
})

export default Analysis
