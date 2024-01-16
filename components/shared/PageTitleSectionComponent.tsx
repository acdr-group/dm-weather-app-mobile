import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {COLORS, GAPS, SIZES} from "../../constatnts";

type Props = {
    title?: string
    description?: string
    size?: "medium" | "large"
}

/**
 * PageTitleSectionComponent is a functional component that renders a title section with an optional description.
 *
 * @param {Object} props - The component props
 * @param {string} props.title - The title to be displayed
 * @param {string} [props.description] - The optional description to be displayed
 * @param {string} props.size - The size of the title (`"medium"` or `"large"`)
 *
 * @returns {JSX.Element} The rendered title section component
 */
const PageTitleSectionComponent: React.FC<Props> = (props: Props) => {
    return (
        <View style={styles.sectionContainer}>
            {
                props.title ?
                    <Text
                        style={
                            props.size === "medium" ?
                                styles.titleMedium : styles.titleLarge
                        }
                    >
                        {props.title}
                    </Text> : null
            }
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
