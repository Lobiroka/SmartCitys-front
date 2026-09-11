import {useCallback, useEffect, useState} from "react";
import {getCurrentCoordinates, LocationPermissionError} from "@/src/features/location/services/locationService";
import {MapRegion} from "@/src/features/map/models/MapRegion";
import {Coordinates} from "@/src/features/map/models/Coordinates";


const DEFAULT_REGION: MapRegion = {
    latitude: -8.047562,
    longitude: -34.877002,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
};

export function useMainMapViewModel(){
    
    const [region, setRegion] = useState<MapRegion>(DEFAULT_REGION);

    const[userCoordinates, setUserCoordinates]= useState<Coordinates|null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const[locationError, setLocationError] = useState<string|null>(null);


    const loadLocation= useCallback(async()=>{
        setIsLoading(true);
        setLocationError(null);

        try {
            const coordinates = await getCurrentCoordinates();
            setUserCoordinates(coordinates);

            setRegion({
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }catch(error){
            if(error instanceof LocationPermissionError) {
                setLocationError("A permissao da localizacao nao foi concedida");
            }else {
                setLocationError("Nao foi possivel obter sua localizacao");
            }
        }finally{
            setIsLoading(false);
        }
    },[]);

    useEffect(()=>{
        loadLocation();

    },[loadLocation]);

    return {
        region,
        userCoordinates,
        isLoading,
        locationError,
        loadLocation,
    };
}
