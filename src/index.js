import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GlobalProvider } from './contexts/GlobalContext';

import Login from './components/Login';

const LoginWrapper = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(true);

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

serviceWorker.unregister();
