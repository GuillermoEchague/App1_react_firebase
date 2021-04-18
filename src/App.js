import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';



class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser:null
    };
  }

    unsubscribeFromAuth = null;

    // ciclos de vida: montado, actualizado y un desmontado

    

    componentDidMount() {
      this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth =>{
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot(snapshot => {
            this.setState({
              currentUser: {
                id: snapshot.id, 
                ...snapshot.data()
              }
            });
            console.log(this.state);
          });
        }
        this.setState({currentUser: userAuth});
      });
    }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          
        </Switch>
      </div>
    );
  }
  
}

export default App;
