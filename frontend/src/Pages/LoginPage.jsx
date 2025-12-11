
import React from 'react';
import { Link } from 'react-router-dom';
import authStore from '../stores/authStore.js';
const Login = () => {
    const {login} = authStore();
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = {
            "username": username,
            "password": password
        }
        login(formData);

    };
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    return (
        <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Log in to your account 🔐
                </h1>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            value={username}
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='username'
                            placeholder='Your Username'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            value={password}
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out`}
                            id='password'
                            placeholder='Your Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </form>
                <div className='flex items-center mt-6'>
                    <button 
                    className='px-8 py-2 bg-zinc-900 font-semibold rounded-lg text-white'
                    onClick={handleFormSubmit}>
                        Login
                    </button>
                </div>
                <p className='mt-4 w-full text-center text-gray-500'>
                    Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;