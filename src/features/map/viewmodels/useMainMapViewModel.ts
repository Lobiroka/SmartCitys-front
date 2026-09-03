import {useEffect, useState} from "react";
import {getCurrentCoordinates} from "@/src/features/location/services/locationService";
import {MapRegion} from "@/src/features/map/models/MapRegion";

const DEFAULT_REGION: MapRegion = {
    latitude: -8.047562,
    longitude: -34.877002,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
};

export function useMainMapViewModel(){
    const [region, setRegion] = useState<MapRegion>(DEFAULT_REGION);
    const [isLoading, setIsLoading] = useState(true);
    const[locationError, setLocationError] = useState<string|null>(null);

    useEffect(()=>{
        async function loadLocation(){
            try {
                const coordinates = await getCurrentCoordinates();
                setRegion({
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            }catch(error){
                setLocationError("error");
            }finally{
                setIsLoading(false);
            }
        }
        loadLocation();

    },[]);
    return {
        region,
        isLoading,
        locationError,
    };
}
