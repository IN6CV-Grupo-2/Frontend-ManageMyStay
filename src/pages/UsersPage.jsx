// src/pages/UsersPage.jsx
import { Routes, Route } from 'react-router-dom';
import { UserList } from '../components/users/UserList.jsx';
import { UserDetails } from '../components/users/UserDetails.jsx';
import { UserForm } from '../components/users/UserForm.jsx';

export const UsersPage = () => {
  return (
    <Routes>
      <Route index element={<UserList />} />
      <Route path=":id" element={<UserDetails />} />
      <Route path="edit/:id" element={<UserForm />} />
    </Routes>
  );
};

export default UsersPage;
