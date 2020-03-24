import store from './store';
import { bugAdded, bugRemoved } from './actions';

// state = reducer(state, action);
// notfiy the subscribers

const unsubscribe = store.subscribe(() => {
	console.log('Store Changed', store.getState());
});

store.dispatch(bugAdded('Bug 1'));

// unsubscribe();

store.dispatch(bugRemoved(1));

console.log(store.getState());
