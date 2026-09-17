import { useEffect, useState } from 'react';

import type { AuthSession } from
        '@/src/features/auth/models/AuthSession';
import type { AuthSessionService } from
        '@/src/features/auth/services/AuthSessionService';
import type { AuthSessionViewModel } from
        '@/src/features/auth/viewmodels/AuthSessionViewModel';

export function useAuthSessionViewModel(
    service: AuthSessionService,
): AuthSessionViewModel {
    const [session, setSession] = useState<AuthSession>({
        status: 'loading',
    });

    useEffect(() => {
        service.restoreSession().then(setSession);
    }, [service]);

    async function signIn() {
        const authenticatedSession = await service.signIn();
        setSession(authenticatedSession);
    }

    async function signOut() {
        await service.signOut();
        setSession({ status: 'anonymous' });
    }

    return { session, signIn, signOut };
}