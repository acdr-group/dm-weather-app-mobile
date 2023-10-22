import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {COLORS, FONT, SIZES} from "../../constatnts";

type Props = {
    title: string
    onLayout?: (event: unknown) => void
}

const PageTitleComponent: React.FC<Props> = (props: Props) => {
    return (
        <View onLayout={props.onLayout}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xxxLarge,
        color: COLORS.black,
    },
})

export default PageTitleComponent
