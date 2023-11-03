import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {COLORS, GAPS, SIZES} from "../../constatnts";

type Props = {
    title: string
    description?: string
    size?: "medium" | "large"
}

const PageTitleSectionComponent: React.FC<Props> = (props: Props) => {
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={
                    props.size === "medium" ?
                        styles.titleMedium : styles.titleLarge
                }
            >
                {props.title}
            </Text>
            {props.description ?
                <Text style={styles.description}>
                    {props.description}
                </Text> : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        gap: GAPS.gap1,
    },
    titleLarge: {
        fontWeight: "600",
        fontSize: SIZES.xxxLarge,
        color: COLORS.black,
    },
    titleMedium: {
        fontWeight: "600",
        fontSize: SIZES.xLarge,
        color: COLORS.black,
    },
    description: {
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
})

export default PageTitleSectionComponent
