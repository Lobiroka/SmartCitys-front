import type { PropsWithChildren } from 'react';

import { AuthSessionContext } from
        '@/src/features/auth/contexts/AuthSessionContext';
import { KeycloakAuthSessionService } from
        '@/src/features/auth/services/keycloak/KeycloakAuthSessionService';
import { ExpoSecureAuthTokenStorage } from
        '@/src/features/auth/storage/ExpoSecureAuthTokenStorage';
import { useAuthSessionViewModel } from
        '@/src/features/auth/viewmodels/useAuthSessionViewModel';

const tokenStorage = new ExpoSecureAuthTokenStorage();

const authSessionService =
    new KeycloakAuthSessionService(tokenStorage);

export function AuthSessionProvider({
                                        children,
                                    }: PropsWithChildren) {
    const viewModel = useAuthSessionViewModel(
        authSessionService,
    );

    return (
        <AuthSessionContext.Provider value={viewModel}>
            {children}
        </AuthSessionContext.Provider>
    );
}