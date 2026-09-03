import * as Location from 'expo-location';

export async function getCurrentCoordinates(){

    const permission =

        await Location.requestForegroundPermissionsAsync();

    if(permission.status !== 'granted'){
        throw new Error('Permission not granted');
    }

    const currentLocation = await Location.getCurrentPositionAsync({});

    return{
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
    };
}