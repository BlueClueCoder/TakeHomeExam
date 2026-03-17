import { ESubscriptionType } from "./ESubscriptionType";

export interface ISubscription {
    subscriptionID: number,
    subscriptionType: ESubscriptionType,
    // account ID of owner
    subscriptionOwner: number,
    licensePlate?: string,
    startDate: Date,
    isActive: boolean
}