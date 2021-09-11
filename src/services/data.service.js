const DATA_ENDPOINT =
	'https://ool266yypd.execute-api.us-east-1.amazonaws.com/prd/';

export async function download() {
	try {
		const resposta = await fetch(DATA_ENDPOINT);
		const dados = await resposta.text();
		return dados.split('\n').slice(1);
	} catch (error) {
		console.error('Error while trying to fetch data.');
		console.error(error);
	}

	return '';
}

function parseData(data) {
	const intermediateRepresentation = data.map((line) => {
		const [
      _country, // eslint-disable-line
			initials,
			instituteName,
			state,
			region,
			campusName,
			city,
			latitude,
			longitude,
			visualArts,
			music,
			theater,
			dance,
      _total, // eslint-disable-line
			integratedCourse,
		] = line.split(',');

		return {
			campusName,
			city,
			initials,
			instituteName,
			integratedCourse,
			latitude,
			longitude,
			region,
			state,
			teachers: {
				dance: dance === '' ? 0 : parseInt(dance, 10),
				music: music === '' ? 0 : parseInt(music, 10),
				theater: theater === '' ? 0 : parseInt(theater, 10),
				visualArts: visualArts === '' ? 0 : parseInt(visualArts, 10),
			},
		};
	});

	const parsedData = [];
	for (const campus of intermediateRepresentation) {
		let region = parsedData.find(
			(countryRegion) => countryRegion.name === campus.region
		);
		if (!region) {
			region = { children: [], name: campus.region };
			parsedData.push(region);
		}

		let state = region.children.find(
			(regionState) => regionState.name === campus.state
		);
		if (!state) {
			state = { children: [], name: campus.state };
			region.children.push(state);
		}

		let institute = state.children.find(
			(stateInstitute) => stateInstitute.initials === campus.initials
		);
		if (!institute) {
			institute = {
				children: [],
				initials: campus.initials,
				name: campus.instituteName,
			};
			state.children.push(institute);
		}

		let city = institute.children.find(
			(instituteCity) => instituteCity.name === campus.city
		);
		if (!city) {
			city = { children: [], name: campus.city };
			institute.children.push(city);
		}

		const campusData = {
			integratedCourse: campus.integratedCourse.toLowerCase().trim() === 's',
			latitude: campus.latitude,
			longitude: campus.longitude,
			name: campus.campusName,
			teachers: campus.teachers,
		};
		city.children.push(campusData);
	}

	return { children: parsedData, name: 'root' };
}

export async function downloadAndParseData() {
	const downloadedData = await download();
	return {
		parsedData: parseData(downloadedData),
		rawData: downloadedData,
	};
}
