interface PlaceButtonProps {
    borderColor?: string;
    borderHoverColor?: string;
    bgColor?: string;
    bgHoverColor?: string;
    color: string;
    hoverColor?: string;
}

export const getPlaceButtonStyles = ({
    borderColor,
    bgColor,
    color,
    bgHoverColor = bgColor,
    borderHoverColor = borderColor,
    hoverColor = color,
}: PlaceButtonProps) => `
    border: 1px solid ${borderColor};
    background-color: ${bgColor};
    color: ${color};

    &:hover {
        color: ${hoverColor};
        border: 1px solid ${borderHoverColor};
        background-color: ${bgHoverColor};
    }
`;
