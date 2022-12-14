import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";
export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
          {/* <Register /> */}
          <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          </Switch>
    </div>
    </ThemeProvider>
  );
}

export default App;
