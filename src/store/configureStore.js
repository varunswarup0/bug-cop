import reducer from './bugs';

export default function configureStore() {
	const store = createStore(reducer, devToolsEnhancer({ trace: true }));
	return store;
}
