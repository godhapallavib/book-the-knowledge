import logo from './logo.svg';
import './App.css';
import Login from './Components/Login'
import Register from './Components/Register'
import BookList from './Components/BookList'
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import NotLoggedIn from './Components/NotLoggedIn';
import ViewCart from './Components/ViewCart'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route exact path="/Register">
          <Register/>
        </Route>
        <Route exact path="/BookList">
          <BookList/>
        </Route>
        <Route exact path='/NotLoggedIn'>
          <NotLoggedIn/>
        </Route>
        <Route exact path="/ViewCart">
          <ViewCart/>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
