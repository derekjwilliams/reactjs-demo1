import React, { useEffect, useState } from 'react'
import { ElementData } from '../types/elements';

function PeriodicTable() {
  const [data, setData] = useState<ElementData[]>([]);
  const [limit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetch(
      `http://localhost:5001/api/data?limit=${limit}&offset=${offset}&search=${search}`
    )
      .then((response) => response.json())
      .then((data: ElementData[]) => setData(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [limit, offset, search])

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  return (
    <div>
      <table>
        <caption>Periodic Table of the Elements </caption>
        < thead >
          <tr>
            <th>Atomic Number </th>
            <th> Element </th>
            <th> Symbol </th>
            <th> Atomic Mass </th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((e) => (
              <tr key={e.atomic_number} >
                <td className="col1-td" > {e.atomic_number} </td>
                <td className="col2-td" > {e.element} </td>
                <td className="col3-td" > {e.symbol} </td>
                <td className="col4-td" > {e.atomic_mass} </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      < button onClick={() => setOffset(offset + limit)
      }> Next </button>
      < input
        type="text"
        size={30}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
    </div>
  )
}

export default PeriodicTable
