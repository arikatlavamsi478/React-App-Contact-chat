import { NavLink } from "react-router-dom";
import "../styles/Header.css";
export default function Header(props) {
	return (
		<div>
			<div className="d-flex flex-row">
				<nav className={"sidebar d-none d-sm-none d-md-block"}>
					<div className="sticky-top h100">
						<ul className="nav flex-column">
							<li className="nav-item mt-3">
								<div className="nav-link">
									<i className="fa fa-bars text-white" />
								</div>
							</li>
							<br />
							<li className="nav-item">
								<NavLink className="nav-link" activeClassName="active" exact to="/">
									<i className="fa fa-home" />
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" activeClassName="active" exact to="/contacts">
									<i className="fa fa-user" />
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" activeClassName="active" exact to="/settings">
									<i className="fa fa-gear" />
								</NavLink>
							</li>
						</ul>
					</div>
				</nav>
				{props.children}
			</div>
		</div>
	);
}
