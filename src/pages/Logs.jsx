import { useEffect, useState } from 'react';
import { Container, ListGroup, Spinner, Pagination } from 'react-bootstrap';
import api from '../utils/api';

export default function Logs() {
  const [logs, setLogs] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    api.get(`/logs?page=${currentPage}`)
      .then(res => {
        setLogs(res.data.data); // Logs data is in the `data` property
        setTotalPages(res.data.last_page); // Total number of pages
      })
      .catch(err => console.error('Error loading logs:', err));
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container className="mt-4">
      <h2>Download Logs</h2>
      {logs ? (
        <>
          <ListGroup className="mt-3">
            {logs.map(log => (
              <ListGroup.Item key={log.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{log.type.toUpperCase()}</strong><br />
                    {new Date(log.created_at).toLocaleString()}
                  </div>
                  <a
                    href={log.s3_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    View
                  </a>
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
      ) : (
        <Spinner animation="border" />
      )}
    </Container>
  );
}
