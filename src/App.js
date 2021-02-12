import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';
import Sidebar from './components/sidebar';
import { Container, Row, Col } from "react-bootstrap"
import AddNote from './components/AddNote';
import NoteDetail from "./components/NoteDetail"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"


const path = window.location.pathname.replace(/\/+$/, '');

class App extends Component {
  state = {
    noteId: path,
    note: [],
    tags: [],
  }

  async componentDidMount() {
    const url = `http://localhost:3001/api/notes/${this.state.noteId}`
    const res = await fetch(url)
    const note = await res.json()
    this.setState({ note: note })
    this.setState({ tags: note.tags })
    console.log("path"+path)
  }

  render() {
    return (
      <Router>
        <Container className="App" fluid>
          <Switch>
            <Row>
              <Col>
                <Sidebar/>
              </Col>
              <Col>
                <Route path={this.state.noteId}>
              <NoteDetail note={this.state.note} tags={this.state.tags} id={this.state.noteId} />
            </Route>
            <Route path="/new">
              <AddNote/>
            </Route>
            {this.state.noteId ? <></>:<h1>Please Select a Note</h1>}
          </Col>
        </Row>
        </Switch>
      </Container>
      </Router >
    );
  }
}

export default App;
