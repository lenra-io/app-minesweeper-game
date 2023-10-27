import styled from 'styled-components';

export const Wrapper = styled.div`
	margin-top: 30px;
	text-align: left;
`;

export const RadioGroup = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;
	padding-bottom: 10px;
`;

export const Radio = styled.button`
	color: ${props => props.selected ? 'white' : 'black'};
	background-color: ${props => props.selected ? '#206592' : 'white'};
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 14px;
	outline: none;
	padding: 8px 16px;
	transition-duration: 0.2s;
	&:hover {
		background-color: ${props => props.selected ? '#206592' : 'lightskyblue'};
	}
`;