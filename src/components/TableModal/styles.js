import styled from 'styled-components';

export const TableWrapper = styled.div`
	table {
		border: 1px solid #ccc;
		width: 100%;
	}

	tr {
		text-align: center;
		font-size: 16px;
	}

	tr:nth-child(even) {
		background: #ddd;
	}

	tr:nth-child(odd) {
		background: #fff;
	}

	td {
		padding: 2px;
	}

	th {
		background: #fff;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		min-width: 80px;
		min-height: 50px;
		padding: 10px 0;
		font-size: 18px;
	}
`;
