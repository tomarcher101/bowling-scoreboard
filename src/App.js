// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Components
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Play from "./components/scenes/play/Play";
import SplashPage from "./components/scenes/splashPage/SplashPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/play">
            <Play />
          </Route>
          <Route path="/leaderboard">
            Leaderboard
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
