import { InMemoryCache, makeVar } from "@apollo/client";
import { ACCESS_TOKEN } from "../utils/constants";

/**
 * (client-side data sources - Reactive variables)
 */
// Reactive variables, which can store arbitrary data outside the cache while still updating queries that depend on them

export const isLoggedInVar = makeVar(!!localStorage.getItem(ACCESS_TOKEN));

export const isLoading = makeVar(false);

export const getCurrentVideoDuration = makeVar(0);

export const userPermissions = makeVar([]);

export const onJoinClickedVar = makeVar(false);

export const onForgotPasswordClickedVar = makeVar(false);

export const onLoginOkVar = makeVar(false);

export const systemInfoVar = makeVar({});

// Our cache
export const cache = new InMemoryCache({
    /**
     * We now have our client-side schema and our client-side data sources. On the server side, next we would define resolvers to connect the two. On the client side, however, we define field policies instead.
     */
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return isLoggedInVar();
                    },
                },
            },
        },
    },
});