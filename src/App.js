import React, {Component} from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            { id: 'max1', name: 'Max', age: 28 },
            { id: 'manu2', name: 'Manu', age: 29 },
            { id: 'steph1', name: 'Stephanie', age: 26}
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
        let btnClass = '';

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                            click={this.deletePersonHandler.bind(this, index)}
                            name={person.name}
                            age={person.age}
                            key={person.id}
                            changed={(event) => this.nameChangeHandler(event, person.id)}/>
                    })}
                </div>
            );

            btnClass = classes.Red;
        }

        const assignedStyles = [];
        if (this.state.persons.length <= 2) {
            assignedStyles.push(classes.red)
        }
        if (this.state.persons.length <=1) {
            assignedStyles.push(classes.bold)
        }

        return (
            <div className={classes.App}>
                <h1>Hi, I'm a react app</h1>
                <p className={assignedStyles.join(' ')}>This is really working!</p>
                <button
                    className={btnClass}
                    onClick={this.togglePersonsHandler}>Toggle Persons
                </button>
                {persons}
            </div>
        )
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
    }
}

export default App;
