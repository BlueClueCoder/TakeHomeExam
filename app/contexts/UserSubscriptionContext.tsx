import { createContext, useState } from "react";
import { ESubscriptionType } from "../datatypes/ESubscriptionType";
import { IPurchase } from "../datatypes/IPurchase";
import { ISubscription } from "../datatypes/ISubscription";
import { IUser } from "../datatypes/IUser";

interface IUserSubscriptionContext {
    users: IUser[],
    changeUsers: (arg: IUser[]) => void,
    
    subscriptions: ISubscription[],
    changeSubscriptions: (arg: ISubscription[]) => void,

    purchases: IPurchase[],
    changePurchases: (arg: IPurchase[]) => void,

    // determining which record to draw from when populating Edit User View
    selectedUser: number,
    changeSelectedUser: (arg: number) => void,
    
    // determining which record to draw from when populating Edit Subscription View
    selectedSubscription: number,
    changeSelectedSubscription: (arg: number) => void,
    
    // potentially an account ID generator which only ever increments to prevent two instances having the same ID
    // ID generator for each data type
}

const initialUsers: IUser[] =
[
    {
        accountID: 1,
        userName: "Jimmy",
        email: "jimm@gmail.com",
        phoneNumber: "5555665555",
        startDate: new Date(12, 12, 2021),
        isActive: true,
    },
    {
        accountID: 2,
        userName: "Phillip",
        email: "phill@gmail.com",
        phoneNumber: "5555555555",
        startDate: new Date(1, 10, 2021),
        isActive: true,
    }
]

const initialSubscriptions: ISubscription[] = 
[
    {
        subscriptionID: 1,
        subscriptionType: ESubscriptionType.EBronze,
        subscriptionOwner: 1,
        licensePlate: "RPG3456",
        isActive: true,
        startDate: new Date(4, 6, 2018)
    },
    {
        subscriptionID: 2,
        subscriptionType: ESubscriptionType.EGold,
        subscriptionOwner: 1,
        licensePlate: "APP3456",
        isActive: true,
        startDate: new Date(4, 10, 2018)
    },
    {
        subscriptionID: 3,
        subscriptionType: ESubscriptionType.EPlatinum,
        subscriptionOwner: 2,
        licensePlate: "APP3456",
        isActive: true,
        startDate: new Date(4, 10, 2018)
    },
]

const initialPurchases: IPurchase[] = [
    {
        receiptID: 1,
        purchaseAmount: 55.50,
        purchaseDate: new Date(12, 10, 2004),
        payingUser: 1,
        memo: "Basic Account Purchase"
    },
    {
        receiptID: 2,
        purchaseAmount: 25.50,
        purchaseDate: new Date(12, 10, 2007),
        payingUser: 1,
        memo: "Platinum Subscription Monthly Payment"
    },
    {
        receiptID: 4,
        purchaseAmount: 75.05,
        purchaseDate: new Date(12, 11, 2004),
        payingUser: 2,
        memo: "Premium Account Upgrade"
    },


]

export const UserSubscriptionContext = createContext<IUserSubscriptionContext>(
    {} as IUserSubscriptionContext
);

export default function UserSubscriptionProvider({children} : React.PropsWithChildren) {
    // all useStates
    const [users, setUsers] = useState(initialUsers);
    const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
    const [purchases, setPurchases] = useState(initialPurchases);
    const [selectedUser, setSelectedUser] = useState<number>(-1);
    const [selectedSubscription, setSelectedSubscription] = useState<number>(-1);

    //all function definitions
    function changeUsers(newVal: IUser[]) {
        setUsers(newVal);
    }
    function changeSelectedUser(newVal: number) {
        setSelectedUser(newVal);
    }
    function changeSubscriptions(newVal: ISubscription[]) {
        setSubscriptions(newVal);
    }
    function changeSelectedSubscription(newVal: number) {
        setSelectedSubscription(newVal);
    }
    function changePurchases(newVal: IPurchase[]) {
        setPurchases(newVal);
    }

    return(
        <UserSubscriptionContext.Provider value={
            {
                users,
                changeUsers,
                subscriptions,
                changeSubscriptions,
                selectedUser,
                changeSelectedUser,
                selectedSubscription,
                changeSelectedSubscription,
                purchases,
                changePurchases,
            }
        }>
            {children}
        </UserSubscriptionContext.Provider>
    )

}