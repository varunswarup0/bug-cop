import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import moment from 'moment';

let lastId = 0;

const slice = createSlice({
	name: 'bugs',
	initialState: {
		list: [],
		loading: false,
		lastFetch: null
	},
	reducers: {
		bugsRequested: (bugs, action) => {
			bugs.loading = true;
		},
		bugsReceived: (bugs, action) => {
			bugs.list = action.payload;
			bugs.loading = false;
			bugs.lastFetch = Date.now();
		},
		bugAdded: (bugs, action) => {
			bugs.list.push({
				id: ++lastId,
				description: action.payload.description,
				resolved: false
			});
		},
		bugsRequestFailed: (bugs, action) => {
			bugs.loading = false;
		},
		bugResolved: (bugs, action) => {
			const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
			bugs.list[index].resolved = true;
		},
		bugAssignedToUser: (bugs, action) => {
			const { bugId, userId } = action.payload;
			const index = bugs.list.findIndex(bug => bug.id === bugId);
			bugs.list[index].userId = userId;
		}
	}
});

export const {
	bugAdded,
	bugResolved,
	bugAssignedToUser,
	bugsReceived,
	bugsRequested,
	bugsRequestFailed
} = slice.actions;
export default slice.reducer;

//Action Creators
const url = '/bugs';

//() => fn(dispatch, getState)
export const loadBugs = () => (dispatch, getState) => {
	const { lastFetch } = getState().entities.bugs;

	const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
	if (diffInMinutes < 10) return;

	dispatch(
		apiCallBegan({
			url,
			onStart: bugsRequested.type,
			onSucess: bugsReceived.type,
			onError: bugsRequestFailed.type
		})
	);
};

//Selector
export const getUnresolvedBugs = createSelector(
	state => state.entities.bugs,
	state => state.entities.projects,
	(bugs, projects) => bugs.filter(bug => !bug.resolved)
);

export const getBugsByUser = userId =>
	createSelector(
		state => state.entities.bugs,
		bugs => bugs.filter(bug => bug.userId === userId)
	);
