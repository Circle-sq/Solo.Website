/**
 * Converts decimal odds to fractional odds and returns both.
 * @param decimalOdds - The decimal odds to convert.
 * @returns An object containing both decimal and fractional odds.
 */
export function buildPrice(decimalOdds: number): { d: number; f: string } {
    if (decimalOdds <= 1) {
        throw new Error('Decimal odds must be greater than 1 to convert to fractional odds.');
    }

    // Subtract 1 from the decimal odds
    const fractionalValue = decimalOdds - 1;

    // Find the closest fraction representation
    const precision = 100000; // Precision level for finding fraction
    const numerator = Math.round(fractionalValue * precision);
    const denominator = precision;

    // Simplify the fraction
    const gcd = (a: number, b: number): number => {
        return b ? gcd(b, a % b) : a;
    };

    const greatestCommonDivisor = gcd(numerator, denominator);
    const simplifiedNumerator = numerator / greatestCommonDivisor;
    const simplifiedDenominator = denominator / greatestCommonDivisor;

    const fractionalOdds = `${simplifiedNumerator}/${simplifiedDenominator}`;

    return {
        d: parseFloat(decimalOdds.toFixed(2)),
        f: fractionalOdds,
    };
}
