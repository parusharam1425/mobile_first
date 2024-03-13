import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jokes, setJokes] = useState([]);
  const [jokesLoaded, setJokesLoaded] = useState(false);

  useEffect(() => {
    fetch('https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10')
      .then((response) => response.json())
      .then((data) => setJokes(data.jokes));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'username' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setJokes([]);
    setJokesLoaded(false);
  };

  const handleLoadJokes = () => {
    setJokesLoaded(true);
  };

  return (
    <Container>
      {!isLoggedIn ? (
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h2>Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className='mt-2'>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      ) : (
        <>
          <Row className="justify-content-center mt-5">
            <Col md={10}>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
              <Button className='m-3' variant="success" onClick={handleLoadJokes}>
                Load Jokes
              </Button>
            </Col>
          </Row>
          
          {jokesLoaded && (
            <Row className="justify-content-center mt-3">
              <Col md={10}>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Category</th>
                      <th>Joke</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jokes.map((joke, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{joke.category}</td>
                        <td>{joke.joke}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default App;
