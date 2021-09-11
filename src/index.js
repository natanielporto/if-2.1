import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GlobalProvider } from './contexts/GlobalContext';

import Login from './components/Login';

const LoginWrapper = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	// eslint-disable-next-line no-process-env
	if (!isAuthenticated && process.env.NODE_ENV !== 'development') {
		return <Login setIsAuthenticated={setIsAuthenticated} />;
	}

	return (
		<React.StrictMode>
			<GlobalProvider>
				{isAuthenticated && <App setIsAuthenticated={setIsAuthenticated} />}
				{!isAuthenticated && <Login setIsAuthenticated={setIsAuthenticated} />}
			</GlobalProvider>
		</React.StrictMode>
	);
};

ReactDOM.render(<LoginWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
