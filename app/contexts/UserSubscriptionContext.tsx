import { createContext, useState } from "react";
import { IUser } from "../datatypes/IUser";

interface IUserSubscriptionContext {
    users: IUser[],
    changeUsers: (arg: IUser[]) => void;
}

const firstUser: IUser = {
        accountID: 1,
        userName: "Phillip",
        email: "phill@gmail.com",
        phoneNumber: 5555555555,
        subscriptionIDs: [],
        purhcaseIDs:[],
    }

const initialUsers: IUser[] =
[
    firstUser,
]

export const UserSubscriptionContext = createContext<IUserSubscriptionContext>(
    {
        users: initialUsers,
    } as IUserSubscriptionContext
);

export default function UserSubscriptionProvider({children} : React.PropsWithChildren) {
    // all useStates
    const [users, setUsers] = useState(initialUsers);

    //all function definitions
    function changeUsers(newVal: IUser[]) {
        setUsers(newVal);
    }

    return(
        <UserSubscriptionContext.Provider value={
            {
                users,
                changeUsers
            }
        }>
            {children}
        </UserSubscriptionContext.Provider>
    )

}