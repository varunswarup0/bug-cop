import configureStore from './store/configureStore';
import { addBug, resolveBug, assignBugToUser, loadBugs } from './store/bugs';
import entities from './store/entities';

const store = configureStore();

//UI Layer
store.dispatch(loadBugs());
setTimeout(() => store.dispatch(assignBugToUser(1, 5)), 2000);
