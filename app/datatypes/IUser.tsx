export interface IUser {
    accountID: number,
    userName?: string,
    email?: string,
    phoneNumber?: number,
    // maybe remove, instead just trace through the list of subscriptions looking for ones with subscription Owner IDs matching this user
    // one less field to change when transfers are made
    subscriptionIDs: number[],
    purhcaseIDs: number[],
    startDate: Date,
}