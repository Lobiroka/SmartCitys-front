import type { OccurrencePage } from
    '@/src/features/occurrences/models/OccurrencePage';
import type {
    ListMyOccurrencesParams,
    OccurrenceService,
} from '@/src/features/occurrences/services/OccurrenceService';
import type { OccurrencePageApiDto } from
    '@/src/features/occurrences/services/api/OccurrenceApiDto';
import { mapOccurrenceApiDto } from
    '@/src/features/occurrences/services/api/mapOccurrenceApiDto';
import type { HttpClient } from
    '@/src/shared/http/HttpClient';

export class ApiOccurrenceService
    implements OccurrenceService
{
    constructor(
        private readonly httpClient: HttpClient,
    ) {}

    async listMine(
        params: ListMyOccurrencesParams = {},
    ): Promise<OccurrencePage> {
        const page = params.page ?? 1;
        const limit = params.limit ?? 20;

        const response =
            await this.httpClient.request<OccurrencePageApiDto>(
                `/demands/my-demands?page=${page}&limit=${limit}`,
            );

        return {
            data: response.data.map(mapOccurrenceApiDto),
            pagination: response.pagination,
        };
    }
}
