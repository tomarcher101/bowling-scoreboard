// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Provider, connect } from "react-redux";
import store from "./store";

// Components
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Play from "./components/Play";
import SplashPage from "./components/SplashPage";
import CustomAlert from "./components/CustomAlert";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CustomAlert />
        <Router>
          <Switch>
            <Route exact path="/">
              <SplashPage />
            </Route>
            <Route path="/play">
              <Play />
            </Route>
            <Route path="/leaderboard">Leaderboard</Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
