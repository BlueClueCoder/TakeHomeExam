export interface IUser {
    accountID: number,
    name?: string,
    email?: string,
    phoneNumber?: number,
    subscriptionIDs: number[],
    purhcaseIDs: number[]
}