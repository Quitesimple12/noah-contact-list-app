import React, { useState, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js"

const Contact = (props) => {
	const { contactImage } = props;
	const {contactName} = props;
	const {contactAddress} = props;
	const {contactEmail} = props;
	const {contactPhone} = props;
	const { deleteContact } = useContext(Context)
	const [showModal, setShowModal] = useState(false);
	const deleteContactModal = (event) => {
		setShowModal(true);
		console.log(showModal);
	};
	const closeDeleteContact = (event) => {
		setShowModal(false);
		console.log(showModal);
	}
	const handleDelete = () => {
		deleteContact();
		closeDeleteContact();
	}
return (<div className="jumbotron jumbotron-fluid contact">
		<div className="d-flex">
			<img src= {contactImage}></img>
			<div>
				<h4>{contactName}</h4>
				<p className="cardtext">{contactAddress}</p>
				<p className="cardtext">{contactPhone}</p>
				<p className="cardtext">{contactEmail}</p>
			</div>
			<div className="ms-auto">
				<br />
				<br />
				<br />
				<Link to="/demo" className="nav-link">
					<button className="btn btn-success ms-auto btn-lg">Edit</button>
				</Link>
				<button onClick={deleteContactModal} className="btn btn-danger ms-auto btn-lg">Trash</button>
			</div>
		</div>
		{showModal && (
			<div className="modal" tabIndex="-1" role="dialog" style= {{ display: showModal ? 'block' : 'none'}}>
			<div className="modal-dialog" role="document">
			  <div className="modal-content">
				<div className="modal-header">
				  <h5 className="modal-title">Delete Contact?</h5>
				  <button onClick={closeDeleteContact} type="button" className="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				  </button>
				</div>
				<div className="modal-body">
				  <p>All contact info will be deleted!</p>
				</div>
				<div className="modal-footer">
				  <button onClick={handleDelete} type="button" className="btn btn-primary">Delete</button>
				  <button onClick={closeDeleteContact} type="button" className="btn btn-secondary" data-dismiss="modal">Don't Delete!</button>
				</div>
			  </div>
			</div>
		  </div>
		)}
	</div>
	);
};
export const Home = () => {
	return (<div>
	<Navbar />
	<ul>
		<Contact contactImage = {rigoImage} contactName = "Mike Schmidt" contactAddress="1155 help" contactPhone="314444444" contactEmail="hell@hlp.cm" />
		<Contact contactImage = {rigoImage}/>
		<Contact contactImage = {rigoImage}/>
		<Contact contactImage = {rigoImage}/>
	</ul>
</div>); }

export default Home;