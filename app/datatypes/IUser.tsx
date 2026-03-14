export interface IUser {
    accountID: number,
    userName?: string,
    email?: string,
    phoneNumber?: number,
    subscriptionIDs: number[],
    purhcaseIDs: number[]
}