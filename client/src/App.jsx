import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {

  return (
    <Router>
      <Route path="/" component={Login} />
      <Route path="/chat" component={Chat} />
      <Route path="*paramName" component={NotFound} />
    </Router>
  );
}
