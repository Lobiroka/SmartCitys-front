import {
    ActivityIndicator,
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useAuthSession } from
        '@/src/features/auth/hooks/useAuthSession';

export function LoginScreen() {
    const { session, signIn } = useAuthSession();

    const isLoading = session.status === 'loading';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Smart City</Text>

            <Text style={styles.description}>
                Entre para registrar e acompanhar denúncias.
            </Text>

            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <Button
                    title="Entrar"
                    onPress={signIn}
                />
            )}

            {session.status === 'error' && (
                <Text style={styles.error}>
                    {session.message}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        gap: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
    },
    error: {
        color: '#b00020',
    },
});