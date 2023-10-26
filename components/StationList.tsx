import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, SIZES} from
        "../constatnts";
import {Station} from "../models/station";
import {useRouter} from "expo-router";

type Props = {
    stations: Station[]
}

const StationList: React.FC<Props> = (props: Props) => {

    if (props.stations.length === 0) {
        return <Text>Keine Stationen gefunden</Text>
    }

    return (
        <View style={styles.stationListContainer}>
            {props.stations.map((station, index, array) =>
                <StationItem
                    {...station}
                    key={station.name}
                    showBottomDivider={index !== array.length - 1}
                />
            )}
        </View>
    )
}

type PropsStationItem = Station & {
    showBottomDivider?: boolean
}

const StationItem: React.FC<PropsStationItem> = (props: PropsStationItem) => {

    const router = useRouter()
    const forwardIcon = require("../assets/icons/arrow_forward_ios.png")

    const handlePress = () => {
        router.push(`/stations/${props.id}`)
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[
            styles.stationItemContainer,
            (props.showBottomDivider ? styles.bottomBorder : null)
        ]}>
            <View>
                <Text style={styles.stationItemName}>
                    {props.label}
                </Text>
                <Text style={styles.stationItemDescription}>
                    {props.country}
                </Text>
            </View>
            <Image source={forwardIcon} style={styles.icon}/>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    stationListContainer: {
        flex: 1,
        borderColor: COLORS.gray2,
        borderWidth: 1,
        borderRadius: SIZES.small,
        paddingLeft: SIZES.medium,
        paddingVertical: 3,
    },
    stationItemContainer: {
        paddingVertical: 10,
        paddingRight: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray2,
    },
    stationItemName: {
        fontSize: 18,
    },
    stationItemDescription: {
        fontSize: 14,
        color: COLORS.gray,
    },
    icon: {
        height: 14,
        width: 14,
    }
})

export default StationList
