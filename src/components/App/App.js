import React, { Component } from "react";
import ContactsForm from "../ContactsForm/ContactsForm";
import Contacts from "../Contacts/ContactList";
import { v4 as uuidv4 } from "uuid";
import Filter from "../Filter/Filter";
import styles from "./App.module.css";
import { CSSTransition } from "react-transition-group";
import "./AppAnimations.css";
import ErrorName from '../ErrorName/ErrorName';

class App extends Component {
  state = {
    contacts: [
      {
        name: "Roise Simpson",
        number: "645-17-49",
        id: uuidv4(),
      },
      {
        name: "Hermione Kline",
        number: "443-89-12",
        id: uuidv4(),
      },
      {
        name: "Eden Clements",
        number: "459-12-56",
        id: uuidv4(),
      },
    ],
    filter: "",
    error: false,
  };
  handleGetFilter = (filter) => {
    this.setState({
      filter: filter,
    });
  };
  componentDidMount(prevState, prevProps) {
    if (localStorage.contacts) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem("contacts")),
      });
    }
  }
  handleDeleteContact = (id) => {
    let delContacts = this.state.contacts.map((contact) => contact.id);
    let delContacts2 = [...this.state.contacts];
    let index = delContacts.indexOf(id);
    delContacts2.splice(index, 1);
    this.setState({
      contacts: [...delContacts2],
    });
  };
  handlePushContact = (name, number) => {
    let thisArr = this.state.contacts.map((contact) =>
      contact.name.toLowerCase()
    );
    if (!thisArr.includes(name.toLowerCase())) {
      this.setState((prevState) => ({
        contacts: [
          ...prevState.contacts,
          { name: name, number: number, id: uuidv4() },
        ],
      }));
    } else {
      // alert(`${name} is already in contacts.`);
      this.setState({error: true});
      // setTimeout(this.setState({error: false}), 10450);
    }
  };
  handleDelayError = () =>{
    setTimeout(()=>this.setState({error: false}), 1000);
  }
  render() {
    return (
      <div className="App">
        <CSSTransition in={this.state.error} timeout={250} onEntered={this.handleDelayError} classNames="error" unmountOnExit>
        <ErrorName />
        </CSSTransition>

        <CSSTransition in={true} appear={true} timeout={500} classNames="main-title">
          <h2 className={styles.title}>Phonebook</h2>
        </CSSTransition>

        <ContactsForm
          name={this.state.name}
          number={this.state.number}
          handleGetName={this.handleGetName}
          handleGetNumber={this.handleGetNumber}
          handlePushContact={this.handlePushContact}
        />
        <CSSTransition in={this.state.contacts.length>1} timeout={500} classNames="filter" unmountOnExit>
        <Filter
          filter={this.state.filter}
          handleGetFilter={this.handleGetFilter}
        />
        </CSSTransition>
        <Contacts
          contacts={this.state.contacts}
          filter={this.state.filter}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
