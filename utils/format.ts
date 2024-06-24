export function formatPrice(price: number | undefined): string | undefined {
    if(price) {
        return Number((price/100)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + " €";
    }
    return undefined;
}