import type { ButtonSizes } from 'src/ui/common/Button/types';

export interface ButtonUniversalType {
    size?: ButtonSizes;
    className?: string;
    isButton?: boolean;
}

export type ParamsType = Record<string, string | number | null | undefined>;

export interface ParseResult {
    url: string;
    path: string;
    query: Record<string, string>;
    params?: Record<string, string>;
}

export interface RoutePartialType {
    url: string;
    matcher: RegExp;
    params: string[];
}

export interface RouteType {
    url: string;
    matcher: RegExp;
    params: string[];
    name: string;
}

export interface FindRouteType {
    name: string;
    params: Record<string, string>;
}

export interface ReadonlyRoute {
    readonly name: string;
    readonly params: Readonly<Record<string, string>>;
}
