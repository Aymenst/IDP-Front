/* eslint-disable */

import React from 'react';
import Loading from 'dan-components/Loading';
import loadable from '../utils/loadable';

// Landing Page
export const HomePage = loadable(() =>
    import ('./LandingPage/HomePage'), {
    fallback: <Loading/>,
});
export const SliderPage = loadable(() =>
    import ('./LandingPage/SliderPage'), {
    fallback: <Loading/>,
});

// Pages
export const Login = loadable(() =>
    import ('./Pages/Users/Login'), {
    fallback: <Loading/>,
});
export const LoginV2 = loadable(() =>
    import ('./Pages/Users/LoginV2'), {
    fallback: <Loading/>,
});
export const LoginV3 = loadable(() =>
    import ('./Pages/Users/LoginV3'), {
    fallback: <Loading/>,
});
export const Register = loadable(() =>
    import ('./Pages/Users/Register'), {
    fallback: <Loading/>,
});
export const RegisterV2 = loadable(() =>
    import ('./Pages/Users/RegisterV2'), {
    fallback: <Loading/>,
});
export const RegisterV3 = loadable(() =>
    import ('./Pages/Users/RegisterV3'), {
    fallback: <Loading/>,
});
export const ComingSoon = loadable(() =>
    import ('./Pages/ComingSoon'), {
    fallback: <Loading/>,
});
/*
export const Profile = loadable(() =>
    import ('./Pages/UserProfile'), {
    fallback: <Loading/>,
});
 */
export const BlankPage = loadable(() =>
    import ('./Pages/BlankPage'), {
    fallback: <Loading/>,
});
export const ResetPassword = loadable(() =>
    import ('./Pages/Users/ResetPassword'), {
    fallback: <Loading/>,
});
export const LockScreen = loadable(() =>
    import ('./Pages/Users/LockScreen'), {
    fallback: <Loading/>,
});

// Other
export const NotFound = loadable(() =>
    import ('./NotFound/NotFound'), {
    fallback: <Loading/>,
});
export const Error = loadable(() =>
    import ('./Pages/Error'), {
    fallback: <Loading/>,
});
export const Maintenance = loadable(() =>
    import ('./Pages/Maintenance'), {
    fallback: <Loading/>,
});
export const HelpSupport = loadable(() =>
    import ('./Pages/HelpSupport'), {
    fallback: <Loading/>,
});
export const Profile = loadable(() =>
    import ('./Pages/Profile'), {
    fallback: <Loading/>,
});
export const Template = loadable(() =>
    import ('./Pages/Template'), {
    fallback: <Loading/>,
});
export const UsersPage = loadable(() =>
    import ('./Pages/Users/UsersPage'), {
    fallback: <Loading/>,
});
export const MainPage = loadable(() =>
    import ('./Pages/MainPage'), {
    fallback: <Loading/>,
});
export const Data = loadable(() =>
    import ('./Pages/Data'), {
    fallback: <Loading/>,
});

