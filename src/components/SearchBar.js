import React, { Component } from 'react';
import axios from 'axios';

const BASE = `https://cors-anywhere.herokuapp.com/`
const BASE_URL = "http://services.runescape.com/"

class SearchBar extends Component {
    
    constructor(props){
        super(props);
        this.state = {selectedVersion: "itemdb_rs", selectedCategory: "1", term: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault();

        let url = BASE + BASE_URL + 'm=' + this.state.selectedVersion + '/api/catalogue/category.json?category=' + this.state.selectedCategory;

        let data = fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            }
        })

        data.then(response => {
            console.log(response);
        })

    }

    render() {
        return (
            <form className="search-bar"  onSubmit={this.handleSubmit}>
                <select
                    name={"version-selector"} 
                    value={this.state.selectedVersion} 
                    onChange={e => this.setState({selectedVersion: e.target.value})} 
                >
                    <option value={"itemdb_rs"}>Runescape</option>
                    <option value={"itemdb_oldschool"}>OSRS</option>
                </select>
                <select
                    name={"category-selector"}
                    value={this.state.selectedCategory}
                    onChange={e => this.setState({selectedCategory: e.target.value})}
                >
                    <option value={"1"}>Miscellaneous</option>
                    <option value={"2"}>Ammo</option>
                    <option value={"3"}>Bolts</option>
                </select>
                <input
                    name={"search-bar"} 
                    placeholder="Search the Grand Exchange" 
                    type="text"
                    value={this.state.term}
                    onChange={e => this.setState({term: e.target.value})}
                />
                <button type="submit">Search</button>
            </form> 
        );
    }

}

export default SearchBar;