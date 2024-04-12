import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<ul className="list-group">
				{store.demo.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between"
							style={{ background: item.background }}>
							<Link to={"/single/" + index}>
								<span>Link to: {item.title}</span>
							</Link>
							{// Conditional render example
							// Check to see if the background is orange, if so, display the message
							item.background === "orange" ? (
								<p style={{ color: item.initial }}>
									Check store/flux.js scroll to the actions to see the code
								</p>
							) : null}
							<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
								Change Color
							</button>
						</li>
					);
				})}
			</ul>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};



function getAgendaContacts() {
	return fetch("https://playground.4geeks.com/apis/fake/contact/agenda/noahagenda", {
		method: "GET",
		headers: { "Content-type": "application/json" }
	})
	.then(resp => {
		if (!resp.ok) {
			throw new Error(resp.status);
		}
		return resp.json();
	})
	.then(data => {
		console.log(data)
	})
	.catch(error => {
		console.error(error);
	})
}

const fetchData = async () => {
	try {
		const allAgendas = await getAllAgendas();
		const agendaContacts = await getAgendaContacts();
		console.log(allAgendas, agendaContacts);
	}
	catch(error) {
		console.log(error)
	}
}

const [state, setState] = useState(() => getState({
	getStore: () => state.store,
	getActions: () => state.actions,
	setStore: updatedStore => 
		setState(prevState => ({
			store: Object.assign(prevState.store, updatedStore),
			actions: {...prevState.actions}
		}))
}));

updateContact: (contactid, name, phone, email, address)  => {
	const contact = {
		"contactid": contactid,
		"name": name,
		"phone": phone,
		"email": email,
		"address": address
	}
	fetch(`https://playground.4geeks.com/contact/agendas/noahagenda/contacts/${contactid}`, {
		method: "PUT",
		body: JSON.stringify(contact),

		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(resp => {
			console.log(resp.ok);
			if (!resp.ok) {
				throw new Error()
			}
			console.log(resp.status);

			return resp.json();
		})
		.then(data => {
			console.log(data);
			setStore({contactList: [...getStore().contactList, contact]})
			getActions().getAgendaContacts()
		})
		.catch(error => {
			console.log(error);
		});
}


updateContact: (contactid, name, phone, email, address)  => {
	const contact = {
		"contactid": contactid,
		"name": name,
		"phone": phone,
		"email": email,
		"address": address
	}
	fetch(`https://playground.4geeks.com/contact/agendas/noahagenda/contacts/${contactid}`, {
		method: "PUT",
		body: JSON.stringify(contact),

		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(resp => {
			console.log(resp.ok);
			if (!resp.ok) {
				throw new Error()
			}
			console.log(resp.status);

			return resp.json();
		})
		.then(updatedContact => {
			const updatedContactList = getStore().contactList.map(item => {
				if (item.id === contactid) {
					return updatedContact;
				}
				else return item;
			});
			setStore({ contactList: updatedContactList});
			
		})
		.catch(error => {
			console.log(error);
		});
}



import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Update = () => {
	const {contactid} = useParams()
	const [fullName, setFullName] = useState("")
	const [address, setAddress] = useState("")
	const [phone, setPhone] = useState("")
	const [email, setEmail] = useState("")
	const { store, actions } = useContext(Context);

	let contact = store.contacts.find(element => {
		return element.contactid
	})

	const handleUpdate = () => {
		actions.updateContact(contactid, fullName, phone, email, address)
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
			<button className="btn btn-success" onClick={handleUpdate} style={{marginLeft: '127px', marginTop: '20px'}}>Save Changes</button>
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

export const Home = () => {
	const { store, actions } = useContext(Context);
	return (<div>
	<Navbar />
	<ul>
		{store.contactList.map(contact => 
		<Contact 
		key={contact.id}
        contactid={contact.id}
		contactImage = {rigoImage} 
		contactName = {contact.name} 
		contactAddress= {contact.address}
		contactPhone= {contact.phone}
		contactEmail= {contact.email} />)}
		
		{/* <Contact contactImage = {rigoImage}/>
		<Contact contactImage = {rigoImage}/>
		<Contact contactImage = {rigoImage}/> */}
	</ul>
</div>); }

import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Updat = () => {
    const { contactid } = useParams();
    const { store, actions } = useContext(Context);

    const contact = store.contactList.find(contact => contact.id === parseInt(contactid));

    const [contactInfo, setContactInfo] = useState({
        fullName: contact ? contact.name : "",
        address: contact ? contact.address : "",
        phone: contact ? contact.phone : "",
        email: contact ? contact.email : ""
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setContactInfo({ ...contactInfo, [name]: value });
    };

    const handleUpdate = () => {
        actions.updateContact(contactid, contactInfo.fullName, contactInfo.phone, contactInfo.email, contactInfo.address);
    };

    return (
        <div>
            <div className="d-flex justify-content-center">
                <h1>Edit Contact</h1>
            </div>
            <label style={{ marginLeft: '127px' }}>Full Name</label>
            <div className="d-flex justify-content-center">
                <input
                    className="col-10 rounded"
                    type="text"
                    name="fullName"
                    value={contactInfo.fullName}
                    placeholder="Full Name"
                    onChange={handleInputChange}
                />
            </div>
            <label style={{ marginLeft: '127px', marginTop: '30px' }}>Email</label>
            <div className="d-flex justify-content-center">
                <input
                    className="col-10 rounded"
                    type="text"
                    name="email"
                    value={contactInfo.email}
                    placeholder="Enter Email"
                    onChange={handleInputChange}
                />
            </div>
            <label style={{ marginLeft: '127px', marginTop: '30px' }}>Phone</label>
            <div className="d-flex justify-content-center">
                <input
                    className="col-10 rounded"
                    type="text"
                    name="phone"
                    value={contactInfo.phone}
                    placeholder="Enter Phone Number"
                    onChange={handleInputChange}
                />
            </div>
            <label style={{ marginLeft: '127px', marginTop: '30px' }}>Address</label>
            <div className="d-flex justify-content-center">
                <input
                    className="col-10 rounded"
                    type="text"
                    name="address"
                    value={contactInfo.address}
                    placeholder="Enter Address"
                    onChange={handleInputChange}
                />
            </div>
            <Link to="/">
                <button
                    className="btn btn-success"
                    onClick={handleUpdate}
                    style={{ marginLeft: '127px', marginTop: '20px' }}
                >
                    Save Changes
                </button>
            </Link>
            <div className="container">
                <br />
                <Link to="/">Get back to contacts</Link>
            </div>
        </div>
    );
};

const findContactId = (id) => {
	const contact = store.contacts.find((getContactId) => getContactId["id"] == id);
	setFullName(contact.fullName)
	setAddress(contact.address)
	setPhone(contact.phone)
	setEmail(contact.email)
}