import React from 'react';
import {ActivityIndicator, Text} from "react-native";
import {useLocalSearchParams} from "expo-router";
import PageWrapperComponent from "../../../components/shared/PageWrapperComponent";
import useFetch from "../../../hooks/useFetch";
import ErrorMessageComponent from "../../../components/shared/ErrorMessageComponent";
import {Station} from "../../../models/station";

type Props = {

}

const StationItem: React.FC<Props> = (props: Props) => {

  const {id: stationId} = useLocalSearchParams<{id: string}>()
  const {data: station, isLoading, error} = useFetch<Station>(`stations/${stationId}`)

  if (isLoading || station === undefined) return <ActivityIndicator size={"large"}/>

  if (error) return <ErrorMessageComponent reason={error.toString()} />

  return (
      <PageWrapperComponent title={station.name}>
        <Text>Id: {stationId}</Text>
      </PageWrapperComponent>
  )
}

export default StationItem
