import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListLocations extends Component {

	render() {

		let showingLocations
		if (this.props.query) {
			const match = new RegExp(escapeRegExp(this.props.query), 'i')
			showingLocations = this.props.locations.filter((location) => match.test(location.title))
		}
		else {
			showingLocations = this.props.locations
		}

		showingLocations.sort(sortBy('title'))


		return (
			<div className="search-bar-list-locations">
				<div className="search-locations-bar">
					<input type="text" placeholder="Search by location" value={this.props.query} onChange={(event) => this.props.onUpdateQuery(event.target.value)} />
				</div>
				{/*{JSON.stringify(this.state)}*/}
				<ul className="list-locations">
					{showingLocations.map((location) => (
					<li key={location.name}>
						{location.title}
					</li>
					))}
				</ul>
			</div>
		)
	}
}

export default ListLocations