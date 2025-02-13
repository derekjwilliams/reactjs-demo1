import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5001/api/data?limit=${limit}&offset=${offset}&search=${search}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [limit, offset, search]);

  function handleSearchChange(e) {
    setSearch(e.target.value);
  };

  return (
    <div>
      <table>
        <caption>Periodic Table of the Elements</caption>
        <tr><th>Atomic Number</th><th>Element</th><th>Symbol</th><th>Atomic Mass</th></tr>
      {data.map(e => (
        <tr><td class='col1-td'>{e.atomic_number}</td><td class='col2-td'>{e.symbol}</td><td class='col3-td'>{e.element}</td><td class='col4-td'>{e.atomic_mass}</td></tr>
      ))}
      </table>
      <button onClick={() => setOffset(offset + limit)}>
        Next
      </button>
      <input type="text" size="30" onChange={handleSearchChange}></input>
    </div>
  );
}

export default App;
