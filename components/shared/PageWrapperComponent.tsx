import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from "react-native";
import PageTitleSectionComponent from "./PageTitleSectionComponent";
import {GAPS, SIZES} from "../../constatnts";

type Props = PropsWithChildren & {
    title?: string
    description?: string
    size?: "medium" | "large"
}

/**
 * Page Wrapper Component
 * @param {Object} props - The props object for the component
 * @returns {ReactElement} - The JSX element representing the Page Wrapper Component
 * @example
 * <PageWrapperComponent
 *    title="Page Title"
 *    size="large"
 *    description="Page Description"
 * >
 *   {/* Content */
const PageWrapperComponent: React.FC<Props> = (props: Props) => {
    return (
        <View style={styles.pageContentContainer}>
            <PageTitleSectionComponent
                title={props.title}
                size={props.size}
                description={props.description}
            />
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    pageContentContainer: {
        padding: SIZES.small,
        rowGap: GAPS.gap4,
    }
})

export default PageWrapperComponent
