import { sha256 } from 'js-sha256';

export function auth(password) {
	const HASHED_PASSWORD =
		'1a9cd8380bf9cf92c4c24524fc092150185564cf73cf9de648fe92d80022b5b5';
	const thisHashedPassword = sha256(password);

	return thisHashedPassword === HASHED_PASSWORD;
}
