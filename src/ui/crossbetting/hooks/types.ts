import type { Competition, Country } from 'src/ui/crossbetting/NavigationSidebar/types';
import type { SortOption } from 'src/ui/events/EventsList/types';

export interface DataCountryCompetition {
    countries?: Country[];
    uniqueCountries?: Country[];
    competitions?: Competition[];
    counters?: Array<Record<string, unknown>>;
    isLoading?: boolean;
    country?: Country[];
}

export interface EventSort {
    options: SortOption[];
    sortValue?: string;
    onSortChange: (value?: string) => void;
    sortReqParams?: string[];
    betType?: string;
    betTypeReqParams?: Record<string, unknown>;
}

export interface CountersCounterType {
    id: string | number;
    count: number;
    displayOrder: number;
    name: string;
}
