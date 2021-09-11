import React, { createContext, useContext, useMemo, useState } from 'react';
import { downloadAndParseData } from '../services/data.service';

const GlobalContext = createContext();

export function GlobalProvider(props) {
	const [state, setState] = useState({
		ifData: {},
		rawIfData: [],
	});

	const value = useMemo(() => {
		return {
			setState,
			state,
		};
	}, [state]);

	return <GlobalContext.Provider value={value} {...props} />;
}

export function useGlobal() {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error('useGlobal must be used inside a GlobalProvider');
	}

	const { state, setState } = context;

	const setIfData = (ifData) => {
		setState((prevState) => ({
			...prevState,
			ifData,
		}));
	};

	const setRawIfData = (rawIfData) => {
		setState((prevState) => ({
			...prevState,
			rawIfData,
		}));
	};

	const getIfData = async () => {
		const LOCAL_STORAGE_KEY = 'IF_DATA';
		if (Object.keys(state.ifData).length === 0) {
			const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
			if (localStorageData) {
				setIfData(JSON.parse(localStorageData));
			}

			const remoteData = await downloadAndParseData();
			setIfData(remoteData.parsedData);
			setRawIfData(remoteData.rawData);
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(remoteData));
		}
	};

	return {
		getIfData,
		ifData: state.ifData,
		rawIfData: state.rawIfData,
	};
}
