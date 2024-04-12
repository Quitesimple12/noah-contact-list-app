import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Update = () => {
	const {contactid} = useParams()
	const navigate = useNavigate();
	const [fullName, setFullName] = useState("")
	const [address, setAddress] = useState("")
	const [phone, setPhone] = useState("")
	const [email, setEmail] = useState("")
	const { store, actions } = useContext(Context);


	const handleUpdate = (e) => {
		e.preventDefault();
		const contact = {
			name: fullName,
			address,
			phone,
			email
		}
		actions.updateContact(contactid, contact);
		setFullName("");
        setEmail("");
        setPhone("");
        setAddress("");
		navigate("/")
	}

	return (
	<div>
		<div className="d-flex justify-content-center">
			<h1>Edit Contact</h1>
		</div>

		<label style = {{marginLeft: '127px'}}>Full Name</label>
		<div className= "d-flex justify-content-center">
			<input className="col-10 rounded" type="text" value= {fullName} placeholder="Full Name" 
			onChange={(e) => setFullName(e.target.value)} />
		</div>

		<label style = {{marginLeft: '127px', marginTop: '30px'}}>Email</label>
		<div className= "d-flex justify-content-center">
			<input className="col-10 rounded" type="text" value={address} placeholder="Enter Email" 
			onChange={(e) => setAddress(e.target.value)} />
		</div>

		<label style = {{marginLeft: '127px', marginTop: '30px'}}>Phone</label>
		<div className= "d-flex justify-content-center">
			<input className="col-10 rounded" type="text" value={phone} placeholder="Enter Phone Number" 
			onChange={(e) => setPhone(e.target.value)} />
		</div>

		<label style = {{marginLeft: '127px', marginTop: '30px'}}>Address</label>
		<div className= "d-flex justify-content-center">
			<input className="col-10 rounded" type="text" value={email} placeholder="Enter Address" 
			onChange={(e) => setEmail(e.target.value)} />
		</div>

		<Link to="/">
			<button className="btn btn-success" type="submit" onClick={handleUpdate} style={{marginLeft: '127px', marginTop: '20px'}}>Save Changes</button>
		</Link>

		<div className="container">
			<br />
			<Link to="/">
				Get back to contacts
			</Link>
		</div>
	</div>
	);
};