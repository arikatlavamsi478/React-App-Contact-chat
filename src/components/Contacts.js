import ContactList from "./ContactList";
import "../styles/Contacts.css";
import AddEditContact from "./AddEditContact";
import { createContext, useContext, useRef, useState } from "react";
const ContactsContext = createContext();

export const useContacts = () => {
	return useContext(ContactsContext);
};
export default function Contacts() {
	const [ user, setUser ] = useState({});
	const [ contacts, setContacts ] = useState([]);
	const popupRef = useRef();
	return (
		<div className="container pl-lg-3 pl-xs-0 ml-lg-4 ml-xs-1">
			<ContactsContext.Provider value={{ contacts, setContacts }}>
				<div className="d-flex flex-row mt-3 justify-content-start align-items-center">
					<i className="fa fa-address-book-o idcard text-white" />
					<h1 className="d-flex flex-column pl-3">Contacts Application</h1>
				</div>
				<div className="row ml-md-4 mt-4 mb-4 pl-1 pr-1">
					<input
						type="text"
						placeholder="Search contacts"
						defaultValue=""
						className="col-sm-6 col-md-6 col-lg-3 search-contacts border"
					/>
					&nbsp;&nbsp;&nbsp;
					<button
						className="col-sm-4 col-md-4 col-lg-2 add-contact border-0 text-white"
						data-toggle="modal"
						data-target="#exampleModalCenter"
						ref={popupRef}>
						+ Add Contact
					</button>
				</div>
				<div
					className="modal fade"
					id="exampleModalCenter"
					tabIndex="-1"
					role="dialog"
					data-backdrop="static"
					aria-labelledby="staticBackdropLabel"
					aria-hidden="true">
					{/* Add/Edit Contact Popup */}
					<AddEditContact
						addData={(user) => setUser(user)}
						editUser={user}
						setContacts={(contacts) => setContacts(contacts)}
					/>
				</div>

				{/* Contacts list */}
				<ContactList
					newUser={user}
					editUser={(user) => setUser(user)}
					onPopup={() => popupRef.current.click()}
					setContacts={(contacts) => setContacts(contacts)}
				/>
			</ContactsContext.Provider>
		</div>
	);
}
