/* eslint-disable  @typescript-eslint/no-explicit-any */
import type { Map } from 'immutable';

import type { MediaStreamState } from 'src/modules/media/reducers/types';

export interface Action<T> {
    type: T;
}

export interface ActionReturn<T, P> {
    type: T;
    payload: P;
}

export interface ReduxState {
    competitions: Map<string, any>;
    content: Map<string, any>;
    events: Map<string, any>;
    media: MediaStreamState | Map<string, any>;
    sports: Map<string, any>;
    [index: string]: any;
}

export interface SportModel {
    id: string;
    name?: string;
    count?: number;
    displayOrder?: number;
    tags?: any;
}

export interface CompetitionType {
    id: number;
    name: string;
    displayOrder: number;
    tags?: any;
}

export interface CompetitionViewType {
    id: string;
    name: string;
    displayOrder: number;
    tags?: any;
}

export interface AggregationItem {
    id: string | number;
    count?: number;
    name?: string;
    displayOrder?: number;
    tags?: any;
}

interface Background {
    label: string | null;
    url: string;
    width: number;
    height: number;
    altText: string | null;
    caption: string | null;
    id: number | null;
    sha1: string | null;
}

export enum AnchorTarget {
    NEW_WINDOW = 'new_window',
    NEW_TAB = 'new_tab',
    SAME_TAB = 'same_tab',
}

// TODO IT IS A BANNER!
export interface Notification {
    universe: string;
    sport: string | null;
    buttonLabel: string | null;
    clientLabel: string | null;
    selectionId: number | null;
    background: Background;
    eventId: number | null;
    marketId: number | null;
    title: string | null;
    content: string | null;
    id: number;
    buttonUrl: string | null;
    published: boolean;
    dateStart: string;
    dateStop: string;
    displayOrder: number;
    openUrl: AnchorTarget;
    lang: string;
}
