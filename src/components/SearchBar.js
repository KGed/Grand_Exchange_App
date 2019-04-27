import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "http://services.runescape.com/"

class SearchBar extends Component {
    
    constructor(props){
        super(props);
        this.state = {selectedVersion: "itemdb_rs", selectedCategory: "", term: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();

        let url = BASE_URL + 'm=' + this.state.selectedVersion + '/api/catalogue/items.json?category=' + this.state.selectedCategory;

        axios.get(url ,{
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            params :{
                alpha: this.state.term.toLowerCase()[0],
                page: 1
            }
        });


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