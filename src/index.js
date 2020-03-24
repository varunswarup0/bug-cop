import store from './store';
import * as actions from './actionTypes';

// state = reducer(state, action);
// notfiy the subscribers

const unsubscribe = store.subscribe(() => {
	console.log('Store Changed', store.getState());
});

store.dispatch({
	type: actions.BUG_ADDED,
	payload: {
		description: 'Bug1'
	}
});

// unsubscribe();

store.dispatch({
	type: actions.BUG_REMOVED,
	payload: {
		id: 1
	}
});

console.log(store.getState());
