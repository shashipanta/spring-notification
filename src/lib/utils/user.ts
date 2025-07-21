
import { get } from 'svelte/store';
import { user } from '$lib/custom-stores/UserInfo-store';

export function getLoggedInUser() {
	return get(user); // client-side only
}

export function getLoggedInUserId() {
	const loggedInUser = getLoggedInUser();
	console.log("Logged in user: ", loggedInUser);
	return loggedInUser ? loggedInUser.id : null;
}
