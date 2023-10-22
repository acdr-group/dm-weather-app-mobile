import React from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text} from "react-native";
import {Stack} from "expo-router";
import PageWrapperComponent from "../../components/shared/PageWrapperComponent";
import {PageTitle} from "../../context/PageContext";
import useFetch from "../../hooks/useFetch";
import StationList from "../../components/StationList";
import {Station} from "../../models/station";

type Props = {

}
const Stationen: React.FC<Props> = (props: Props) => {

    const {data: rawData, isLoading, error} = useFetch<{stations: Station[]}>("stations")

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                }}
            />
            <ScrollView>
                <PageWrapperComponent title={PageTitle.STATIONS_PAGE_TITLE}>
                    <Text>
                        Vielleicht eine große Karte hier für die Station Heidelberg mit ein paar Infos drauf.
                    </Text>
                    <Text>
                        Raissa auch fragen, ob alle Wetterstationen hier einsehbar sein dürfen oder muss noch die von DM.
                    </Text>
                    {isLoading || rawData === undefined ?
                        <ActivityIndicator size="large"/> :
                        <StationList stations={rawData.stations}/>
                    }
                    {error ?
                        <Text>An error occured when loading te data: {error.toString()}</Text> :
                        null
                    }
                </PageWrapperComponent>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Stationen
