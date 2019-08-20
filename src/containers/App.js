import React, {Component, Fragment} from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from "../hoc/withClass";
import AuthContext from '../context/auth-context';

class App extends Component {
    constructor(props) {
        super(props);
        console.log('[App.js] constructor')
    }

    state = {
        persons: [
            {id: 'max1', name: 'Max', age: 28},
            {id: 'manu2', name: 'Manu', age: 29},
            {id: 'steph1', name: 'Stephanie', age: 26}
        ],
        otherState: 'Some other value',
        showPersons: false,
        showCockpit: true,
        changeCounter: 0,
        authenticated: false,
    };

    static getDerivedStateFromProps(props, state) {
        console.log('[App.js] getDerivedStateFromProps');
        return state;
    }

    componentDidMount() {
        console.log('[App.js] componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('[App.js] shouldComponentUpdate');
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Apps.js] componentDidUpdate')

    }

    componentWillUnmount() {
        console.log('[App.js] componentWillUnmount');
    }

    nameChangeHandler = (event, id) => {
        // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
        const personIndex = this.state.persons.findIndex(p => p.id === id);
        const person = {...this.state.persons[personIndex]};    // make copy rather than reference
        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState((prevState, props) => {
            return {
                persons: persons,
                changeCounter: prevState.changeCounter + 1
            };
        });
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    loginHandler = () => {
        this.setState({authenticated: true});
    };

    deletePersonHandler = personIndex => {
        const persons = [...this.state.persons]; // creates a copy rather than a reference to the state
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };

    render() {
        console.log('[App.js] render');
        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangeHandler}
                isAuthenticated={this.state.authenticated}
            />
        }


        return (
            <Fragment>
                <button onClick={() => {
                    this.setState({showCockpit: false})
                }}>Remove Cockpit
                </button>
                <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
                    {this.state.showCockpit ? <Cockpit
                        title={this.props.appTitle}
                        showPersons={this.state.showPersons}
                        personsLength={this.state.persons.length}
                        clicked={this.togglePersonsHandler}
                    /> : null}
                    {persons}
                </AuthContext.Provider>
            </Fragment>
        )
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
    }
}

export default withClass(App, classes.App);
