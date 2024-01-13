import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {COLORS, GAPS, SIZES} from "../../constatnts";

type Props = PropsWithChildren & {
  title?: string
  subtitle?: string
  headerIcon?: any
  orientation?: "vertical" | "horizontal"
}

const GenericCard: React.FC<Props> = (props: Props) => {

  const isVertical = props.orientation === "vertical"

  return (
      <View style={[isVertical ? styles.verticalContainer : styles.horizontalContainer, styles.container]}>
        {isVertical ?
            (props.title ?
                    <VerticalContentComponent
                        title={props.title}
                        icon={props.headerIcon}
                    /> : null
            ) :
            <HorizontalContentComponent
                title={props.title}
                subtitle={props.subtitle}
                icon={props.headerIcon}
            />
        }
        <View>{props.children}</View>
      </View>
  )
}

type PropsVerticalContent = PropsWithChildren & {
  title?: string
  icon?: any
}
const VerticalContentComponent: React.FC<PropsVerticalContent> = (props: PropsVerticalContent) => {
  return (
      <View style={styles.verticalContainerTitle}>
        {props.icon ? <Image source={props.icon} style={styles.sectionTitleIcon}/> : null}
        <Text style={styles.verticalSectionTitle}>{props.title}</Text>
      </View>
  )
}

type PropsHorizontalContent = PropsWithChildren & {
  title: any
  subtitle?: string
  icon?: any
}
const HorizontalContentComponent: React.FC<PropsHorizontalContent> = (props: PropsHorizontalContent) => {
  return (
      <View style={styles.horizontalContainerTitle}>
        {props.icon ? <Image source={props.icon} style={styles.sectionTitleIcon}/> : null}
        <View>
          <Text style={styles.horizontalSectionTitle}>{props.title}</Text>
          <Text style={styles.subtitle}>{props.subtitle}</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fbfcfe",
  },
  verticalContainer: {
    gap: GAPS.gap3,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: SIZES.small,
    paddingVertical: SIZES.small,
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: SIZES.small,
    paddingVertical: SIZES.small,
  },
  verticalContainerTitle: {
    flex: 1,
    flexDirection: "row",
    gap: GAPS.gap1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: SIZES.small,
  },
  horizontalContainerTitle: {
    flex: 1,
    alignItems: "flex-start",
    alignContent: "flex-start",
    paddingHorizontal: SIZES.small,
  },
  sectionTitleIcon: {
    width: 16,
    height: 16,
  },
  verticalSectionTitle: {
    fontWeight: "500",
    fontSize: SIZES.small,
  },
  horizontalSectionTitle: {
    marginBottom: GAPS.gap2,
    fontWeight: "500",
    fontSize: SIZES.large,
  },
  subtitle: {
    fontWeight: "400",
    fontSize: SIZES.medium,
  },
})

export default GenericCard
