import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import React from "react";
import Login from "./pages/login/Login.jsx";
import {ToastContainer} from "react-toastify";
import Auth from "./components/auth/Auth.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        element: <Auth />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        path: '/dashboard',
                        element: <Dashboard />,
                    }
                ]
            }
        ]
    }
]);


export default function App() {
    return <MantineProvider>
        <RouterProvider router={router} />
    </MantineProvider>;
}
