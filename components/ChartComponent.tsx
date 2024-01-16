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

/**
 * React functional component for rendering a chart.
 *
 * @param {Object} props - The props for the ChartComponent.
 * @param {string} props.chartTitle - The title of the chart.
 * @param {Array<Object>} props.dataSet - The data set to be displayed on the chart.
 * @param {string} props.verticalAxisLabel - The label for the vertical axis of the chart.
 * @param {string} props.horizontalAxisLabel - The label for the horizontal axis of the chart.
 * @param {string} props.unit - The unit of measurement for the data values.
 *
 * @returns {ReactElement} The rendered chart component.
 */
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