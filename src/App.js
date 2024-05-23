import "./App.css";
import { Provider } from "react-redux";
import store from "./../src/redux/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/routes";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
