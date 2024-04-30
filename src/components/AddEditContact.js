import React, { useRef, useState, useEffect } from "react";
import { ContactForm } from "./ContactForm";
import { useContacts } from "./Contacts";
export default function AddEditContact(props) {
	const [ validate, setValidate ] = useState(false);
	const values = useContacts();
	const [ user, setUser ] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		company: "",
		address: "",
	});
	const handleChange = (name, value) => {
		let oldUser = { ...user };
		oldUser[name] = value;
		setUser((prevState) => {
			return { ...prevState, ...oldUser };
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		props.addData(user);
		setUser({
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			company: "",
			address: "",
		});
		setValidate(false);
		closeRef.current.click();
	};
	const handleEditContact = (e) => {
		e.preventDefault();
		const oldContacts = [ ...values.contacts ];
		console.log(oldContacts);
		const findIndex = oldContacts.findIndex((contact) => contact.id === props.editUser.id);
		// oldContacts.splice(findIndex, 1);
		oldContacts[findIndex] = user;
		console.log(oldContacts);
		props.setContacts(oldContacts);
		setUser({
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			company: "",
			address: "",
		});
		setValidate(false);
		closeRef.current.click();
	};
	const closeRef = useRef();
	useEffect(
		() => {
			if (Object.keys(props.editUser).length > 0) {
				setUser(props.editUser);
			}
		},
		[ props.editUser ],
	);
	return (
		<div className="modal-dialog" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title" id="exampleModalLabel">
						Add/Edit Contact
					</h5>
					<button
						type="button"
						ref={closeRef}
						className="close"
						id="closemodal"
						data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="modal-body">
					<form
						className={validate ? "needs-validation was-validated" : "needs-validation"}
						onSubmit={(e) => (user.id ? handleEditContact(e) : handleSubmit(e))}>
						<div className="form-row">
							<ContactForm
								type="text"
								label="First Name"
								size={6}
								index="1"
								pattern="^[a-zA-Z]*"
								max="20"
								value={user.firstName}
								setValue={(value) => handleChange("firstName", value)}
							/>
							<ContactForm
								type="text"
								label="Last Name"
								size={6}
								index="2"
								pattern="^[a-zA-Z]*"
								max="20"
								value={user.lastName}
								setValue={(value) => handleChange("lastName", value)}
							/>
							<ContactForm
								type="email"
								label="Email"
								size={6}
								index="3"
								pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
								max="50"
								value={user.email}
								setValue={(value) => handleChange("email", value)}
							/>
							<ContactForm
								type="text"
								label="Phone Number"
								size={6}
								index="4"
								pattern="^[0-9]{10}$"
								max="10"
								value={user.phoneNumber}
								setValue={(value) => handleChange("phoneNumber", value)}
							/>
							<ContactForm
								type="text"
								label="Company Name"
								size={12}
								index="5"
								pattern="^[a-zA-Z]{1}[a-zA-Z., ]*"
								max="30"
								value={user.company}
								setValue={(value) => handleChange("company", value)}
							/>
							<ContactForm
								type="textarea"
								label="Address"
								size={12}
								index="6"
								pattern="^[a-zA-Z]{1}[a-zA-Z., ]*"
								max="50"
								value={user.address}
								setValue={(value) => handleChange("address", value)}
							/>
						</div>
						<div className="text-center">
							<button className="btn btn-primary" onClick={() => setValidate(true)} type="submit">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
