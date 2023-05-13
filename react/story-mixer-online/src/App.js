import React from 'react';
import { RouterProvider } from "react-router-dom";
import './styles.css';
import { router } from './routes';
import { AppContextSource, AppContext } from './store';

export function App() {
	
	return (
		<AppContext.Provider value={AppContextSource()}>
			<RouterProvider router={router} />
		</AppContext.Provider>
	)
}
