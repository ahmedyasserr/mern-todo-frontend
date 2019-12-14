import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

    this.OnChangeTodoDescription = this.OnChangeTodoDescription.bind(this); 
    this.OnChangeTodoResponsible = this.OnChangeTodoResponsible.bind(this); 
    this.OnChangeTodoPriority = this.OnChangeTodoPriority.bind(this); 
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);   
    this.onSubmit = this.onSubmit.bind(this); 

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                todo_description : response.data.todo_description,
                todo_responsible: response.data.todo_responsible,
                todo_priority: response.data.todo_priority,
                todo_completed: response.data.todo_completed
            })
        })
        .catch(function(error){
            console.log(error);
        })
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

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

        onSubmit(e) {
            e.preventDefault();
            const obj = {
                todo_description: this.state.todo_description,
                todo_responsible: this.state.todo_responsible,
                todo_priority: this.state.todo_priority,
                todo_completed: this.state.todo_completed
            };
            axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
            this.props.history.push('/')
        }

    render() {
        return (
            <div className="container-fluid">
             <h3>Update Todo</h3>
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
                <div className="form-check mb-2">
                    <input type="checkbox" className="form-check-input" id="completedCheckbox" name="completedCheckbox"
                    onChange={this.onChangeTodoCompleted} checked={this.state.todo_completed}
                    value={this.state.todo_completed} />
                    <label className="form-check-label" htmlFor="completedCheckbox">Completed</label>
                </div>
            </div>
                <input type="submit" value="Update Todo" className="btn btn-outline-primary" />
          </form>
            </div>
        )
    }
}