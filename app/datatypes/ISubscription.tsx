import { ESubscriptionType } from "./ESubscriptionType";

export interface ISubscription {
    subscriptionID: number,
    subscriptionType: ESubscriptionType,
    subscriptionOwner: number,
    licensePlate: string,
    startDate: Date,
    isActive: boolean
}