import { addBug } from '../bugs';
import configureStore from '../configureStore';

describe('bugsSlice', () => {
	it('should handle addBug action', async () => {
		const store = configureStore();
		const bug = { description: 'a' };
		await store.dispatch(addBug(bug));
		console.log(store.getState());
		// expect(store.getState().entities.bugs.list).toHaveLength(1);
	});
});
