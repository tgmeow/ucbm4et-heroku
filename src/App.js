import React, { Component } from 'react';
import MemesList from './MemesList.js';

import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';

const RECENT_MENU_KEY = 1;
const RECENT_MENU_NAME = 'Top posts in the last...'
const RECENT_MENU = ['hour', 'day', 'week', 'month', 'year', 'all'];

const BOUND_MENU_KEY = 2;
const BOUND_MENU_NAME = 'Dankest Memes of (school year)'
const BOUND_MENU_START = '2016';

const STATE_DEFAULT_SELECTION = 'day';
const PAGE_SIZE = 20;

class App extends Component {
    constructor(props) {
        super(props);
        //selection WILL be one of the valid menu items
        //lets do 0 index paging :D
        this.state = {
            selection: STATE_DEFAULT_SELECTION,
            page: 0
        }
    }

    render() {
        //Determine pathing and parameters
        //Defaults: no params. page 1 of STATE_DEFAULT_SELECTION
        //params: time=[menuItem], page=[any#]
        //TODO: Indexed pagination thing, => MemesList the skip amount
        //Size of indexes det by... Node server makes a cache of number of elements in xyz
        //      updates cache upon updating server data

        //create recent time menu items
        var recentMenuItems = RECENT_MENU.map((menuItem, index) => (
            <MenuItem key={menuItem} eventKey={menuItem} onSelect={setAppState.bind(this)} > {menuItem}
            </MenuItem>
        ));

        //create bound menu items
        var boundMenu = [];
        let today = new Date();
        for(let year = BOUND_MENU_START; year <= today.getUTCFullYear(); ++year){
            boundMenu.push(year);
        }
        var boundMenuItems = boundMenu.map((menuItem, index) => (
            <MenuItem key={menuItem} eventKey={menuItem} onSelect={setAppState.bind(this)} > {menuItem}
            </MenuItem>
        ));

        //create navbar
        var navbarInstance = (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        UC B M F Edgy Teens
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavDropdown eventKey={RECENT_MENU_KEY} title={RECENT_MENU_NAME} id="basic-nav-dropdown">
                        {recentMenuItems}
                    </NavDropdown>
                    <NavDropdown eventKey={BOUND_MENU_KEY} title={BOUND_MENU_NAME} id="basic-nav-dropdown">
                        {boundMenuItems}
                    </NavDropdown>
                </Nav>
            </Navbar>
        );

        //current state info
        var nowViewing = RECENT_MENU.includes(this.state.selection) ? ('top memes of the past ' + this.state.selection.toLowerCase()) : ('Dankest Memes of ' + this.state.selection);

        return (
            <div className="App">
                {navbarInstance}
                <div className="App-header container">
                    <h2 style={{marginTop:'0px'}} >{nowViewing}</h2>
                </div>
                <div className="App-body container">
                    <MemesList
                        selection={this.state.selection}
                        pageSize={PAGE_SIZE}
                    >Loading...</MemesList>
                </div>
                <div className="App-footer container" style={{height:'10px'}} >
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
