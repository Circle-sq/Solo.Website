export interface Uniform {
    image: UniformImage;
    playerId: string;
    sportName: string;
    uniformType: UniformType;
}

export interface UniformImage {
    altText: string | null;
    caption: string | null;
    height: number;
    id: number;
    label: string | null;
    shal: string;
    url: string;
    width: number;
}

export interface UniformParams {
    sport: string;
    uniformType: UniformType;
}

export type UniformType = 'home' | 'away' | 'custom' | 'default';
