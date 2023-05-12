import React from 'react';
import { RouterProvider } from "react-router-dom";
import './styles.css';
import { router } from './routes';

export function App() {
	return <RouterProvider router={router} />
}
