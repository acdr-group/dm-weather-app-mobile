import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data to storage
export const saveToStorage = async (key, object) => {
    try {
        const jsonValue = JSON.stringify(object);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
    }
};

// Retrieve data from storage
export const getFromStorage = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        return null;
    }
};

// Check if data in storage is expired
export const isExpired = (timestamp, expirationMinutes) => {
    const now = new Date().getTime();
    const expirationTime = new Date(timestamp).getTime() + expirationMinutes * 60000;
    return now > expirationTime;
};
