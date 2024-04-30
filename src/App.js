import { Route, Switch } from "react-router";
import "./App.css";
import Contacts from "./components/Contacts";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

function App() {
	return (
		<div>
			<Header>
				<Switch>
					<Route path="/contacts" component={Contacts} />
					<Route path="/settings">
						<h1 className="ml-5 mt-3">Settings</h1>
					</Route>
					<Route path="/" exact component={Dashboard} />
					<Route path="*">
						<div className="ml-5 mt-3">
							<h1>404 Not Found!</h1>
						</div>
					</Route>
				</Switch>
			</Header>
		</div>
	);
}

export default App;
