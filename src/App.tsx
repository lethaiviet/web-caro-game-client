import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "@storeRedux";
import RootConfig from "./navigation/RootConfig";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <RootConfig />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
