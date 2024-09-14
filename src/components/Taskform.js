import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTask, updateTask, getTask } from '../services/taskservice';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Taskform = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getTask(id)
                .then(data => {
                    setTitle(data.title);
                    setDescription(data.description);
                    setStatus(data.status);
                })
                .catch(error => setError('Error fetching task.'));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, description, status };

        try {
            if (id) {
                await updateTask(id, taskData);
                navigate('/tasklist');
            } else {
                await createTask(taskData);
                navigate('/tasklist');
            }
        } catch (error) {
            setError('Error submitting form.');
        }
    };

    return (
        <Container className="my-5">
            <h1 className="mb-4">{id ? 'Edit Task' : 'Create Task'}</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle" className="mb-3">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDescription" className="mb-3">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formStatus" className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Completed"
                        checked={status}
                        onChange={() => setStatus(!status)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {id ? 'Update' : 'Create'} Task
                </Button>
            </Form>
        </Container>
    );
};

export default Taskform;
