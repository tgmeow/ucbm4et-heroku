import React, { Component } from 'react';
import MemesList from './MemesList.js';

import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';

const recentMenuKey = 1;
const recentMenuName = 'Top posts in the last...'
const recentMenu = ['hour', 'day', 'week', 'month', 'year', 'all'];

const boundMenuKey = 2;
const boundMenuName = 'Dankest Memes of...'
const boundMenu = ['2016', '2017'];


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: 'day'
        }
    }

    render() {
        const recentMenuItems = recentMenu.map((menuItem, index) => (
            <MenuItem eventKey={menuItem} onSelect={setAppState.bind(this)} > {menuItem}
            </MenuItem>
        ));

        const boundMenuItems = boundMenu.map((menuItem, index) => (
            <MenuItem eventKey={menuItem} onSelect={setAppState.bind(this)} > {menuItem}
            </MenuItem>
        ));

        const navbarInstance = (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Dank (Old) Rand Memes</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavDropdown eventKey={recentMenuKey} title={recentMenuName} id="basic-nav-dropdown">
                        {recentMenuItems}
                    </NavDropdown>
                    <NavDropdown eventKey={boundMenuKey} title={boundMenuName} id="basic-nav-dropdown">
                        {boundMenuItems}
                    </NavDropdown>
                </Nav>
            </Navbar>
        );

        //TODO generate header buttons
        const nowViewing = recentMenu.includes(this.state.selection) ? ('top memes of the past ' + this.state.selection.toLowerCase()) : ('Dankest Memes of ' + this.state.selection);

        return (
            <div className="App container">
                {navbarInstance}
                <div className="App-header">
                    <h2>{nowViewing}</h2>
                </div>
                <div className="App-body">
                    <MemesList
                        selection={this.state.selection}
                    >Loading...</MemesList>
                </div>
            </div>
        );
    }
}

function setAppState(eventKey) {
    //TODO UPDATE STATE REGARDLESS OF CURRENT, RESET LIST AND PASS STATE DOWN
    console.log('App state change');
    this.setState({ 'selection': eventKey });

}

export default App;
