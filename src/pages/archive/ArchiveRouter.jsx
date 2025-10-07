import React from 'react';
import ListArchives from './ListArchives';
import ArchiveLayout from './ArchiveLayout';
import { Route, Routes } from 'react-router-dom';


const ArchiveRouter = () => {
    return (
        <Routes>
            <Route element={<ArchiveLayout />}>
                <Route path="list" element={<ListArchives/>} />
                <Route path="one/:id" element={"<OneActivity />"} />
            </Route>
        </Routes>
    );
};

export default ArchiveRouter;