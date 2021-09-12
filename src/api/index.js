import request from 'request';

const handler = async () => {
	try {
		const URL =
			'https://docs.google.com/spreadsheets/d/1ZFtupEl7QjTsp7aucdEaCU_S86FN7lVB/edit?usp=sharing&ouid=108801184981324530479&rtpof=true&sd=true';

		const result = await new Promise((resolve, reject) => {
			request(URL, (error, response, body) => {
				if (error) {
					reject(error);
				}

				resolve(body);
			});
		});

		return {
			body: result.toString(),
			headers: {
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Origin': '*',
			},
			statusCode: 200,
		};
	} catch (error) {
		return {
			body: JSON.stringify({ message: error.message, stack: error.stack }),
			headers: {
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Origin': '*',
			},
			statusCode: 500,
		};
	}
};

export default handler;
