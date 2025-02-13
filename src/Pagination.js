import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap-pagination';

const PaginationComponent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const API_URL = 'http://localhost:5001/api/data';

    useEffect(() => {
      fetch(`${API_URL}?_page=${currentPage}&_limit=${pageSize}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [currentPage, pageSize]);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  return (
    <div>
      <Pagination
        itemsCount={data.length}
        itemsPerPage={pageSize}
        page={currentPage}
        maxPages={Math.ceil(data.length / pageSize)}
        onChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      <table>
        <caption>Periodic Table of the Elements</caption>
        <tr><th>Atomic Number</th><th>Element</th><th>Symbol</th><th>Atomic Mass</th></tr>
      {data.map(e => (
        <tr><td class='col1-td'>{e.atomic_number}</td><td class='col2-td'>{e.symbol}</td><td class='col3-td'>{e.element}</td><td class='col4-td'>{e.atomic_mass}</td></tr>
      ))}
      </table>
    </div>
  );
};

export default PaginationComponent;