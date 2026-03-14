import { createContext, useState } from "react";
import { IUser } from "../datatypes/IUser";

interface IUserSubscriptionContext {
    users: IUser[],
    changeUsers: (arg: IUser[]) => void,
    selectedUser: number | undefined,
    changeSelectedUser: (arg: number) => void,
    // potentially an account ID generator which only ever increments to prevent two instances having the same ID
    // ID generator for each data type
}

const initialUsers: IUser[] =
[
    {
        accountID: 1,
        userName: "Jimmy",
        email: "jimm@gmail.com",
        phoneNumber: 5555665555,
        subscriptionIDs: [],
        purhcaseIDs:[],
        startDate: new Date(12, 12, 2021),
    },
    {
        accountID: 2,
        userName: "Phillip",
        email: "phill@gmail.com",
        phoneNumber: 5555555555,
        subscriptionIDs: [],
        purhcaseIDs:[],
        startDate: new Date(1, 10, 2021),
    }
]

export const UserSubscriptionContext = createContext<IUserSubscriptionContext>(
    {} as IUserSubscriptionContext
);

export default function UserSubscriptionProvider({children} : React.PropsWithChildren) {
    // all useStates
    const [users, setUsers] = useState(initialUsers);
    const [selectedUser, setSelectedUser] = useState<number>();

    //all function definitions
    function changeUsers(newVal: IUser[]) {
        setUsers(newVal);
    }
    function changeSelectedUser(newVal: number) {
        setSelectedUser(newVal);
    }

    return(
        <UserSubscriptionContext.Provider value={
            {
                users,
                changeUsers,
                selectedUser,
                changeSelectedUser,
            }
        }>
            {children}
        </UserSubscriptionContext.Provider>
    )

}