import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
		<div className="container-fluid">
			<div className="ms-auto">
				<Link to="/demo" className="nav-link">
					<button className="btn btn-success">Add New Contact</button>
				</Link>
			</div>
		</div>
		</nav>
	);
};
