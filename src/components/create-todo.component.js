import React, {Component} from 'react';
import axios from 'axios';
import * as Yup from "yup";

export default class CreateTodo extends Component {
    constructor(props){
        super(props);
        this.OnChangeTodoDescription = this.OnChangeTodoDescription.bind(this);
        this.OnChangeTodoResponsible = this.OnChangeTodoResponsible.bind(this);
        this.OnChangeTodoPriority = this.OnChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible : '',
            todo_priority: '',
            todo_completed: false
        }
    }
    OnChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }
    OnChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }
    OnChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }
        onSubmit(e){
            e.preventDefault();
        console.log('Form submitted:');
        console.log(`Todo Description: ${this.state.todo_description}`); 
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);  
        console.log(`Todo Priority: ${this.state.todo_priority}`);        
        console.log(`Todo Completed: ${this.state.todo_completed}`);   
        
            const newTodo = {
                todo_description: this.state.todo_description,
                todo_responsible: this.state.todo_responsible,
                todo_priority: this.state.todo_priority,
                todo_completed: this.state.todo_completed
            }

                axios.post('http://localhost:4000/todos/add', newTodo)
                .then(res => console.log(res.data));            

                this.setState({
                    todo_description: '',
                    todo_responsible : '',
                    todo_priority: '',
                    todo_completed: false
                });
        }

    render() {
        return (
            <div className="container-fluid">
                <h3>Create Todo</h3>
            <form autoComplete="off" onSubmit={this.onSubmit}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>Description</label>
                    <input type="text" value={this.state.todo_description} onChange={this.OnChangeTodoDescription} className="form-control" placeholder="Enter To Do Description"/>
                </div>
                <div className="form-group col-md-6">
                    <label>Responsible</label>
                    <input type="text" value={this.state.todo_responsible} onChange={this.OnChangeTodoResponsible} className="form-control" placeholder="Enter To Do Responsible"/>
                </div>
                <div className="form-group col-md-12">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="priorityOptions" id="priorityLow" value="Low" checked={this.state.todo_priority==='Low'} onChange={this.OnChangeTodoPriority} />
                        <label className="form-check-label mr-2">Low Priority</label>
                        <input className="form-check-input" type="radio" name="priorityOptions" id="priorityMedium" value="Medium" checked={this.state.todo_priority==='Medium'} onChange={this.OnChangeTodoPriority} />
                        <label className="form-check-label mr-2">Medium Priority</label>
                        <input className="form-check-input" type="radio" name="priorityOptions" id="priorityHigh" value="High" checked={this.state.todo_priority==='High'} onChange={this.OnChangeTodoPriority} />
                        <label className="form-check-label">High Priority</label>
                    </div>
                </div>
            </div>
                <input type="submit" value="Create Todo" className="btn btn-outline-primary" />
          </form>
          </div>
        )
    }
}