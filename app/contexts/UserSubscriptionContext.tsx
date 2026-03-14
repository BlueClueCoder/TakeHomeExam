import { createContext, useState } from "react";
import { IUser } from "../datatypes/IUser";

interface IUserSubscriptionContext {
    users: IUser[],
    changeUsers: (arg: IUser[]) => void,
    placeholder: IUser,
    changePlaceholder: (arg: IUser) => void,
}

const firstUser: IUser = {
        accountID: 1,
        userName: "Jimmy",
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
    {} as IUserSubscriptionContext
);

export default function UserSubscriptionProvider({children} : React.PropsWithChildren) {
    // all useStates
    const [users, setUsers] = useState(initialUsers);
    const [placeholder, setPlaceholder] = useState(firstUser);

    //all function definitions
    function changeUsers(newVal: IUser[]) {
        setUsers(newVal);
    }
    function changePlaceholder(newVal: IUser) {
        setPlaceholder(newVal);
    }

    return(
        <UserSubscriptionContext.Provider value={
            {
                users,
                changeUsers,
                placeholder,
                changePlaceholder,
            }
        }>
            {children}
        </UserSubscriptionContext.Provider>
    )

}