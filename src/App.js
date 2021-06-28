import './App.css';
import UsersTable from "./components/UsersTable";
import AdsTable from "./components/AdsTable";
import WinnersTable from "./components/WinnersTable";
import Header from "./components/Header";
import {Route, Switch, Redirect} from "react-router-dom";
import PrizesTable from "./components/PrizesTable";

const App = () => {
  return (
    <div className="App">
      <Header />
        <Switch>
          <Route exact path='/ads'>
            <AdsTable />
          </Route>
          <Route exact path='/users'>
            <UsersTable />
          </Route>
          <Route exact path='/winners'>
            <WinnersTable />
          </Route>
          <Route exact path='/prizes'>
            <PrizesTable />
          </Route>
          <Redirect to='/ads' from='/' />
        </Switch>
    </div>
  );
}

export default App;
