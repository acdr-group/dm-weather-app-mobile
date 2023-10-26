import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View} from "react-native";
import {COLORS, FONT, FONT_SIZE, GAPS, SIZES} from "../../constatnts/theme";

type Props = TextInputProps & { }

const SearchTextInput: React.FC<Props> = (props: Props) => {

    const searchIcon = require("../../assets/icons/search.png")
    const cancelIcon = require("../../assets/icons/cancel-filled.png")

    const [inputValue, setInputValue] = useState<string>("")

    useEffect(() => {
        props.onChangeText(inputValue)
    }, [inputValue])

    const clearInput = (event: any) => {
        event?.preventDefault()
        setInputValue("")
    }

    return (
        <View style={styles.textInputContainer}>
            <View style={styles.textInputWrapper}>
                <Image source={searchIcon} style={styles.textInputIcon}/>
                <TextInput
                    value={inputValue}
                    placeholder={"Suchen"}
                    placeholderTextColor={styles.textInputPlaceholder.color}
                    onChangeText={setInputValue}
                    style={styles.textInput}
                />
                <View>
                    {inputValue ?
                        <TouchableOpacity onPress={clearInput}>
                            <Image source={cancelIcon} style={styles.textInputIcon}/>
                        </TouchableOpacity>
                        : null
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: 35,
    },
    textInputWrapper: {
        //flex: 1,
        //gap: GAPS.gap1,
        flexDirection: "row",
        backgroundColor: COLORS.lightgray,
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: SIZES.xSmall,
        height: "100%",
        paddingLeft: SIZES.large,
        paddingRight: SIZES.large,
    },
    textInput: {
        fontFamily: FONT.regular,
        fontSize: FONT_SIZE.medium,
        height: "100%",
        width: "100%",
        paddingLeft: SIZES.xSmall,
        paddingRight: SIZES.medium,
    },
    textInputPlaceholder: {
        color: COLORS.gray,
    },
    textInputIcon: {
        height: 18,
        width: 18,
    },
})

export default SearchTextInput
