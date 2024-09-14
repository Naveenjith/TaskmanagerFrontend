import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../services/taskservice';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Form, Alert, Navbar, Nav } from 'react-bootstrap';

const Tasklist = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all'); // Filter state
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTasks();
    }, [filter]);

    const fetchTasks = async () => {
        try {
            const allTasks = await getTasks();
            setTasks(allTasks);
        } catch (error) {
            setError('Error fetching tasks');
            console.error('Error fetching tasks:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            fetchTasks(); // Refresh task list
        } catch (error) {
            setError('Error deleting task');
            console.error('Error deleting task:', error);
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.status;
        if (filter === 'pending') return !task.status;
        return true; // 'all'
    });

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Task Management system</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-5">
                <h1>Task List</h1>
                <Form className="mb-3">
                    <Form.Group>
                        <Form.Label>Filter Tasks</Form.Label>
                        <Form.Control
                            as="select"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
                {error && <Alert variant="danger">{error}</Alert>}
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.status ? 'Completed' : 'Pending'}</td>
                                <td>
                                    <Link to={`/tasks/${task.id}`}>
                                        <Button variant="info" className="me-2">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button variant="danger" onClick={() => handleDelete(task.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Link to="/tasks/new">
                    <Button variant="primary">Create New Task</Button>
                </Link>
            </Container>
        </>
    );
};

export default Tasklist;
