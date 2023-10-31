import React from 'react';
import {Station} from "../models/station";
import {useRouter} from "expo-router";
import GenericList, {ListItem} from "./shared/GenericList";

type Props = {
    stations: Station[]
}

const StationList: React.FC<Props> = (props: Props) => {

    const router = useRouter()

    const stationsToShow: ListItem[] = props.stations.map(s => {
        return {
            title: s.label,
            subtitle: s.country,
            icon: require("../assets/icons/arrow_forward_ios.png"),
            onPress: () => router.push(`/stations/${s.id}`)
        }
    })

    return (
        <GenericList
            listData={stationsToShow}
            emptyListMessage={"Keine Stationen gefunden"}
        />
    )
}

export default StationList
