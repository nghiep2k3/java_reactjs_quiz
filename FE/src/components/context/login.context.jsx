import { createContext, useState } from 'react';

export const LoginContext = createContext({
    isAuthenticated: false,
    user: {
        username: "",
        email: ""
    },
    setLogin: () => { }
});
export const LoginWrapper = (props) => {
    const [login, setLogin] = useState({
        isAuthenticated: false,
        user: {
            username: "",
            email: ""
        }
    });
    // ...
    return (
        <LoginContext.Provider value={{
            login, setLogin
        }}>
            {props.children}
        </LoginContext.Provider>
    );
}