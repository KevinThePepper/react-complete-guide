import React, {useEffect, useRef, useContext} from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = props => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');

        /*        setTimeout(() => {
                    alert('Saved data to cloud');
                }, 1000);*/
        toggleBtnRef.current.click();
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        }
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        }
    });

    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }

    const assignedStyles = [];
    if (props.personsLength <= 2) {
        assignedStyles.push(classes.red)
    }
    if (props.personsLength <= 1) {
        assignedStyles.push(classes.bold)
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedStyles.join(' ')}>This is really working!</p>
            <button
                ref={toggleBtnRef}
                className={btnClass}
                onClick={props.clicked}>Toggle Person
            </button>
            <button onClick={authContext.login}>Log in</button>
        </div>
    );
};

export default React.memo(cockpit);