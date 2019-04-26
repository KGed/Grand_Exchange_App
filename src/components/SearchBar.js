import React, { Component } from 'react';

const BASE_URL = "http://services.runescape.com/"

class SearchBar extends Component {
    
    constructor(props){
        super(props);
        this.state = {selected: "itemdb_rs", term: ''};

        this.handleDropDownChange = this.handleDropDownChange.bind(this);
        this.handleInputChange = this.handleDropDownChange.bind(this);
    }

    handleSubmit(){

    }

    handleDropDownChange(event){
        console.log(this.state.selected);
        this.setState({selected: event.target.value});
    }

    render() {
        return (
            <form className="search-bar">
                <select value={this.state.selected} onChange={this.handleDropDownChange} >
                    <option value={"itemdb_rs"}>Runescape</option>
                    <option value={"itemdb_oldschool"}>OSRS</option>
                </select>
                <input 
                    placeholder="Search the Grand Exchange" 
                    type="text"
                    value={this.state.term}
                    onChange={e => this.setState({term: event.target.value})}
                />
                <button type="submit">Search</button>
            </form> 
        );
    }

}

export default SearchBar;