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

export default getState;

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