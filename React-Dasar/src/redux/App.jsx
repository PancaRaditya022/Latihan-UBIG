import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./counterSlice";

export default function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Tambah</button>
      <button onClick={() => dispatch(decrement())}>Kurang</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}
