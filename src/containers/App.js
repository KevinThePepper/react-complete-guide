import React, {Component} from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
    state = {
        persons: [
            {id: 'max1', name: 'Max', age: 28},
            {id: 'manu2', name: 'Manu', age: 29},
            {id: 'steph1', name: 'Stephanie', age: 26}
        ],
        otherState: 'Some other value',
        showPersons: false,
    };

    nameChangeHandler = (event, id) => {
        // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
        const personIndex = this.state.persons.findIndex(p => p.id === id);
        const person = {...this.state.persons[personIndex]};    // make copy rather than reference
        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({persons: persons});
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    deletePersonHandler = personIndex => {
        const persons = [...this.state.persons]; // creates a copy rather than a reference to the state
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };

    render() {
        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangeHandler}/>
        }


        return (
            <div className={classes.App}>
                <Cockpit
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    clicked={this.togglePersonsHandler}
                />
                {persons}
            </div>
        )
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
    }
}

export default App;
