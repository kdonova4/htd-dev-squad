import React from "react";
import { Row, Col } from "react-bootstrap";
import LocationSearchForm from "./LocationSearchForm";
import { useRestrooms } from "./context/RestroomContext";

function RestroomList() {
  const { restrooms } = useRestrooms();

  return (
    <>
      <Row className="justify-content-center w-100 mb-4">
        <Col>
          <div className="d-flex justify-content-center align-items-center mb-3">
            <h2>Restrooms</h2>
          </div>
          <LocationSearchForm />
        </Col>
      </Row>
      <section id="listContainer">
        {restrooms.length === 0 ? (
          <p>No restrooms found.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr className="table-dark">
                <th>Name</th>
                <th>Address</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody id="tableRows">
              {restrooms.map((restroom) => (
                <tr key={restroom.restroomId}>
                  <td>{restroom.name}</td>
                  <td>{restroom.address || "--"}</td>
                  <td>{restroom.latitude}</td>
                  <td>{restroom.longitude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}

export default RestroomList;
