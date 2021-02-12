import React, { Component } from 'react'
import { ListItemSecondaryAction, ListItemAvatar, ListItemText, ListItem, List, Avatar, IconButton, Divider, TextField, MenuItem } from '@material-ui/core';
import NotesIcon from '@material-ui/icons/Notes';
import AddIcon from '@material-ui/icons/Add';
import AddNote from './AddNote';
import { Link } from 'react-router-dom';



function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export class sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            title: "",
            content: "",
            Tags: [],
            filteredTag: ""
        };
    }

    async componentDidMount() {
        const res = await fetch(`http://localhost:3001/api/notes/?title=/${this.state.title}/i&content=/${this.state.content}/i&tags=/${this.state.filteredTag}/i`)
        const tagRes = await fetch("http://localhost:3001/api/notes/tags")
        const tagData = await tagRes.json()
        const data = await res.json()
        this.setState({ notes: data })
        this.setState({ Tags: tagData })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.title !== this.state.title) {
            const res = await fetch(`http://localhost:3001/api/notes/?title=/${this.state.title}/i&content=/${this.state.content}/i&tags=/${this.state.filteredTag}/i`)
            const data = await res.json()
            this.setState({ notes: data })
        } else if (prevState.content !== this.state.content) {
            const res = await fetch(`http://localhost:3001/api/notes/?title=/${this.state.title}/i&content=/${this.state.content}/i&tags=/${this.state.filteredTag}/i`)
            const data = await res.json()
            this.setState({ notes: data })
        } else if (prevState.filteredTag !== this.state.filteredTag) {
            const res = await fetch(`http://localhost:3001/api/notes/?title=/${this.state.title}/i&content=/${this.state.content}/i&tags=/${this.state.filteredTag}/i`)
            const data = await res.json()
            this.setState({ notes: data })
        }
    }


    handleChangeTitle = (event) => {
        this.setState({ title: event.target.value })
    }
    handleChangeContent = (event) => {
        this.setState({ content: event.target.value })
    }
    handleChangeTag = (event) => {
        this.setState({ filteredTag: event.target.value })
    }

    render() {
        return (
            <>
                <div className="sidebar">
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <NotesIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText><h2>Notes</h2></ListItemText>
                            <Link to="/new">
                            <ListItemSecondaryAction onClick={this._onButtonClick}>
                                {/* <AddNote show={this.state.showComponent} /> */}
                                <IconButton>
                                    <AddIcon fontSize="inherit" />
                                </IconButton>
                            </ListItemSecondaryAction>
                            </Link>
                        </ListItem>
                        <hr />
                        <div>
                            <TextField label="Title" id="standard-size-small" size="small" onChange={this.handleChangeTitle} />
                            <TextField label="Content" id="standard-size-small" size="small" onChange={this.handleChangeContent} />
                            <TextField className="tagSelect" id="select" label="Tags" select onChange={this.handleChangeTag}>
                                {this.state.Tags && this.state.Tags.map((Tag) => <MenuItem value={Tag}>{Tag}</MenuItem>)}
                            </TextField>
                        </div>
                        <hr />
                        {this.state.notes && this.state.notes.map((note) =>
                            <>
                                <ListItemLink button href={note._id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <NotesIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={note.title} secondary={note.content} />
                                </ListItemLink>
                                <Divider />
                            </>
                        )}
                    </List>
                </div>
            </>
        )
    }
}
export default sidebar