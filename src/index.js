import configureStore from './store/configureStore';

const store = configureStore();

store.dispatch({
	type: 'apiCallBegan', //apiRequest,
	payload: {
		url: '/bugs',
		onSucess: 'bugsReceived',
		onError: 'apiReqquestFailed'
	}
});
