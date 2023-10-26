import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, Text} from "react-native";
import {Stack} from "expo-router";
import PageWrapperComponent from "../../components/shared/PageWrapperComponent";
import {PageTitle} from "../../context/PageContext";
import useFetch from "../../hooks/useFetch";
import StationList from "../../components/StationList";
import {Station} from "../../models/station";
import SearchTextInput from "../../components/shared/SearchTextInput";
import ErrorMessageComponent from "../../components/shared/ErrorMessageComponent";

type Props = {}
const Stationen: React.FC<Props> = (props: Props) => {

    const {
        data: rawData,
        isLoading,
        error,
    } = useFetch<{stations: Station[]}>("stations")

    const [stationsToShow, setStationsToShow] = useState<Station[] | undefined>(undefined)

    useEffect(() => {
        setStationsToShow(rawData?.stations)
    }, [rawData])

    const filterStations = (query: string) => {
        const stations = rawData?.stations.filter(s => {
            return s.name.toLowerCase().includes(query.toLowerCase())
        })
        setStationsToShow(stations)
    }

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerBackVisible: false,
                    headerTransparent: true,
                }}
            />
            <ScrollView>
                <PageWrapperComponent title={PageTitle.STATIONS_PAGE_TITLE}>
                    <SearchTextInput onChangeText={filterStations}/>
                    {isLoading || stationsToShow === undefined ?
                        <ActivityIndicator size="large"/> :
                        <StationList stations={stationsToShow}/>
                    }
                    {error ? <ErrorMessageComponent reason={error.toString()}/> : null}
                </PageWrapperComponent>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Stationen
