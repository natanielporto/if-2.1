import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LoginWrapper } from './styles';
import LoginLogo from '../../assets/mapeamento-final.png';

import auth from '../../services/auth.service';

const Login = (props) => {
	const { setIsAuthenticated } = props;

	const [password, setPassword] = useState('');
	const [errorPassword, setErrorPassword] = useState(false);

	const checkAuthentication = () => {
		if (auth(password)) {
			return setIsAuthenticated(true);
		}

		return setErrorPassword(true);
	};

	return (
		<LoginWrapper>
			<div className="logo">
				<img alt="Logo Mapeamento" src={LoginLogo} />
			</div>
			<div className="credentials">
				<p className="text-credentials">
					O acesso é restrito com senha, para mais informações entre em contato
					com o setor responsável.
				</p>

				<input
					autoComplete="new-password"
					className={errorPassword ? 'wrong-password' : ''}
					id="password"
					name="password"
					onChange={(event) => {
						setPassword(event.target.value);
						setErrorPassword(false);
					}}
					placeholder="SENHA"
					type="password"
					value={password}
				/>
				{errorPassword && (
					<span className="wrong-password">Senha incorreta!</span>
				)}
				<br />
				<button onClick={checkAuthentication} type="submit">
					AUTENTICAR
				</button>
			</div>
		</LoginWrapper>
	);
};

Login.propTypes = {
	setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
