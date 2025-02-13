import React, { useEffect, useState, useMemo, fetchPosts } from 'react';
import {useReactTable, useSortBy, usePagination, flexRender } from 'react-table';

function App() {
  const columns = React.useMemo(
      () => [
        {
          accessorFn: (row) => row.atomic_number,
          id: "post.atomic_number",
          header: "Atomic Number",
          cell: (info) => info.getValue(),
        },
        {
          accessorFn: (row) => row.symbol,
          id: "post.symbol",
          header: "Symbol",
          cell: (info) => info.getValue(),
        },
        {
          accessorFn: (row) => row.element,
          id: "post.element",
          header: "Element",
          cell: (info) => info.getValue(),
        },
        {
          accessorFn: (row) => row.atomic_mass,
          id: "post.atomic_mass",
          header: "Atomic Mass",
          cell: (info) => info.getValue(),
        },
      ],
      [],
    );

  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('http://localhost:5001/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [currentPage]);

  const table = useReactTable({
    data,
    columns},
    useSortBy,
    usePagination
  );

  return (
    <div>
      <table>
          <caption>Periodic Table of the Elements</caption>
          <thead>
          <tr>
            <th colSpan={2}>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} >
                  Previous
                </button>
            </th>
            <th colSpan={2}>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === lastPage} >
                  Next
                </button>
            </th>
          </tr>
          <tr><th>Atomic Number</th><th>Element</th><th>Symbol</th><th>Atomic Mass</th></tr>
          </thead>
          <tbody>
             {table.getRowModel.rows.map(row => (
               <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                  ))}
               </tr>
             ))}
          </tbody>
          <tfoot>
             {table.getFooterGroups().map(footerGroup => (
               <tr key={footerGroup.id}>
                  {footerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan}>
                     {header.isPlaceholder
                     ? null
                     : flexRender(
                     header.column.columnDef.footer,
                     header.getContext()
                     )}
                  </th>
                  ))}
             </tr>
             ))}
          </tfoot>
       </table>
    </div>
  );
}

export default App;
