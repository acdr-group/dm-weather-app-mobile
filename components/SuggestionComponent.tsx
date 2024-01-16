import React, {useState, useEffect} from "react"
import GenericCard from "./station/GenericCard";
import {Image, Text, View} from "react-native";
import {COLORS, SIZES} from "../constatnts";
import { Asset } from "expo-asset";

type Suggestion = {
    iconSource: any
    message: string
}
type Props = {
    weatherIcon: string
}

/**
 * A React functional component that displays suggestions based on a weather icon.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.weatherIcon - The weather icon to determine the suggestion.
 * @returns {JSX.Element} The rendered component.
 */
export const SuggestionComponent: React.FC<Props> = (props: Props) => {
    const { weatherIcon } = props
    const [ready, setReady] = useState<boolean>(false);
    const [image, setImage] = useState<Asset>(null);

    const loadIconAsync = async (iconSource: string) => {
        const image = Asset.fromModule(iconSource);
        await image.downloadAsync();
        setImage(image);
        setReady(true);
    }

    const renderIcon = (iconSource: string) => {
        loadIconAsync(iconSource);
        return (
            <Image
                source={{ uri: image.localUri || image.uri }}
                alt={"Vorschlag-Bild"}
                width={20}
                height={20}
                resizeMode="cover"
                resizeMethod="scale"
            />
        )
    }

    const icons = {
        sunny: "../assets/icons/suggestions/wb_sunny.png",
        security: "../assets/icons/suggestions/security.png",
        beachAccess: "../assets/icons/suggestions/beach_access.png",
        checkRoom: "../assets/icons/suggestions/checkroom.png",
        thunderStorm: "../assets/icons/suggestions/thunderstorm.png",
        directions: "../assets/icons/suggestions/directions.png",
        acUnit: "../assets/icons/suggestions/ac_unit.png",
        visibility: "../assets/icons/suggestions/visibility_off.png",
    }

    const resolveSuggestionFromWeatherIcon = (icon: string): Suggestion[] => {
        switch (icon) {
            case "01d":
                return [
                    {iconSource: icons.sunny, message: "Genießen Sie den Sonnenschein!"},
                ]
            case "01n":
                return [
                    {iconSource: icons.sunny, message: "Genießen Sie den Sonnenschein!"},
                ]
            case "02d":
                return [
                    {iconSource: icons.security, message: "Sonnenschutz nicht vergessen!"},
                ]
            case "02n":
                return [
                    {iconSource: icons.security, message: "Sonnenschutz nicht vergessen!"},
                ]
            case "03d":
                return [
                    {iconSource: icons.beachAccess, message: "Nehmen Sie einen Regenschirm mit!"},
                ]
            case "03n":
                return [
                    {iconSource: icons.beachAccess, message: "Nehmen Sie einen Regenschirm mit!"},
                ]
            case "04d":
                return [
                    {iconSource: icons.checkRoom, message: "Mehrere Schichten Kleidung anziehen!"},
                ]
            case "04n":
                return [
                    {iconSource: icons.checkRoom, message: "Mehrere Schichten Kleidung anziehen!"},
                ]
            case "09d":
                return [
                    {iconSource: icons.beachAccess, message: "Regenschirm und Gummistiefel einpacken!!"},
                ]
            case "09n":
                return [
                    {iconSource: icons.beachAccess, message: "Regenschirm und Gummistiefel einpacken!!"},
                ]
            case "10d":
                return [
                    {iconSource: icons.thunderStorm, message: "Achtung, Gewitter!!"},
                ]
            case "10n":
                return [
                    {iconSource: icons.thunderStorm, message: "Achtung, Gewitter!"},
                ]
            case "11d":
                return [
                    {iconSource: icons.directions, message: "Vorsicht beim Fahren!!"},
                ]
            case "11n":
                return [
                    {iconSource: icons.directions, message: "Vorsicht beim Fahren!"},
                ]
            case "13d":
                return [
                    {iconSource: icons.acUnit, message: "Warme Kleidung anziehen!!"},
                ]
            case "13n":
                return [
                    {iconSource: icons.acUnit, message: "Warme Kleidung anziehen!!"},
                ]
            case "50d":
                return [
                    {iconSource: icons.visibility, message: "Sicht eingeschränkt!"},
                ]
            case "50n":
                return [
                    {iconSource: icons.visibility, message: "Sicht eingeschränkt!"},
                ]
            default:
                return [
                    {iconSource: icons.sunny, message: "Genießen Sie den Sonnenschein!"},
                ];
        }
    }

    return (
        <GenericCard orientation="vertical"title="Vorschlag für Ihren Tag">
            <View style={{
                gap: 2,
            }}>
                {resolveSuggestionFromWeatherIcon(weatherIcon).map(s =>
                    <View key={s.message} style={{
                        gap: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center",
                        //boxShadow: "0 0 4px grey",
                        borderColor: COLORS.gray2,
                        borderWidth: 1,
                        marginHorizontal: 16,
                        borderRadius: SIZES.xSmall,
                        padding: 10,
                    }}>
                        { ready && image && renderIcon(s.iconSource) }
                        <Text style={{
                            flex: 1,
                        }}
                        >
                            {s.message}
                        </Text>
                    </View>
                )}
            </View>
        </GenericCard>
    );
};

// const SuggestionIconContainer: SxProps<Theme> = {
//     background: "#ede7f6",
//     borderRadius: "md",
//     p: 1,
//     animation: "glow 0.3s ease-in-out infinite alternate",
//     "-webkit-animation": "glow 0.3s ease-in-out infinite alternate",
//     "-moz-animation": "glow 0.3s ease-in-out infinite alternate",
//     "@keyframes glow": {
//         from: {
//             boxShadow: (theme: Theme) => `0 0 1px ${theme.vars.palette.primary["500"]}`,
//         },
//         to: {
//             boxShadow: (theme: Theme) => `0 0 8px ${theme.vars.palette.primary["500"]}`
//         }
//     }
// }