import { Text, View, Button,Linking,Alert } from 'react-native';
import MapView from 'react-native-maps';

import { useMainMapViewModel } from '../viewmodels/useMainMapViewModel';
import {styles} from "@/src/features/map/styles/MainMapScreen.styles";

export function MainMapScreen() {
    const { region, isLoading, locationError,loadLocation,isPermissionBlocked } = useMainMapViewModel();

    async function handleOpenSettings() {
        try {
            await Linking.openSettings();
        } catch {
            Alert.alert(
                "Não foi possível abrir as configurações",
                "Abra as configurações do celular e permita o acesso à localização."
            );
        }
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     region={region}
                     showsUserLocation>

            </MapView>

            {isLoading && (
                <View style={styles.messageBox}>
                    <Text>Buscando localização...</Text>
                </View>
            )}

            {locationError && (
                <View style={styles.messageBox}>
                    <Text>{locationError}</Text>
                    <Button
                        title={
                        isPermissionBlocked
                        ?"Abrir configurações" :"Tentar novamente"
                    }
                            onPress={
                                isPermissionBlocked
                                    ? handleOpenSettings : loadLocation
                            }
                            disabled={isLoading}
                    />
                </View>
            )}
        </View>
    );
}


