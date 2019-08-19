import React from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }

    const assignedStyles = [];
    if (props.persons.length <= 2) {
        assignedStyles.push(classes.red)
    }
    if (props.persons.length <=1) {
        assignedStyles.push(classes.bold)
    }

    return (
        <div className={classes.Cockpit}>
            <h1>Hi, I'm a react app</h1>
            <p className={assignedStyles.join(' ')}>This is really working!</p>
            <button
                className={btnClass}
                onClick={props.clicked}>Toggle Persons
            </button>
        </div>
    );
};

export default cockpit;