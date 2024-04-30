import React, { useMemo, useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";
import { Logout } from "./Logout";

function sum(a, b) {
	for (let i = 0; i < 1000000000; i++) {
		// do something
	}
	return parseInt(a) + parseInt(b);
}
export default function Dashboard() {
	const [ a, setA ] = useState(10);
	const [ b, setB ] = useState(10);
	const [ username, setUsername ] = useState("");
	const [ status, setStatus ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ totalSum, setSum ] = useState(0);
	// const sumOfTwo = sum(a, b);
	const sumOfTwo2 = useMemo(
		() => {
			return sum(a, b);
		},
		[ a, b ],
	);
	const sumOfTwo3 = useCallback(
		(number) => {
			return parseInt(a) + parseInt(number);
		},
		[ a ],
	);
	// const theme = {
	// 	backgroundColor: status ? "black" : "white",
	// 	color: status ? "white" : "black",
	// 	padding: 20,
	// };
	const theme = useMemo(
		() => {
			return {
				backgroundColor: status ? "black" : "white",
				color: status ? "white" : "black",
				padding: 20,
			};
		},
		[ status ],
	);

	useEffect(
		() => {
			console.log("Updating theme");
			setTimeout(() => {
				setLoading(false);
			}, 3000);
		},
		[ theme ],
	);

	const logoutRef = useRef();
	const handleClick = () => {
		logoutRef.current.logoutUser();
	};

	useEffect(() => {
		console.log("Effect1");
	}, []);
	useEffect(() => {
		console.log("Effect2");
	}, []);
	useLayoutEffect(() => {
		console.log("Layout effect");
		setLoading(true);
	}, []);

	return (
		<div style={theme}>
			{loading ? (
				<div>
					<h1>Loading...</h1>
				</div>
			) : (
				<div>
					<h1>Dashboard</h1>
					<Logout onClick={handleClick} ref={logoutRef} />
				</div>
			)}
			{/* <input type="number" value={a} onChange={(e) => setA(e.target.value)} /> */}
			{/* <h3>Sum: {sumOfTwo2}</h3> */}
			{/* <h3>Sum: {totalSum}</h3>
			<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
			<br />
			<button onClick={() => setStatus(!status)}>Update Theme</button>
			<br />
			<button onClick={() => setSum(sumOfTwo3(10))}>Sum</button> */}
		</div>
	);
}
