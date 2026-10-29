import { Provider } from "react-redux";
import { store } from "./store";
import CounterApp from "./App";

export default function ReduxDemo() {
  return (
    <Provider store={store}>
      <CounterApp />
    </Provider>
  );
}
