import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from "react-native";
import PageTitleComponent from "./PageTitleComponent";

type Props = PropsWithChildren & {
    title?: string
}

const PageWrapperComponent: React.FC<Props> = (props: Props) => {
    return (
        <View style={styles.pageContentContainer}>
            {props.title ? <PageTitleComponent title={props.title}/> : null}
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    pageContentContainer: {
        padding: 14,
        rowGap: 20
    }
})

export default PageWrapperComponent
