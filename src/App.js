import React, {Component} from 'react';
import './App.css';
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
        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
        };

        let persons = null;

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

            style.backgroundColor = 'red';
        }

        const classes = [];
        if (this.state.persons.length <= 2) {
            classes.push('red')     // classes = ['red']
        }
        if (this.state.persons.length <=1) {
            classes.push('bold')    // classes = ['red', 'bold']
        }

        return (
            <div className="App">
                <h1>Hi, I'm a react app</h1>
                <p className={classes.join(' ')}>This is really working!</p>
                <button
                    style={style}
                    onClick={this.togglePersonsHandler}>Toggle Persons
                </button>
                {persons}
            </div>
        )
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
    }
}

export default App;
