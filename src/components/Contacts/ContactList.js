import React, {Component} from 'react';
import Contact from './Contact';
import styles from './ContactList.module.css';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './ContactListAnimations.css';

class ContactList extends Component{
    componentDidUpdate(prevProps, prevState){
        localStorage.setItem("contacts", JSON.stringify(this.props.contacts))
    }
    render(){
        const contacts = this.props.contacts.filter(contact=>contact.name.toLowerCase().includes(this.props.filter.toLowerCase()));
        return(
            <div>
                <TransitionGroup component="ul" className={styles.list}>        
                    {contacts.map(contact=>(
                        <CSSTransition key={contact.id} timeout={250} classNames="list-contact" unmountOnExit>
                        <Contact 
                        name={contact.name}
                        number={contact.number}
                        id={contact.id}
                        handleDeleteContact={this.props.handleDeleteContact}
                         />
                         </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        )
    }
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.exact({
        name: PropTypes.string,
        number: PropTypes.string,
        id: PropTypes.string,
    })).isRequired,
    handleDeleteContact: PropTypes.func.isRequired,
}
export default ContactList;