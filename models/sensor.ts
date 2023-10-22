export interface Sensor {
    id: number,
    name: string,
    unit: string,
    description: string ,
    lastValue: number,
    lastTimestamp: Date,
    lastReadingInMinutes: number,
}