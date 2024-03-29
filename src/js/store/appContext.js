import React, { useState, useEffect } from "react";
import getState from "./flux.js";
import { NormalModuleReplacementPlugin } from "webpack";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {

	const StoreWrapper = props => {
		const [state, setState] = useState({
			store: null,
			actions: null
		});

		useEffect(() => {
			const fetchData = async () => {
				try {
					const allAgendas = await getAllAgendas();
					const agendaContacts = await getAgendaContacts();
					console.log(allAgendas, agendaContacts);

					setState(prevState =>
						({
							...prevState,
							store: allAgendas,
							actions: {}
						}))
				}
				catch(error) {
					console.log(error)
				}
			}
			fetchData()
		}, []);

		function getAllAgendas() {
			return fetch("https://playground.4geeks.com/apis/fake/contact/agenda", {
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
		function createContact(event) {
			fetch('https://playground.4geeks.com/apis/fake/contact/', {
				  method: "POST",
				  body: JSON.stringify({
					"full_name": "Dave Bradley",
					"email": "dave@gmail.com",
					"agenda_slug": "noahagenda",
					"address":"47568 NW 34ST, 33434 FL, USA",
					"phone":"7864445566"}),
				
				  headers: {
					"Content-Type": "application/json"
				}
				})
				.then(resp => {
					console.log(resp.ok);
					console.log(resp.status);
			
					return resp.json();
				})
				.then(data => {
					console.log(data);
				})
				.catch(error => {
					console.log(error);
				});
			}
			function getContact() {
				return fetch("https://playground.4geeks.com/apis/fake/contact/62912201834", {
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
			function deleteContact() {
				return fetch("https://playground.4geeks.com/apis/fake/contact/7864445566", {
					method: "DELETE",
					headers: { "Content-type": "application/json" }
				})
				.then(resp => {
					if (!resp.ok) {
						throw new Error(resp.status);
					}
					console.log("contact deleted successfully!");
				})
				.catch(error => {
					console.error(error);
				})
			}
			const actions = ({
				...state.actions,
				deleteContact
			})
			setState({
				...state,
				actions
			});
			
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
		};
		return StoreWrapper;	
	};



export default injectContext;
