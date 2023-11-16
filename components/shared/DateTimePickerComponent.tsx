import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constatnts";
import RNDateTimePicker, {BaseProps as DateTimeBaseProps} from "@react-native-community/datetimepicker";

type Props = DateTimeBaseProps & {
    icon?: any
    label?: string
}
const DateTimePickerComponent: React.FC<Props> = (props: Props) => {

    const {
        icon,
        label,
        ...datePickerProps
    } = props

    return (
        <View style={styles.datePickerContainer}>
            {props.icon ?
                <Image
                    source={icon}
                    style={styles.iconMedium}
                /> :
                <Text>
                    {label}
                </Text>
            }
            <RNDateTimePicker {...datePickerProps}/>
        </View>
    )
}

const styles = StyleSheet.create({
    datePickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.gray2,
        borderRadius: SIZES.xxSmall,
        padding: SIZES.xxxSmall,
        paddingLeft: SIZES.xSmall,
        justifyContent: "space-between",
    },
    iconMedium: {
        width: 25,
        height: 25,
    },
})

export default DateTimePickerComponent
