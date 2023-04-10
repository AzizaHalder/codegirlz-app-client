import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SearchBar = ({ onQuery }) => {
  return (
    <Form className="SearchBar">
      <Row className="justify-content-center m-4">
        <Col sm={6}>
          <Form.Control
            placeholder="Type your search here.."
            type="text"
            onChange={(e) => {
              onQuery(e.target.value);
            }}
          />
          {/* </InputGroup> */}
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
