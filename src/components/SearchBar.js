import React, { Component } from 'react';
import axios from 'axios';

const BASE = `https://cors-anywhere.herokuapp.com/`
const BASE_URL = "http://services.runescape.com/"

class SearchBar extends Component {
    
    constructor(props){
        super(props);
        this.state = {selectedVersion: "itemdb_rs", selectedCategory: "1", term: '', results: []};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault();

        let item = this.state.term.toLowerCase();
        let url = BASE + BASE_URL + 'm=' + this.state.selectedVersion + '/api/catalogue/items.json?category=' + this.state.selectedCategory + '&alpha=' + item[0] + '&page=1';

        let data = fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            }
        })

        data.then(response => {
            this.setState({results: response.items})
        })

    }

    render() {
        // generate table
        let rows = []
        for(let item of this.state.results){
            let itemID = item.id;
            let cell = []
            let img = <td key={"img" + itemID}><img src={item.icon_large}></img></td>
            cell.push(img)
            cell.push(<td key={"name" + itemID}>{item.name}</td>)
            cell.push(<td key={"description" + itemID}>{item.description}</td>)
            rows.push(<tr key={itemID}>{cell}</tr>);
        }



        return (
            <div>
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
                        <option value={"9"}>Familiars</option>
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
                <table>
                    <tbody>
                        <tr>
                            <th>Icon</th>
                            <th>Item</th>
                            <th>Description</th>
                        </tr>
                        {rows}
                    </tbody>
                </table>
            </div> 
        );
    }

}

export default SearchBar;