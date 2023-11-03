import React, {useMemo} from 'react';
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Stack, useRouter} from "expo-router";
import PageWrapperComponent from "../../components/shared/PageWrapperComponent";
import {PageTitle} from "../../context/PageContext";
import {ListItem} from "../../components/shared/GenericList";
import {COLORS, FONT_SIZE, GAPS, SIZES} from "../../constatnts";
import useFetch from "../../hooks/useFetch";
import {SensorListResponse, SensorName} from "../../models/sensor";
import ErrorMessageComponent from "../../components/shared/ErrorMessageComponent";

type Props = {}
const Analysis: React.FC<Props> = (props: Props) => {

    const {
        data: sensorsResponse,
        isLoading,
        error,
    } = useFetch<SensorListResponse>(`stations/${process.env.EXPO_PUBLIC_DM_TECH_STATION_ID}/sensors`)

    const router = useRouter()

    const resolveSensorIcon = (sensorName: SensorName): any => {
        switch (sensorName) {
            case SensorName.AIR_TEMPERATURE: return require("../../assets/icons/thermometer.png")
            case SensorName.AIR_HUMIDITY: return require("../../assets/icons/humidity_percentage.png")
            case SensorName.PRECIPITATION_AMOUNT: return require("../../assets/icons/water_drop.png")
            case SensorName.WIND_SPEED: return require("../../assets/icons/air.png")
            case SensorName.WIND_DIRECTION: return require("../../assets/icons/explore.png")
            case SensorName.AIR_PRESSURE: return require("../../assets/icons/compress.png")
            default: return require("../../assets/icons/analysis.png")
        }
    }

    const analysisCategories = useMemo<ListItem[] | undefined>(() => {
        if (sensorsResponse === undefined) return undefined
        return sensorsResponse.sensors.map(s => {
            const sensorName = s.name.replace("_", "-")
            return {
                title: sensorName,
                icon: resolveSensorIcon(sensorName as SensorName),
                onPress: () => router.push(`/sensors/${s.id}`)
            }
        })
    }, [sensorsResponse])

    if (error) return <ErrorMessageComponent reason={error.toString()}/>

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerShown: false,
                    headerTransparent: true,
                }}
            />
            <ScrollView>
                <PageWrapperComponent
                    title={PageTitle.ANALYSIS_PAGE_TITLE}
                    description={"Wähle einen Sensor, um loszulegen"}
                >
                    {isLoading || sensorsResponse === undefined ?
                        <ActivityIndicator size="large"/> :
                        <SensorListComponent sensorList={analysisCategories}/>
                    }
                </PageWrapperComponent>
            </ScrollView>
        </SafeAreaView>
    )
}

type PropsSensorList = {
    sensorList: ListItem[]
}
const SensorListComponent: React.FC<PropsSensorList> = (props: PropsSensorList) => {
    return (
        <View style={styles.listContainer}>
            {props.sensorList?.map(c =>
                <TouchableOpacity key={c.title} onPress={c.onPress}>
                    <View style={styles.listItemContent}>
                        <Image source={c.icon} style={styles.icon}/>
                        <Text style={styles.itemTitle}>
                            {c.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
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
    }
})

export default Analysis
