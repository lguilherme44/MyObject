import { useEffect, useState } from "react";
import { api } from "./services/api";

import "tailwindcss/tailwind.css";

interface AppProps {
  status: string;
  data: string;
  origem: string;
  local: string;
  destino: string;
}

function App() {
  const [state, setState] = useState([]);

  useEffect(() => {
    async function loadData() {
      const codRastreio = ["LZ817892136CN"];

      const { data } = await api.get(`/${codRastreio}`);

      if (data) {
        console.log(data.response);
        setState(data.response[0]);
      }
    }

    loadData();
  }, []);

  return (
    <div>
      {state.map((item: AppProps, idx) => (
        <table className="table-auto">
          <thead>
            <tr>
              <th>Status</th>
              <th>Data</th>
              <th>Local</th>
              <th>Origem</th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-emerald-200">
              <td>{item.status}</td>
              <td>{item.data}</td>
              <td>{item.local}</td>
              <td>{item.origem}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default App;
