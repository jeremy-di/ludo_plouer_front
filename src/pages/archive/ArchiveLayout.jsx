import React from 'react';
import Header from '../../components/Header.jsx'
import { Outlet } from 'react-router-dom';

const ArchiveLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default ArchiveLayout;