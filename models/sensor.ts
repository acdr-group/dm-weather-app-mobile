export interface Sensor {
    id: number,
    name: string,
    unit: string,
    description: string ,
    lastValue: number,
    lastTimestamp: Date,
    lastReadingInMinutes: number,
}

export enum SensorId {
    AIR_TEMPERATURE = 1,
    AIR_HUMIDITY = 2,
    PRECIPITATION_AMOUNT = 3,
    WIND_SPEED = 4,
    WIND_DIRECTION = 5,
    AIR_PRESSURE = 6,
}