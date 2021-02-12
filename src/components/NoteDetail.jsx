import React, { Component } from 'react'
import {Chip, InputBase } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import "./styles/Note.css"
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export class NoteDetail extends Component {
    state = {
        tags: [],
        edit: false,
        title: "",
        content: "",
        note: "",
        open:false
    }
    


    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.note.tags !== this.props.note.tags) {
            this.setState({ tags: this.props.note.tags, title: this.props.note.title, content: this.props.note.content })
            const url = `http://localhost:3001/api/notes/${this.props.id}`
            const res = await fetch(url)
            const note = await res.json()
            this.setState({ note: note })
            console.log(url)
        }else if (prevProps.id !== this.props.id){
            const url = `http://localhost:3001/api/notes/${this.props.id}`
            const res = await fetch(url)
            const note = await res.json()
            this.setState({ note: note })
        }
    }
    onEdit() {
        this.setState({ edit: !this.state.edit })
    }
    async onSave() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: this.state.title, content: this.state.content })
        }
        await fetch(`http://localhost:3001/api/notes/${this.props.id}`, requestOptions)
        alert("Successfully edited Note")
        const url = `http://localhost:3001/api/notes/${this.props.id}`
        const res = await fetch(url)
        const note = await res.json()
        this.setState({ note: note })
        this.setState({ edit: false })
    }
    async onDelete(){
        await fetch(`http://localhost:3001/api/notes/${this.props.id}`,{ method: 'DELETE'})
        alert("Successfully deleted Note")
        window.location.replace("http://localhost:3000/")
    }

    onChangeTitle = (event) => {
        this.setState({ title: event.target.value })
    }
    onChangeContent = (event) => {
        this.setState({ content: event.target.value })
    }
    submitEdit = () => {
        confirmAlert({
          title: 'Done Editing ?',
          message: 'Confirm to submit.',
          buttons: [
            {
              label: 'Yes',
              onClick: this.onSave.bind(this)
            },
            {
              label: 'No',
              onClick: () => {}
            }
          ]
        });
      };
      submitDelete=()=>{
        confirmAlert({
            title: 'Do you really want to Delete this Note',
            message: 'Confirm to submit.',
            buttons: [
              {
                label: 'Yes',
                onClick: this.onDelete.bind(this)
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          });
      }

    render() {
        return (
            <>
            {this.state.note&&
            <div key={this.state._id}>
            <ul className="NoteUl">
                <li className="NoteLi">
                    <div className="NoteA">
                        {this.state.edit ?
                            <> 
                                <h2 className="NoteH2">
                                    <InputBase
                                        defaultValue={this.state.note.title}
                                        inputProps={{ 'aria-label': 'naked',"style":{textAlign:"center"} }}
                                        className="NoteH2"
                                        onChange={this.onChangeTitle}
                                    /></h2>
                                    <div className="IconDiv"><SaveIcon onClick={this.submitEdit.bind(this)} fontSize="large" /><DeleteIcon onClick={this.submitDelete.bind(this)} fontSize="large" /><ClearIcon onClick={this.onEdit.bind(this)} fontSize="large" /></div>
                                <hr className="tDivider" />
                                <div>
                                    <p>Tags:{this.state.tags && this.state.tags.map((tags) =>
                                        <Chip key={tags} label={tags} size="small"></Chip>
                                    )}<div className="TagEdit"><EditIcon /></div></p>
                                </div>
                                <hr className="tDivider" />
                                <p className="NoteP"><InputBase
                                    defaultValue={this.state.note.content}
                                    inputProps={{ 'aria-label': 'naked' }}
                                    className="NoteP"
                                    onChange={this.onChangeContent}
                                /></p>
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer"></div>
                                <hr /></>
                            :
                            <>
                                <h2 className="NoteH2">{this.state.note.title}</h2>
                                <div className="IconDiv"><EditIcon onClick={this.onEdit.bind(this)} fontSize="large" /><DeleteIcon onClick={this.submitDelete.bind(this)} fontSize="large" /></div>
                                <hr className="tDivider" />
                                <div>
                                    <p>Tags:{this.state.tags && this.state.tags.map((tags) =>
                                        <Chip key={tags} label={tags} size="small"></Chip>
                                    )}<div className="TagEdit"><EditIcon /></div></p>
                                </div>
                                <hr className="tDivider" />
                                <p className="NoteP">{this.state.note.content}</p>
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer" />
                                <hr />
                                <div className="spacer"></div>
                                <hr /></>}
                    </div>
                </li>
            </ul>
        </div>}
            </>
        )
    }
}

export default NoteDetail
