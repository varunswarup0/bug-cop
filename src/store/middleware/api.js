import axios from 'axios';

const api = ({ dispatch }) => next => async action => {
	if (action.type !== 'apiCallBegan') return next(action);
	next(action);
	const { url, method, data, onSucess, onError } = action.payload;

	try {
		const response = await axios.request({
			baseURL: 'http://localhost:9001/api',
			url,
			method,
			data
		});
		dispatch({ type: onSucess, payload: response.data });
	} catch (error) {
		dispatch({ type: onError, payload: error });
	}
};

export default api;
