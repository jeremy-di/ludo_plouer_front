import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MemberLayout from './MemberLayout';
import CreateMember from './CreateMember';
import ListMembers from './ListMembers';
import OneMember from './OneMember';
import UpdateMember from './UpdateMember';

const MemberRouter = () => {
    return (
        <Routes>
            <Route element={<MemberLayout />}>
                <Route path="create" element={<CreateMember />} />
                <Route path="list" element={<ListMembers />} />
                <Route path="one/:id" element={<OneMember />} />
                <Route path="update/:id" element={<UpdateMember />} />
            </Route>
        </Routes>
    );
};

export default MemberRouter;