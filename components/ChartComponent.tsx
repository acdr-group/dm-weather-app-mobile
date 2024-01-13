import React from "react";
import LineChartComponent, {ChartDataType} from "../components/shared/LineChartComponent";

export type ChartDataSetType = {
    x: string,
    y: number,
}
type PropsChart = {
    chartTitle: string
    dataSet: ChartDataSetType[]
    verticalAxisLabel?: string
    horizontalAxisLabel?: string
    unit: string
}

export const ChartComponent: React.FC<PropsChart> = (props: PropsChart) => {
    const { chartTitle, dataSet, verticalAxisLabel, horizontalAxisLabel, unit } = props

    const formatDataForChart = (): ChartDataType[] => {
        return dataSet.map(d => ({
            date: d.x,
            value: d.y,
        }))
    }
    return (
        <LineChartComponent
            data={formatDataForChart()}
            unit={unit}
        />
    )
}