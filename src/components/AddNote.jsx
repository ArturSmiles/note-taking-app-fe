import React, { Component } from 'react'
import { InputBase, Chip,TextField,MenuItem } from "@material-ui/core"
import { confirmAlert } from 'react-confirm-alert';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import "./styles/Note.css"

export class AddNote extends Component {
    state = {
        title: "Title",
        content: "Content",
        tags: [],
        allTags: [],
        add: false,
        addedTag: "",
    }

    async componentDidMount() {
        const tagRes = await fetch("http://localhost:3001/api/notes/tags")
        const tagData = await tagRes.json()
        this.setState({ allTags: tagData })
    }
    onChangeTitle = (event) => {
        this.setState({ title: event.target.value })
    }
    onChangeContent = (event) => {
        this.setState({ content: event.target.value })
    }

    async onSave() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: this.state.title, content: this.state.content,tags:[...this.state.tags] })
        }
        await fetch(`http://localhost:3001/api/notes/`, requestOptions)
        alert("Successfully posted Note")
        window.location.replace("http://localhost:3000/")
    }

    submitDone = () => {
        confirmAlert({
            title: 'Do you really want to Post this Note ?',
            message: 'Confirm to submit.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: this.onSave.bind(this)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };
    handleAdd=()=>{this.setState({add:true})}

    handleDelete = (tag) => {
        const filteredTags = this.state.tags.filter(tags => tags !==tag)
        console.log(filteredTags)
        this.setState({tags:filteredTags})
    }
    handleChangeTag = (event) => {
        this.setState({ addedTag: event.target.value })
    }
    handleSave = () => {
        this.setState({ tags: [...this.state.tags,this.state.addedTag],add:false})
    }

    render() {
        return (
            <>
                <div>
                    <ul className="NoteUl">
                        <li className="NoteLi">
                            <div className="NoteA">
                                <h2 className="NoteH2">
                                    <InputBase
                                        defaultValue={"Title"}
                                        inputProps={{ 'aria-label': 'naked', "style": { textAlign: "center" } }}
                                        className="NoteH2"
                                        onChange={this.onChangeTitle}
                                    /></h2>
                                <div className="DoneDiv"><DoneIcon onClick={this.submitDone.bind(this)} fontSize="large" /></div>
                                <hr className="tDivider" />
                                <p className="tagP"> Tags:{this.state.tags && this.state.tags.map((tags,index) =>
                                    <Chip key={index} label={tags} size="small" onDelete={this.handleDelete.bind(this,tags)}></Chip>
                                )}{this.state.add ? <><p>Select an out of existing Tags</p><TextField className="tagSelectAdd" id="select" label="Tags" select onChange={this.handleChangeTag}>
                                    {this.state.allTags && this.state.allTags.map((Tag) => <MenuItem value={Tag}>{Tag}</MenuItem>)}
                                </TextField><p>Or Add a new one</p><TextField className="tagSelectAdd" id="standard-basic" label="Standard" onChange={this.handleChangeTag.bind(this)}/><div className="addTagDiv2"><DoneIcon fontSize="large" onClick={this.handleSave.bind(this)} /></div></>:<div className="addTagDiv"><AddIcon onClick={this.handleAdd.bind(this)} /></div>}</p>
                                <hr className="tDivider" />
                                <div className="NoteP"><InputBase
                                    defaultValue={"Content"}
                                    inputProps={{ 'aria-label': 'naked' }}
                                    className="NoteP"
                                    onChange={this.onChangeContent}
                                /></div>
                                <hr />
                                <p className="NoteP"><InputBase
                                    defaultValue={""}
                                    inputProps={{ 'aria-label': 'naked' }}
                                    className="NoteP"
                                    onChange={this.onChangeContent}
                                /></p>
                                <hr />
                                <p className="NoteP"><InputBase
                                    defaultValue={""}
                                    inputProps={{ 'aria-label': 'naked' }}
                                    className="NoteP"
                                    onChange={this.onChangeContent}
                                /></p>
                                <hr />
                                <p className="NoteP"><InputBase
                                    defaultValue={""}
                                    inputProps={{ 'aria-label': 'naked' }}
                                    className="NoteP"
                                    onChange={this.onChangeContent}
                                /></p>
                                <hr />
                                <p className="NoteP"><InputBase
                                    defaultValue={""}
                                    inputProps={{ 'aria-label': 'naked' }}
                                    className="NoteP"
                                    onChange={this.onChangeContent}
                                /></p>
                                <hr />
                                <p className="NoteP"><InputBase
                                    defaultValue={""}
                                    inputProps={{ 'aria-label': 'naked' }}
                                    className="NoteP"
                                    onChange={this.onChangeContent}
                                /></p>
                                <hr />
                                <p className="NoteP"><InputBase
                                    defaultValue={""}
                                    inputProps={{ 'aria-label': 'naked' }}
                                    className="NoteP"
                                    onChange={this.onChangeContent}
                                /></p>
                                <hr />
                                <p className="NoteP"><InputBase
                                    defaultValue={""}
                                    inputProps={{ 'aria-label': 'naked' }}
                                    className="NoteP"
                                    onChange={this.onChangeContent}
                                /></p>
                                <hr />
                                <p className="NoteP"><InputBase
                                    defaultValue={""}
                                    inputProps={{ 'aria-label': 'naked' }}
                                    className="NoteP"
                                    onChange={this.onChangeContent}
                                /></p>
                                <hr />
                                <p className="NoteP"><InputBase
                                    defaultValue={""}
                                    inputProps={{ 'aria-label': 'naked' }}
                                    className="NoteP"
                                    onChange={this.onChangeContent}
                                /></p>
                                <hr />
                                <p className="NoteP"><InputBase
                                    defaultValue={""}
                                    inputProps={{ 'aria-label': 'naked' }}
                                    className="NoteP"
                                    onChange={this.onChangeContent}
                                /></p>
                                <hr />
                                <div className="spacer"></div>
                                <hr />
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}

export default AddNote

