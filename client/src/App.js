import React from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withTranslation } from 'react-i18next';

import Navbar from "./components/navbar.component";
import EmissionsList from "./components/emissions-list.component";
import EditEmission from "./components/edit-emission.component";
import CreateEmission from "./components/create-emission.component";
import ChroniqueursList from "./components/chroniqueurs-list.component";
import CreateChroniqueur from "./components/create-chroniqueur.component";
import EditChroniqueur from "./components/edit-chroniqueur.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar/>
        <br/>
        <Route path="/" exact component={EmissionsList} />
        <Route path="/editEmission/:id"  component={EditEmission} />
        <Route path="/createEmission"  component={CreateEmission} />
        <Route path="/createChroniqueur"  component={CreateChroniqueur} />
        <Route path="/listChroniqueurs"  component={ChroniqueursList} />
        <Route path="/editChroniqueur/:id"  component={EditChroniqueur} />
      </div>
    </Router>
  );
}
export default withTranslation()(App);


