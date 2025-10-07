import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UpdateProfil from './UpdateProfil';
import UserLayout from './UserLayout';
import MyProfil from './MyProfil';
import UpdatePassword from './UpdatePassword';
import UpdateUser from './UpdateUser';
import ListUsers from './ListUsers';
import OneUser from './OneUser';

const UserRouter = () => {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route path="updateprofil" element={<UpdateProfil />} />
                <Route path="updatepass" element={<UpdatePassword />} />
                <Route path="myprofil" element={<MyProfil />} />
                <Route path="list" element={<ListUsers />} />
                <Route path="one/:id" element={<OneUser />} />
                <Route path="update/:id" element={<UpdateUser />} />
            </Route>
        </Routes>
    );
};

export default UserRouter;