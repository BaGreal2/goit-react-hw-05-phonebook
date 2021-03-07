import React, {Component} from 'react';
import styles from './Filter.module.css';

class Filter extends Component{
    onFilterChange = (e) => {
        e.preventDefault()
        this.props.handleGetFilter(e.target.value)
    }
    render(){
        const filter=this.props.filter;
        return(
            <div className={styles.container}>
                <p className={styles.text}>Find contacts by name</p>
                <input className={styles.input} type="text" value={filter} onChange={this.onFilterChange}></input>
            </div>
        )
    }
}

export default Filter;