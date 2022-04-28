import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

export default function Datatable({ summaryData }) {
  const [currentPage, setCurrentPage] = useState(0);

  const buildTableRows = () => {
    return summaryData.Countries.slice(
      currentPage * 25,
      (currentPage + 1) * 25
    ).map((country, index) => {
      return (
        <tr key={index}>
          <td>{index + 1 + currentPage * 25}</td>
          <td>{country.Country}</td>
          <td>{country.TotalConfirmed}</td>
          <td>{country.NewConfirmed}</td>
          <td>{country.TotalDeaths}</td>
        </tr>
      );
    });
  };

  const buildPagination = () => {
    const items = [];
    for (let i = 0; i < summaryData.Countries.length / 25; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Country</th>
            <th>Total cases</th>
            <th>New cases</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>{summaryData?.Countries && buildTableRows()}</tbody>
      </Table>
      <Pagination>
        <Pagination.Prev
          onClick={() => {
            if (currentPage > 0) {
              setCurrentPage(currentPage - 1);
            }
          }}
        />
        {summaryData?.Countries && buildPagination()}
        <Pagination.Next
          onClick={() => {
            if (currentPage < summaryData?.Countries.length / 25 - 1) {
              setCurrentPage(currentPage + 1);
            }
          }}
        />
      </Pagination>
    </>
  );
}
