import { FallbackSpinner } from "@/components/fallbackSpinner";
import { AllUsers } from "@/pages/dashboard/AllUser";
import RootLayout from "@/pages/layout/root.layout";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";


const NotFound = lazy(() => import("@/pages/error/notFound"));
const Login = lazy(() => import("@/pages/auth/login"));
const Register = lazy(() => import("@/pages/auth/signup"));
const EmailConfirmation = lazy(() => import("@/pages/auth/email-confirmation"));
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
            {
                path: "users",
                element: <AllUsers />
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
                path: "login/:provider/callback",
                element: <Login />,
                
            },
            {
                path: "sign-up",
                element: <Register />,
            },
            {
                path: "verify-email",
                element: <EmailConfirmation />,
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