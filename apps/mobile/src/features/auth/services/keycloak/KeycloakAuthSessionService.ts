import {
    fetchDiscoveryAsync,
    type DiscoveryDocument,
} from 'expo-auth-session';

import { keycloakConfig } from
        '@/src/features/auth/config/keycloakConfig';
import type { AuthSession } from
        '@/src/features/auth/models/AuthSession';
import type { AuthSessionService } from
        '@/src/features/auth/services/AuthSessionService';
import { fetchAuthenticatedSession } from
        '@/src/features/auth/services/keycloak/fetchAuthenticatedSession';
import { isAccessTokenFresh } from
        '@/src/features/auth/services/keycloak/isAccessTokenFresh';
import { refreshStoredTokens } from
        '@/src/features/auth/services/keycloak/refreshStoredTokens';
import { requestKeycloakTokens } from
        '@/src/features/auth/services/keycloak/requestKeycloakTokens';
import type { AuthTokenStorage } from
        '@/src/features/auth/storage/AuthTokenStorage';

export class KeycloakAuthSessionService
    implements AuthSessionService
{
    private discovery?: DiscoveryDocument;

    constructor(
        private readonly storage: AuthTokenStorage,
    ) {}

    async restoreSession(): Promise<AuthSession> {
        const storedTokens = await this.storage.load();

        if (!storedTokens) {
            return { status: 'anonymous' };
        }

        const discovery = await this.getDiscovery();

        const currentTokens = isAccessTokenFresh(storedTokens)
            ? storedTokens
            : await refreshStoredTokens(
                storedTokens,
                keycloakConfig.clientId,
                discovery,
                this.storage,
            );

        return fetchAuthenticatedSession(
            currentTokens.accessToken,
            discovery,
        );
    }

    async signIn(): Promise<AuthSession> {
        const discovery = await this.getDiscovery();

        const tokens = await requestKeycloakTokens(
            keycloakConfig.clientId,
            keycloakConfig.redirectScheme,
            discovery,
        );

        if (!tokens) {
            return { status: 'anonymous' };
        }

        await this.storage.save(tokens);

        return fetchAuthenticatedSession(
            tokens.accessToken,
            discovery,
        );
    }

    async signOut(): Promise<void> {
        await this.storage.clear();
    }

    private async getDiscovery(): Promise<DiscoveryDocument> {
        if (!this.discovery) {
            this.discovery = await fetchDiscoveryAsync(
                keycloakConfig.issuer,
            );
        }

        return this.discovery;
    }
}