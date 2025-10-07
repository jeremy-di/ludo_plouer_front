import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ActivityLayout from './ActivityLayout';
import CreateActivity from './CreateActivity';
import ListActivities from './ListActivities';
import OneActivity from './OneActivity';
import UpdateActivity from './UpdateActivity';

const ActivityRouter = () => {
    return (
        <Routes>
            <Route element={<ActivityLayout />}>
                <Route path="new" element={<CreateActivity />} />
                <Route path="list" element={<ListActivities />} />
                <Route path="one/:id" element={<OneActivity />} />
                <Route path="update/:id" element={<UpdateActivity />} />
            </Route>
        </Routes>
    );
};

export default ActivityRouter;