export interface CategoryIcons {
    [categoryId: string]: CategoryIcon;
}

export interface CategoryIcon {
    id: number;
    url: string;
    label: null;
    width: number;
    height: number;
    caption: null;
    sha1: string;
    altText: null;
}
