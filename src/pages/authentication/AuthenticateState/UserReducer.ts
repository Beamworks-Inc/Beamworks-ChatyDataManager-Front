import {ContentReducerState, User} from "../../../interfaces/Content.interface";
import {Role} from "../../../apis/Auth";

const initUser: User={
    id: 0,
    name: "사용자",
    email: "",
    role: null
}

const HEADER="User"
const TYPE={
    SET_USER: `${HEADER}/SET_USER` as const,
    SET_USER_ROLE: `${HEADER}/SET_USER_ROLE` as const,
}

export const UserAction={
    setUser:(user:User)=>({
        type: TYPE.SET_USER,
        payload: user
    }),
    setUserRole:(role:Role)=>({
        type: TYPE.SET_USER_ROLE,
        payload: role
    })
}

export default function UserReducer(
    state: User= initUser,
    action: any
): any{
    switch (action.type){
        case TYPE.SET_USER:
            return action.payload
        case TYPE.SET_USER_ROLE:
            return {...state, role : action.payload}
        default:
            return state
    }
}