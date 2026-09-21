import type { OccurrencePage } from
    '@/src/features/occurrences/models/OccurrencePage';

export type ListMyOccurrencesParams = {
    page?: number;
    limit?: number;
};

export interface OccurrenceService {
    listMine(
        params?: ListMyOccurrencesParams,
    ): Promise<OccurrencePage>;
}
