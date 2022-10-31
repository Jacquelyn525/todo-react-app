import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const {login} = useAuth()
    const navigate = useNavigate()

    async function handleAuth() {     
        await login()
        
        return navigate('/')
    }

  return (
    <div className='login'>
        <article className='bg-info mb-5 p-5 text-dark'>
            <h1 className='text-center'>Welcome to my ToDo</h1>
        </article>
        <Container>
            <Card className='m-2 border-dark text-center'>
                <Card.Header className='bg-dark text-white'>
                    <h2>Login for full functionality</h2>
                    <Card.Body>
                        <button className='btn btn-success' onClick={() => handleAuth()}>
                            Login w/ Github
                        </button>
                    </Card.Body>
                </Card.Header>
            </Card>
        </Container>
    </div>
  )
}
