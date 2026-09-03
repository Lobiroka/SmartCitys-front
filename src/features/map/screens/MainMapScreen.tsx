import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { useMainMapViewModel } from '../viewmodels/useMainMapViewModel';

export function MainMapScreen() {
    const { region, isLoading, locationError } = useMainMapViewModel();

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={region} showsUserLocation>
                <Marker
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }}
                    title="Você está aqui"
                    description="Localização aproximada do usuário"
                />
            </MapView>

            {isLoading && (
                <View style={styles.messageBox}>
                    <Text>Buscando localização...</Text>
                </View>
            )}

            {locationError && (
                <View style={styles.messageBox}>
                    <Text>{locationError}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    messageBox: {
        position: 'absolute',
        top: 48,
        left: 16,
        right: 16,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
    },
});
