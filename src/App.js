import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <table>
        <caption>Periodic Table of the Elements</caption>
        <tr><th>Atomic Number</th><th>Element</th><th>Symbol</th><th>Atomic Mass</th></tr>
      {data.map(e => (
        <tr><td class='col1-td'>{e.atomic_number}</td><td class='col2-td'>{e.symbol}</td><td class='col3-td'>{e.element}</td><td class='col4-td'>{e.atomic_mass}</td></tr>
      ))}
      </table>
    </div>
  );
}

export default App;
