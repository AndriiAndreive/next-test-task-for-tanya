export function addCommasToNumber(incommingNumber: number) {
    return incommingNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}