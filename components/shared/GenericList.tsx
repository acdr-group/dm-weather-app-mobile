import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, SIZES} from "../../constatnts";
import {FONT_SIZE, GAPS} from "../../constatnts/theme";

export interface ListItem {
    title: string
    subtitle?: string
    icon?: any
    leftSideText?: string
    onPress?: () => void
}
type Props = {
    listData: ListItem[]
    emptyListMessage?: string
}

const GenericList: React.FC<Props> = (props: Props) => {

    if (props.listData.length === 0) {
        return <Text>{props.emptyListMessage ?? "Keine Daten gefunden!"}</Text>
    }

    return (
        <View style={styles.listContainer}>
            {props.listData.map((data, index, array) =>
                <ListItem
                    {...data}
                    key={`${data.title} ${data.subtitle}`}
                    showBottomDivider={index !== array.length - 1}
                />
            )}
        </View>
    )
}

type PropsListItem = ListItem & {
    showBottomDivider?: boolean
}

const ListItem: React.FC<PropsListItem> = (props: PropsListItem) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[
                styles.listItemContainer,
                (props.showBottomDivider ? styles.bottomBorder : null)
            ]}>
            <View>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                {props.subtitle ?
                    <Text style={styles.subtitle}>
                        {props.subtitle}
                    </Text>
                    : null
                }
            </View>
            <View style={styles.leftSideOfList}>
                {props.leftSideText ?
                    <Text style={styles.leftSideText}>{props.leftSideText}</Text> : null
                }
                {props.icon ?
                    <Image source={props.icon} style={styles.icon}/> : null
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
        listContainer: {
            flex: 1,
            borderColor: COLORS.gray2,
            borderWidth: 1,
            borderRadius: SIZES.small,
            paddingVertical: 3,
        },
        listItemContainer: {
            paddingVertical: SIZES.medium,
            paddingHorizontal: SIZES.xxSmall,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        bottomBorder: {
            borderBottomWidth: 1,
            borderBottomColor: COLORS.gray2,
        },
        title: {
            fontSize: FONT_SIZE.medium,
            paddingLeft: SIZES.xSmall,
        },
        subtitle: {
            fontSize: FONT_SIZE.xSmall,
            color: COLORS.gray,
        },
        leftSideOfList: {
            flexDirection: "row",
            gap: GAPS.gap2,
            paddingRight: SIZES.xSmall,
    },
    leftSideText: {
    fontSize: FONT_SIZE.medium,
        color: COLORS.gray,
},
icon: {
    height: SIZES.small,
        width: SIZES.small,
}
})

export default GenericList
