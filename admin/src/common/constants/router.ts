interface IRouter {
        link: string;
}

type TRouters = "register" | "login" | "home" | "viewProfile" | "changePassword" | "viewAllUser" | "updateUserProfile";

const config: Record<TRouters, IRouter> = {
        home: {
                link: "/",
        },

        login: {
                link: "/auth/login",
        },
        register: {
                link: "/auth/register",
        },
        viewProfile: {
                link: "/account/profile",
        },
        changePassword: {
                link: "/account/password",
        },
        viewAllUser: {
                link: "/account/all",
        },
        updateUserProfile: {
                link: "/account/update-profile",
        },
};

export default config;
