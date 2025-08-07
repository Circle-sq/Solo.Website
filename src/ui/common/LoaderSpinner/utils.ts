const TWO = 2;

/**
 * Compute Path depending on circle radius
 *
 * The structure with radius 20 is "M20 0c0-9.94-8.06-20-20-20"
 * @param radius Radius of the circle (default is 20)
 */

export const getPath = (radius: number): string => {
    return [`M${radius} 0c0-9.94-8.06`, radius, radius, radius].join('-');
};

/**
 * Compute the size of the view box depending on the radius and Stroke-Width
 *
 * @param strokeWidth Stroke Width of the full circle
 * @param secondaryStrokeWidth Stroke Width of the 1/4 circle
 * @param radius Radius of the circle
 */

export const getViewBoxSize = (strokeWidth: number, secondaryStrokeWidth: number, radius: number): string => {
    const maxStrokeWidth = Math.max(strokeWidth, secondaryStrokeWidth);
    const startPoint = -radius - maxStrokeWidth / TWO + 1;
    const endPoint = radius * TWO + maxStrokeWidth;

    return [startPoint, startPoint, endPoint, endPoint].join(' ');
};
