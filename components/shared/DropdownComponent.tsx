import React, {useState} from 'react';
import {Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View,} from 'react-native';
import {COLORS, FONT_SIZE, GAPS, SHADOWS, SIZES} from "../../constatnts";

type Props = {
    options: string[]
    onSelect: (selectedValue: string) => void,
    selectedValue: string
}
const DropdownComponent: React.FC<Props> = (props: Props) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { options, onSelect, selectedValue } = props;

    const dropdownIcon = require("../../assets/icons/unfold_more.png")
    const handleSelect = (value) => {
        onSelect(value);
        setShowDropdown(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setShowDropdown(true)} style={styles.dropdownButton}>
                <View style={styles.dropdownButtonContainer}>
                    <Text style={styles.textContent}>{selectedValue}</Text>
                    <Image
                        source={dropdownIcon}
                        alt={"dropdown-button"}
                        style={styles.iconSmall}
                    />
                </View>
            </TouchableOpacity>

            <Modal
                visible={showDropdown}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowDropdown(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>

                <View style={styles.modalContent}>
                    <View style={styles.modalHeaderContainer}>
                        <Text style={styles.modalTitle}>
                            Wählen Sie einen Sensor aus
                        </Text>
                        <Text style={{ ...styles.textContent, color: COLORS.primary }}>
                            {selectedValue} zuletzt ausgewählt
                        </Text>
                    </View>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={styles.option}
                            onPress={() => handleSelect(option)}
                        >
                            <View style={{...{...(option === selectedValue ? styles.selectedOption : {})}}}>
                                <Text style={{
                                    ...styles.textContent,
                                    color: option === selectedValue ? COLORS.white : COLORS.black,
                                }}>
                                    {option}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    modalHeaderContainer: {
        gap: GAPS.gap1,
        marginHorizontal: 15,
        marginTop: 20,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: FONT_SIZE.xLarge,
        fontWeight: "600",
    },
    dropdownButtonContainer: {
        gap: GAPS.gap2,
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
    },
    textContent: {
        flex: 1,
        fontSize: FONT_SIZE.medium,
    },
    dropdownButton: {
        borderRadius: 10,
        //borderColor: "rgba(0, 0, 0, 0.01)",
        //borderWidth: 1,
        //...SHADOWS.medium,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        paddingHorizontal: 11,
        paddingVertical: 13,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        position: "absolute",
        bottom: 0,
        width: "95%",
        backgroundColor: COLORS.white,
        marginLeft: 10,
        marginRight: 10,
        borderTopStartRadius: SIZES.medium,
        borderTopEndRadius: SIZES.medium,
    },
    option: {
        marginHorizontal: 10,
        paddingVertical: 25,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
    },
    iconSmall: {
        width: 16,
        height: 16,
    },
    selectedOption: {
        borderRadius: 10,
        color: COLORS.white,
        fontWeight: "600",
        //borderWidth: 1,
        ...SHADOWS.medium,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 11,
        paddingVertical: 13,
    },
});

export default DropdownComponent;
