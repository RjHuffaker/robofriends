import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';

function App() {
	const [robots, setRobots] = useState([]);
	const [searchField, setSearchField] = useState('');

	useEffect(()=>{
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => setRobots(users));
	}, []);

	const onSearchChange = (event) => {
		setSearchField(event.target.value);
	}

	const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchField.toLowerCase())
	})

	return robots.length ? (
		<div className="tc">
			<h1 className='f1'>Robofriends</h1>
			<SearchBox searchChange={onSearchChange}/>
			<Scroll>
				<ErrorBoundary>
					<CardList robots={filteredRobots}/>
				</ErrorBoundary>
			</Scroll>
		</div>
	) : (
		<h1>Loading...</h1>
	);

}

export default App;