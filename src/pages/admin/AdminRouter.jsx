import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import HomeAdmin from './HomeAdmin';

const AdminRouter = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="/" element={<HomeAdmin />} />
            </Route>
        </Routes>
    );
};

export default AdminRouter;