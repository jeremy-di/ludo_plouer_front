import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicLayout from './PublicLayout';
import Home from './Home';
import Register from './Register';
import Login from './Login'
import Error404 from '../../components/Error404';

const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Error404 />} />
            </Route>
        </Routes>
    );
};

export default PublicRouter;