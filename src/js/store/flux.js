const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contactList: []
		},
		actions: {
			createAgenda: () => {
				fetch("https://playground.4geeks.com/contact/agendas/noahagenda")
					.then(response => response.json()
					)
					.then(result => {
						if (result.detail && result.detail.includes("doesn't exist")) {
							const options = {
								method: "POST",
								headers: {
									"Content-Type":
										"application/json",
								},
								body: JSON.stringify({})
							}
							fetch("https://playground.4geeks.com/contact/agendas/noahagenda", options)
							.then(response => response.json())
							.then(result => console.log(result))
						}
						else{getActions().getAgendaContacts()}
					})

			},
			createContact: (name, phone, email, address)  => {
				const contact = {
					"name": name,
					"phone": phone,
					"email": email,
					"address": address
				}
				fetch('https://playground.4geeks.com/contact/agendas/noahagenda/contacts', {
					method: "POST",
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
			},
			getAgendaContacts: () => {
				return fetch("https://playground.4geeks.com/contact/agendas/noahagenda/contacts", {
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
						setStore({contactList: data.contacts})
					})
					.catch(error => {
						console.error(error);
					})
			},
			updateContact: (contactid, contact)  => {
				fetch(`https://playground.4geeks.com/contact/agendas/noahagenda/contacts/${contactid}`, {
					method: "PUT",
					body: JSON.stringify({
						name: contact.name,
						phone: contact.phone,
						email: contact.email,
						address: contact.address,
					}),

			
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
						console.log(data)
						getActions().getAgendaContacts();
					})
					.catch(error => {
						console.log(error);
					});
			},

			deleteContact: (contactid)  => {
				fetch(`https://playground.4geeks.com/contact/agendas/noahagenda/contacts/${contactid}`, {
					method: "DELETE",
			
					headers: {
						"Content-Type": "application/json"
					}
				})
				.then(resp => {
					if (!resp.ok) {
						throw new Error();
					}
					console.log(resp.status);
				})
				.then(data => {
					console.log(data)
					getActions().getAgendaContacts
					setStore({contactList: getStore().contactList.filter(contact => contact.id !== contactid)})
				})
				.catch(error => {
					console.error(error);
				});
			}
		}
			
		
			//reset the global store
			//setStore({ demo: demo });

		}
	};
// const fetchData = async () => {
// 	try {
// 		const allAgendas = await getAllAgendas();
// 		const agendaContacts = await getAgendaContacts();
// 		console.log(allAgendas, agendaContacts);

// 		setState(prevState =>
// 		({
// 			...prevState,
// 			store: allAgendas,
// 			actions: {}
// 		}))
// 	}
// 	catch (error) {
// 		console.log(error)
// 	}
// }
// fetchData()

// function getAllAgendas() {
// 	return fetch("https://playground.4geeks.com/apis/fake/contact/agenda", {
// 		method: "GET",
// 		headers: { "Content-type": "application/json" }
// 	})
// 		.then(resp => {
// 			if (!resp.ok) {
// 				throw new Error(resp.status);
// 			}
// 			return resp.json();
// 		})
// 		.then(data => {
// 			console.log(data)
// 		})
// 		.catch(error => {
// 			console.error(error);
// 		})
// }


// function getContact() {
// 	return fetch("https://playground.4geeks.com/apis/fake/contact/62912201834", {
// 		method: "GET",
// 		headers: { "Content-type": "application/json" }
// 	})
// 		.then(resp => {
// 			if (!resp.ok) {
// 				throw new Error(resp.status);
// 			}
// 			return resp.json();
// 		})
// 		.then(data => {
// 			console.log(data)
// 		})
// 		.catch(error => {
// 			console.error(error);
// 		})
// }

// function deleteContact() {
// 	return fetch("https://playground.4geeks.com/apis/fake/contact/7864445566", {
// 		method: "DELETE",
// 		headers: { "Content-type": "application/json" }
// 	})
// 		.then(resp => {
// 			if (!resp.ok) {
// 				throw new Error(resp.status);
// 			}
// 			console.log("contact deleted successfully!");
// 		})
// 		.catch(error => {
// 			console.error(error);
// 		})
// }
// const actions = ({
// 	...state.actions,
// 	deleteContact
// })
// setState({
// 	...state,
// 	actions
// });

export default getState;
