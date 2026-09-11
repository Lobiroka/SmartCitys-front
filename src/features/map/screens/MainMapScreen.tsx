import { Text, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { useMainMapViewModel } from '../viewmodels/useMainMapViewModel';
import {styles} from "@/src/features/map/styles/MainMapScreen.styles";

export function MainMapScreen() {
    const { region,  userCoordinates, isLoading, locationError,loadLocation } = useMainMapViewModel();

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={region} showsUserLocation>
                {userCoordinates !== null && (
                    <Marker
                        coordinate={userCoordinates}
                        title="Você está aqui"
                        description="Localização aproximada do usuário"
                    />
                )}
            </MapView>

            {isLoading && (
                <View style={styles.messageBox}>
                    <Text>Buscando localização...</Text>
                </View>
            )}

            {locationError && (
                <View style={styles.messageBox}>
                    <Text>{locationError}</Text>
                    <Button title="Tentar novamente"
                            onPress={loadLocation}
                            disabled={isLoading}
                    />
                </View>
            )}
        </View>
    );
}


