import React from 'react';
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import  './App.css';
import ErrorBoundary from '../components/ErrorBoundary';
import {connect}  from 'react-redux';
import {setSearchField} from '../action';

const mapStateToProps = state => {
   return {
    searchField : state.searchField
   }
};


const mapDispatchToProps = (dispatch) =>{
    return {
        onSearchChanged : (event) =>  dispatch(setSearchField(event.target.value))
    }
}

class App extends React.Component{
    constructor(){
        super();
        this.state={
            robots: []
        };
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(users=> this.setState({ robots: users}));
    }

    render() {
        const {robots} = this.state;
        const {searchField, onSearchChanged} = this.props;
        const filteredRobots = robots.filter(robot=>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return !robots.length ?
            <h1 className='f1'>Loading....</h1> :   
       
                <div className='tc'>
                 <h1 className='f1'>RoboFriends</h1>
                 <SearchBox searchChange={onSearchChanged}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);