import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {COLORS, SHADOWS, SIZES} from "../constatnts";
import {GAPS} from "../constatnts/theme";

type InfoCardType = {
    title: string
    thumbnail: string
    description: string
    isMain?: boolean
}

const HomePageInfoCards: React.FC = () => {

    const dmTechLogo = require("../assets/logo.png")
    const stationRepoPicture = require("../assets/station-repo-com.png")
    const weatherDataGraphPicture = require("../assets/weather-data-analysis-blue.png")

    const infoCards: InfoCardType[] = [
        {
            title: "Wetterdaten abrufen, analysieren und vergleichen",
            thumbnail: dmTechLogo,
            description: "Lorem ipsum dolor sit amet, consectetur adipisici elit, ist ein Blindtext, der nichts bedeuten soll",
            isMain: true,
        },
        {
            title: "Wetterdaten von mehreren Wetterstationen",
            thumbnail: stationRepoPicture,
            description: "Lorem ipsum dolor sit amet, consectetur adipisici elit, ist ein Blindtext, der nichts bedeuten soll",
        },
        {
            title: "Fortgeschrittene Analysen von Wetterdaten",
            thumbnail: weatherDataGraphPicture,
            description: "Lorem ipsum dolor sit amet, consectetur adipisici elit, ist ein Blindtext, der nichts bedeuten soll",
        },
    ]

    return (
        <View style={styles.infoCardListContainer}>
            {infoCards.map((cardData, index) =>
                <InfoCard
                    key={index}
                    {...cardData}
                />
            )}
        </View>
    )
}

const InfoCard: React.FC<InfoCardType> = (props: InfoCardType) => {

    return (
        <View style={{
            ...styles.infoCardContainer,
            backgroundColor: props.isMain ? COLORS.primary : COLORS.gray2,
        }}>
            <Text
                // @ts-ignore
                style={styles.cardTitle}
            >
                {props.title}
            </Text>
            <Image
                // @ts-ignore
                source={props.thumbnail}
                resizeMode="contain"
                style={styles.cardImage}
            />
            <Text
                // @ts-ignore
                style={styles.cardSubtitle}
            >
                {props.description}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    infoCardListContainer: {
        width: "100%",
        gap: GAPS.gap4,
    },
    infoCardContainer: {
        flex: 1,
        gap: GAPS.gap7,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "stretch",
        paddingTop: 30,
        paddingRight: 12,
        paddingBottom: 20,
        paddingLeft: 12,
        borderRadius: 15,
        height: (GAPS.gap10 * 6),
        shadowColor: COLORS.black,
        ...SHADOWS.medium,
    },
    cardTitle: {
        fontWeight: 600,
        fontSize: SIZES.xLarge,
        color: COLORS.white,
        textAlign: 'center',
        width: "90%",
    },
    cardImage: {
        justifyContent: "flex-start",
        width: 100,
        height: 100,
    },
    cardSubtitle: {
        fontWeight: 400,
        fontSize: SIZES.small,
        color: COLORS.white,
        textAlign: 'center',
        width: "95%",
    }
})

export default HomePageInfoCards
