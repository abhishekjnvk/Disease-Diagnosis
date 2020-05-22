import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";
import MenuAppBar from './Comp/AppBar'
import Home from './Home'
import DiseasePage from './Comp/DiseasePage'

export default function App() {
  return (
    (<>
      <Router>

        <MenuAppBar />
        <div className="col-lg-11 mx-auto mt-3">

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/view/:id" component={DiseasePage} />
          </Switch>
        </div>
      </Router>

    </>

    )


  );
}
