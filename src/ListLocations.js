import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListLocations extends Component {

	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}

	render() {

		let showingLocations
		if (this.state.query) {
			const match = new RegExp(escapeRegExp(this.state.query), 'i')
			showingLocations = this.props.locations.filter((location) => match.test(location.title))
		}
		else {
			showingLocations = this.props.locations
		}

		showingLocations.sort(sortBy('title'))


		return (
			<div className="search-bar-list-locations">
				<div className="search-locations-bar">
					<input type="text" placeholder="Search by location" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />
				</div>
				{JSON.stringify(this.state)}
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