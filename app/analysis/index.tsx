import React from 'react';
import {SafeAreaView, ScrollView, Text} from "react-native";
import {Stack} from "expo-router";
import PageWrapperComponent from "../../components/shared/PageWrapperComponent";
import {PageTitle} from "../../context/PageContext";

type Props = {

}
const Analysis: React.FC<Props> = (props: Props) => {
  return (
    <SafeAreaView>
        <Stack.Screen
            options={{
                headerTransparent: true,
            }}
        />
        <ScrollView>
            <PageWrapperComponent title={PageTitle.ANALYSIS_PAGE_TITLE}>
                <Text>
                    Hier kommen all unsere Charts, Grafiken, also die Wetterdaten-Analysen
                </Text>
            </PageWrapperComponent>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Analysis
