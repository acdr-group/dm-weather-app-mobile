import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {COLORS, GAPS, SIZES} from "../../constatnts/theme";

type Props = PropsWithChildren & {
  title: string
  headerIcon: any
}

const GenericStationCard: React.FC<Props> = (props: Props) => {
  return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Image source={props.headerIcon} style={styles.sectionTitleIcon}/>
          <Text style={styles.sectionTitle}>
            {props.title}
          </Text>
        </View>
        {props.children}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: GAPS.gap3,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: SIZES.small,
    paddingVertical: SIZES.small,
  },
  containerTitle: {
    flexDirection: "row",
    gap: GAPS.gap1,
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: SIZES.small,
  },
  sectionTitleIcon: {
    width: 16,
    height: 16,
  },
  sectionTitle: {
    color: COLORS.gray,
    fontWeight: "500",
    fontSize: SIZES.small,
  },
})

export default GenericStationCard
