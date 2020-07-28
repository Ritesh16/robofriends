import React from 'react';
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import  './App.css';
import ErrorBoundary from '../components/ErrorBoundary';

class App extends React.Component{
    constructor(){
        super();
        this.state={
            robots: [],
            searchField:''
        };
    }

    onSearchChanged =(event)=>{
        this.setState({searchField:event.target.value});    
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(users=> this.setState({ robots: users}));
    }

    render() {
        const {robots, searchField} = this.state;
        const filteredRobots = robots.filter(robot=>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return !robots.length ?
            <h1 className='f1'>Loading....</h1> :   
       
                <div className='tc'>
                 <h1 className='f1'>RoboFriends</h1>
                 <SearchBox searchChange={this.onSearchChanged}/>
                 <div>
                     <Scroll>
                         <ErrorBoundary>
                         <CardList robots={filteredRobots}/>
                         </ErrorBoundary>
                     </Scroll>
                 </div>
                </div>
        }
    
};

export default App;