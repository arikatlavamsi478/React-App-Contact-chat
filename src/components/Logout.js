import React, { forwardRef, useImperativeHandle } from "react";

export const Logout = forwardRef((props, ref) => {
	useImperativeHandle(ref, () => ({
		logoutUser: () => {
			console.log("User Loggedout successfully");
		},
	}));
	return (
		<div>
			<button {...props}>Logout</button>
		</div>
	);
});
