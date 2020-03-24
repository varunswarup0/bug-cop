import store from './store';
import { bugAdded, bugRemoved, bugResolved } from './actions';

// state = reducer(state, action);
// notfiy the subscribers

const unsubscribe = store.subscribe(() => {
	console.log('Store Changed', store.getState());
});

store.dispatch(bugAdded('Bug 1'));

store.dispatch(bugResolved(1));

// unsubscribe();

store.dispatch(bugRemoved(1));
