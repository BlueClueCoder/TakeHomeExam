export interface IPurchase {
    receiptID: number,
    purchaseDate: Date,
    purchaseAmount: number,
    // account ID of paying customer
    payingUser: number,
    memo?: string,
}