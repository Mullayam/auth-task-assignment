import { FallbackSpinner } from "@/components/fallbackSpinner";
import RootLayout from "@/pages/layout/root.layout";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";


const NotFound = lazy(() => import("@/pages/error/notFound"));
const Login = lazy(() => import("@/pages/auth/login"));
const Register = lazy(() => import("@/pages/auth/signup"));
const EmailVerificaton = lazy(() => import("@/pages/auth/email-verificaton"));
const ResetPassword = lazy(() => import("@/pages/auth/password-reset"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const AuthLayout = lazy(() => import("@/pages/auth/auth.layout"));


export const router = createBrowserRouter([

    {
        path: "/",
        element: <RootLayout />,
        errorElement: <FallbackSpinner />,
        children: [
            {
                path: "",
                element: <Dashboard />
            },

        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        errorElement: <FallbackSpinner />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "sign-up",
                element: <Register />,
            },
            {
                path: "email-verification",
                element: <EmailVerificaton />,
            },
            {
                path: "reset-password",
                element: <ResetPassword />,
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    },
])