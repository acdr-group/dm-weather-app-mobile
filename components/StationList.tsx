import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {COLORS, GAPS} from "../constatnts/theme";
import {Station} from "../models/station";

type Props = {
    stations: Station[]
}

const StationList: React.FC<Props> = (props: Props) => {
    return (
        <View style={styles.stationListContainer}>
            {props.stations.map(station =>
                <StationItem
                    key={station.name}
                    {...station}
                />
            )}
        </View>
    )
}

type PropsStationItem = Station & {}

const StationItem: React.FC<PropsStationItem> = (props: PropsStationItem) => {
    return (
        <TouchableOpacity>
            <View style={styles.stationItemContainer}>
                <Text style={styles.stationItemName}>
                    {props.name}
                </Text>
                <Text style={styles.stationItemDescription}>
                    {props.label}
                </Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    stationListContainer: {
        flex: 1,
        gap: GAPS.gap3,
    },
    stationItemContainer: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    stationItemName: {
        fontSize: 18,
    },
    stationItemDescription: {
        fontSize: 14,
        color: COLORS.gray,
    },
})

export default StationList
