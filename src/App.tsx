import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "@storeRedux";
import RootConfig from "./navigation/RootConfig";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <div className="vh-100 overflow-hidden">
            <RootConfig />
          </div>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
