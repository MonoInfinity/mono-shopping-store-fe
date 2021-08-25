interface IRouter {
        link: string;
}

type TRouters = 'register' | 'login' | 'home' | 'viewMyProfile' | 'changePassword' | 'viewAllUser' | 'updateUserProfile' | 'viewUserProfile';

export const routers: Record<TRouters, IRouter> = {
        home: {
                link: '/',
        },

        login: {
                link: '/auth/login',
        },
        register: {
                link: '/auth/register',
        },
        viewMyProfile: {
                link: '/account/profile',
        },
        changePassword: {
                link: '/account/password',
        },
        viewAllUser: {
                link: '/account/all',
        },
        updateUserProfile: {
                link: '/account/update-profile',
        },
        viewUserProfile: {
                link: '/account/user',
        },
};
