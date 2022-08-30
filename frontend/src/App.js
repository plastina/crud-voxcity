import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home/home';
import { Cadastrar } from './pages/Cadastrar/cadastrar';
import { Visualizar } from './pages/Visualizar/visualizar';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cadastrar" component={Cadastrar} />
          <Route path="/visualizar/:id" component={Visualizar} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
