import * as Location from 'expo-location';

export class LocationPermissionError extends Error {
    constructor() {
        super('Location permission not granted');
        this.name = 'LocationPermissionError';
    }
}

export async function getCurrentCoordinates(){

    const permission =

        await Location.requestForegroundPermissionsAsync();

    if(permission.status !== 'granted'){
        throw new LocationPermissionError();
    }

    const currentLocation = await Location.getCurrentPositionAsync({});

    return{
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
    };
}