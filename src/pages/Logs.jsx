import { useEffect, useState } from 'react';
import { Container, ListGroup, Pagination } from 'react-bootstrap';
import './Logs.css'; // Add a CSS file for the lazy loader
import api from '../utils/api';

export default function Logs() {
  const [logs, setLogs] = useState([]); // Initialize as an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // Full-page loading state

  useEffect(() => {
    setLoading(true); // Show overlay when data fetching starts
    api.get(`/logs?page=${currentPage}`)
      .then(res => {
        setLogs(res.data.data || []); // Set logs to the `data` array from the response
        setTotalPages(res.data.last_page || 1); // Set total pages from `last_page`
        setLoading(false); // Hide overlay after data is fetched
      })
      .catch(err => {
        console.error('Error loading logs:', err);
        setLogs([]); // Set logs to an empty array on error
        setLoading(false); // Hide overlay on error
      });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container className="mt-4">
      <h2>Download Logs</h2>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && logs.length === 0 && (
        <div className="text-center mt-5">
          <p>No data yet</p>
        </div>
      )}

      {!loading && logs.length > 0 && (
        <>
          <ListGroup className="mt-3">
            {logs.map(log => (
              <ListGroup.Item key={log.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{log.type.toUpperCase()}</strong><br />
                    {new Date(log.created_at).toLocaleString()}
                  </div>
                  <div>
                    {/* Download Button */}
                    <a
                      href={log.s3_url}
                      download
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Pagination Controls */}
          <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {[...Array(totalPages).keys()].map(num => (
              <Pagination.Item
                key={num + 1}
                active={currentPage === num + 1}
                onClick={() => handlePageChange(num + 1)}
              >
                {num + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </>
      )}
    </Container>
  );
}