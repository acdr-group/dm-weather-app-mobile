import {
    ActivityIndicator,
    Button,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StatusBarStyle,
    StyleSheet,
    Text,
    View
} from "react-native"
import {Stack, useRouter} from "expo-router";
import {COLORS, FONT_SIZE, GAPS} from "../constatnts";
import React from "react";
import {CompanyLogoComponent} from "../components/shared/CompanyLogoComponent";
import PageWrapperComponent from "../components/shared/PageWrapperComponent";
import {Weather} from "../api/weather";
import {Forecast} from "../api/forecast";
import {HourlyTemperatureList} from "../components/station/HourlyTemperatureList";
import WeatherKeyValueCard from "../components/station/WeatherKeyValueCard";
import WeeklyTemperaturesCardComponent from "../components/WeeklyTemperaturesCardComponent";
import {useApplicationContext} from "../context/applicationContext";
import useFetch from "../hooks/useFetch";
import ErrorMessageComponent from "../components/shared/ErrorMessageComponent";
import {PageTitle} from "../context/PageContext";
import {SuggestionComponent} from "../components/SuggestionComponent";
import {Platform} from "react-native";

const Home: React.FC = () => {

    const statusBarStyle: StatusBarStyle = "light-content"

    const applicationContext = useApplicationContext()

    const {
        data: weather,
        isLoading: isWeatherDataLoading,
        error: errorOnLoadingWeatherData,
    } = useFetch<Weather>(applicationContext.getWeather())

    const {
        data: forecast,
        isLoading: isForecastDataLoading,
        error: errorOnLoadingForecastData,
    } = useFetch<Forecast>(applicationContext.getForecast())

    if (isWeatherDataLoading) return <ActivityIndicator size={"large"}/>

    if (isForecastDataLoading) return <ActivityIndicator size={"large"}/>

    if (errorOnLoadingWeatherData) return <ErrorMessageComponent reason={errorOnLoadingWeatherData.toString()}/>

    if (errorOnLoadingForecastData) return <ErrorMessageComponent reason={errorOnLoadingForecastData.toString()}/>

    return (
        <SafeAreaView style={styles.pageContainer}>
            <StatusBar
                barStyle={statusBarStyle}
            />
            <Stack.Screen
                options={{
                    headerTitle: PageTitle.START_PAGE_TITLE,
                    headerTitleStyle: { color: COLORS.white },
                    headerStyle: {backgroundColor: COLORS.primary},
                    headerTransparent: false,
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => <CompanyLogoComponent/>,
                }}
            />
            <ScrollView style={{...styles.mainScrollView}}>
                <PageWrapperComponent>
                    <View style={styles.stationHeaderContainer}>
                        <Text style={styles.stationLabel}>Karlsruhe</Text>
                        <Text style={styles.stationSubtitle}>dmTECH</Text>
                    </View>
                    <WeatherKeyValueListComponent weather={weather} forecast={forecast} />
                </PageWrapperComponent>
            </ScrollView>
        </SafeAreaView>
    )
}


type PropsWeatherKeyValueList = {
    weather: Weather
    forecast: Forecast
}
const WeatherKeyValueListComponent: React.FC<PropsWeatherKeyValueList> = (props: PropsWeatherKeyValueList) => {

    const router =  useRouter()
    const { weather, forecast } = props

    const icons = {
        cloudOutlined: require("../assets/icons/weather-stages/cloud_outlined.png"),
        windSpeedAndDirection: require("../assets/icons/air.png"),
        waterDrop: require("../assets/icons/water_drop.png"),
        waterDropOutlined: require("../assets/icons/water_drop_outlined.png"),
        humidityPercentage: require("../assets/icons/humidity_percentage.png"),
        airPressure: require("../assets/icons/compress.png"),
        arrowUpward: require("../assets/icons/arrow_upward.png"),
        arrowDownward: require("../assets/icons/arrow_downward.png"),
    }

    const getWeatherOfCurrentDayFromForecast = (): Weather[] => {
        return forecast.weatherList
            .filter(wl => wl.dateTime.getDate() === new Date().getDate() ||
                wl.dateTime.getDate() === new Date().getDate() + 1
            ).slice(0, 10)
    }

    return (
        <>
            <View style={styles.temperaturePreviewContainer}>
                <View style={styles.temperatureAndDescriptionContainer}>
                    <Text style={styles.previewAverageTemperature}>
                        {`${weather.temp.toFixed()}°`}
                    </Text>
                    <Text style={styles.weatherDescription}>
                        {weather.description}
                    </Text>
                </View>
                <View style={styles.overviewValueListContainer}>
                    <View style={styles.overviewValueItem}>
                        <Image source={icons.airPressure} style={styles.iconSmall}/>
                        <Text style={styles.overviewIndicatorText}>
                            {`${weather.pressure.toString()}hPa`}
                        </Text>
                    </View>
                    <View style={styles.overviewValueItem}>
                        <Image source={icons.waterDropOutlined} style={styles.iconSmall}/>
                        <Text style={styles.overviewIndicatorText}>
                            {`${weather.humidity.toString()}%`}
                        </Text>
                    </View>
                    <View style={styles.overviewValueItem}>
                        <Image source={icons.windSpeedAndDirection} style={styles.iconSmall}/>
                        <Text style={styles.overviewIndicatorText}>
                            {`${weather.windSpeed.toString()}m/s`}
                        </Text>
                    </View>
                </View>
            </View>
            <HourlyTemperatureList weatherList={getWeatherOfCurrentDayFromForecast()}/>
            <View style={styles.itemListContainer}>
                <WeatherKeyValueCard
                    cardTitle={"Gefühlt"}
                    value={Number(weather.feelsLike.toFixed())}
                    unit={"°"}
                    orientation="horizontal"
                />
                <WeatherKeyValueCard
                    cardTitle={"Höchste Temp."}
                    value={Number(weather.tempMax.toFixed())}
                    unit={"°"}
                    orientation="horizontal"
                />
                <WeatherKeyValueCard
                    cardTitle={"Niedrigste Temp."}
                    value={Number(weather.tempMin.toFixed())}
                    unit={"°"}
                    orientation="horizontal"
                />
            </View>
            <SuggestionComponent weatherIcon={weather.icon}/>
            <WeeklyTemperaturesCardComponent forecast={forecast}/>
            <Button
                title={"Zur detaillierten Analyse"}
                onPress={() => router.push("/analysis")}
                color={COLORS.primary}
            />
        </>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    mainScrollView: {
        height: "100%",
        marginTop: Platform.OS === "android" ? 20 : 0,
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
        gap: GAPS.gap3,
        alignItems: "center",
        alignContent: "center",
    },
    overviewValueListContainer: {
        flexDirection: "row",
        gap: GAPS.gap5,
    },
    overviewValueItem: {
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        gap: 3,
    },
    overviewIndicatorText: {
        fontWeight: "500",
        fontSize: FONT_SIZE.small,
    },
    temperatureAndDescriptionContainer: {},
    previewAverageTemperature: {
        fontSize: (FONT_SIZE.xxxLarge * 2),
        fontWeight: "300",
        textAlign: "center",
    },
    weatherDescription: {
        fontSize: FONT_SIZE.xxxLarge,
        fontWeight: "300",
        textAlign: "center",
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
    },
})

export default Home;
