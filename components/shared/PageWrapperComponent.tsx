import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from "react-native";
import PageTitleSectionComponent from "./PageTitleSectionComponent";
import {GAPS, SIZES} from "../../constatnts";

type Props = PropsWithChildren & {
    title?: string
    description?: string
    size?: "medium" | "large"
}

const PageWrapperComponent: React.FC<Props> = (props: Props) => {
    return (
        <View style={styles.pageContentContainer}>
            {props.title ?
                <PageTitleSectionComponent
                    title={props.title}
                    size={props.size}
                    description={props.description}
                /> : null
            }
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
