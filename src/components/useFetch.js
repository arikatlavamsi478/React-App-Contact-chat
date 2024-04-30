import { useDebugValue, useEffect, useReducer, useState } from "react";

const intialState = {
	data: [],
	error: "",
	loading: "",
};

function apiReducer(state, action) {
	switch (action.type) {
		case "FETCH_DATA_REQUEST":
			return { ...state, loading: "yes" };
		case "FETCH_DATA_FAILURE":
			return { ...state, loading: "", error: action.payload };
		case "FETCH_DATA_SUCCESS":
			return { ...state, loading: "", data: action.payload };
		default:
			return state;
	}
}

export const useFetch = (url, method, headers, body = {}) => {
	const [ data, setData ] = useState([]);
	const [ state, dispatch ] = useReducer(apiReducer, intialState);
	useDebugValue(state);
	useEffect(
		() => {
			dispatch({ type: "FETCH_DATA_REQUEST" });
			let methodType = method;
			if (methodType === "post") {
				fetch(url, {
					method,
					headers,
					body: JSON.stringify(body),
				})
					.then((response) => response.json())
					.then((data) => {
						setData(data);
						dispatch({ type: "FETCH_DATA_SUCCESS", payload: data });
					})
					.catch((error) => {
						dispatch({ type: "FETCH_DATA_FAILURE", payload: error.toString() });
					});
			} else {
				fetch(url)
					.then((response) => response.json())
					.then((data) => {
						setData(data);
						dispatch({ type: "FETCH_DATA_SUCCESS", payload: data });
					})
					.catch((error) => {
						dispatch({ type: "FETCH_DATA_FAILURE", payload: error.toString() });
					});
			}
		},
		[ url ],
	);
	console.log(state);
	return state;
};
