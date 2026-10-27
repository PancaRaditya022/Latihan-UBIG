import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useContext,
  createContext,
} from "react";
import "./../styles/table.css";

const DataContext = createContext();

function Lister() {
  const { data } = useContext(DataContext);
  return (
    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Harga</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e, i) => (
          <tr key={i}>
            <td>{e.nama}</td>
            <td>{e.harga.toLocaleString("id-ID")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Hooks() {
  const [data, setData] = useState(() => {
    const dat = localStorage.getItem("data");
    return dat ? JSON.parse(dat) : [];
  });

  const input_produk = useRef();
  const input_harga = useRef();
  const total_harga = useMemo(
    () => data.reduce((total, item) => total + item.harga, 0),
    [data],
  );

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <input type="text" placeholder="Produk" ref={input_produk} />
      <input type="number" placeholder="Harga" ref={input_harga} />
      <button
        onClick={() =>
          setData((before) => [
            ...before,
            {
              nama: input_produk.current.value,
              harga: parseInt(input_harga.current.value),
            },
          ])
        }
      >
        Tambah
      </button>
      <button onClick={() => setData([])}>Clear</button>
      <h1>Total {total_harga.toLocaleString("id-ID")}</h1>
      <DataContext.Provider value={{ data }}>
        <Lister />
      </DataContext.Provider>
    </div>
  );
}
