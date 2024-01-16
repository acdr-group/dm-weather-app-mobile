import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from "react-native";
import {LineChart} from "react-native-gifted-charts";
import {COLORS} from "../../constatnts";
import * as ScreenOrientation from "expo-screen-orientation";

export type ChartDataType = {
    value: number,
    date: string,
    label?: string,
    labelTextStyle?: {
        color: string,
        width: number,
    },
}
type Props = {
    data: ChartDataType[]
    unit: string
}

/**
 * LineChartComponent is a React functional component that displays a line chart with configurable options.
 *
 * @param {Props} props - The props for the component.
 * @returns {React.ReactNode} - The rendered line chart component.
 */
const LineChartComponent: React.FC<Props> = (props: Props) => {

    const parentViewRef = useRef<View | null>(null)
    const [parentWidth, setParentWidth] = useState<number | undefined>(undefined)

    const handleResize = () => {
        if (parentViewRef.current) {
            parentViewRef.current.measure((x, y, width) => setParentWidth(width))
        }
    }

    const [orientation, setOrientation] = useState<ScreenOrientation.Orientation | null>(null)

    useEffect(() => {
        checkOrientation()
        ScreenOrientation.addOrientationChangeListener(handleOrientationChange)
        return () => ScreenOrientation.removeOrientationChangeListeners()
    }, [])

    useEffect(() => {
        handleResize()
    }, [orientation])

    const checkOrientation = async () => {
        const orientation = await ScreenOrientation.getOrientationAsync()
        setOrientation(orientation);
    }

    const handleOrientationChange = (o) => {
        setOrientation(o.orientationInfo.orientation);
    }

    const getHorizontalSpacing = (): number => {
        return parentWidth <= 345 ? 5 : 17
    }

    return (
        <View
            ref={parentViewRef}
            style={{
                //flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                flexShrink: 1,
                paddingVertical: 10,
                //backgroundColor: '#8c8c8c',
            }}>
            <LineChart
                areaChart
                data={props.data}
                //rotateLabel
                curved
                width={(parentWidth ? parentWidth - 10 : undefined)}
                hideDataPoints
                spacing={getHorizontalSpacing()}
                color={COLORS.primary}
                thickness={2}
                startFillColor="rgba(49,38,81,0.3)"
                endFillColor="rgba(68,66,98,0.01)"
                startOpacity={0.9}
                endOpacity={0.2}
                initialSpacing={0}
                noOfSections={6}
                //maxValue={450}
                yAxisColor={COLORS.lightgray}
                yAxisThickness={0}
                rulesType="solid"
                rulesColor={COLORS.lightgray}
                yAxisTextStyle={{color: COLORS.black}}
                //xAxisTextStyle={{color: COLORS.black}}
                xAxisThickness={1}
                //@ts-ignore
                yAxisSide='right'
                xAxisColor={COLORS.lightgray}
                pointerConfig={{
                    pointerStripHeight: 160,
                    pointerStripColor: 'lightgray',
                    pointerStripWidth: 2,
                    pointerColor: 'lightgray',
                    radius: 4,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 10,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: items => {
                        return (
                            <View
                                style={{
                                    height: 100,
                                    width: 100,
                                    justifyContent: 'center',
                                    marginTop: -10,
                                    marginLeft: -10,
                                }}>
                                <Text style={{color: COLORS.primary, fontSize: 14, marginBottom:1, textAlign:'center', fontWeight: 'bold'}}>
                                    {items[0].date}
                                </Text>

                                <View style={{paddingHorizontal:5, paddingVertical:6, borderRadius:16, backgroundColor:COLORS.lightgray }}>
                                    <Text style={{fontWeight: 'bold',textAlign:'center', color: COLORS.primary,}}>
                                        {`${items[0].value} ${props.unit}`}
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
        </View>
    )
}

export default LineChartComponent
