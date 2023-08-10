import React, {createContext, useReducer, useContext} from 'react';

interface User {
    id: string;
    username: string;
    email: string;
}

// Define the actions
type Action =
    | { type: 'SET_USER', payload: User }
    | { type: 'LOGOUT' };

// Initial state
const initialState: User | null = null;

// Create contexts
const UserStateContext = createContext<User | null>(initialState);
const UserDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

function userReducer(state: User | null, action: Action): User | null {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
            return action.payload;
        case 'LOGOUT':
            localStorage.removeItem('currentUser');
            return null;
        default:
            return state;
    }
}


export function UserProvider({children}: { children: React.ReactNode }) {
    const localUser = localStorage.getItem('currentUser');
    const parsedUser = localUser ? JSON.parse(localUser) : initialState;
    const [state, dispatch] = useReducer(userReducer, parsedUser);

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}

export function useCurrentUser() {
    return useContext(UserStateContext);
}

export function useUserDispatch() {
    return useContext(UserDispatchContext);
}
