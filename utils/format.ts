export function formatPrice(price: number | undefined): string | undefined {
    if(price) {
        return (price/100).toFixed(2) + "€";
    }
    return undefined;
}