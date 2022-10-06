import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Sidebar from './Sidebar/Sidebar.jsx';
import Layout from './Layout';
import Dashboard from './dashboard/Dashboard';
import User from './manage/User';
import Lesson from './manage/Lesson';
import Therapist from './manage/Therapist';
import Manager from './manage/Manager';
import Payment from './manage/Payment';
import AddTherapist from './component/Add_Therapist';
import AddCaseManager from './component/Add_CaseManager';
import CaseManagerDetails from './component/Case_ManagerDetails';
import CaseManagerDetailsss from './component/CaseManagerDetailsss';
import ViewLesson from './component/ViewLesson';
import UserDetail from './component/UserDetail';
import AddLessons from './component/Add_Lessons';
import EditLessons from './component/Edit_Lessons';
import EditUser from './users/Edit_User';
import { Helmet } from "react-helmet";
import PrivateRoute from './component/PrivateRoute';
import EditCaseManager from './component/Edit_CaseManager';
import EditTherapist from './component/Edit_Therapist';
import OnilneUsers from './component/OnilneUsers';
import CreateUser from './users/CreateUser';

function App() {


  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pacific Shores</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/sidebar" element={<Sidebar />}></Route>
        <Route exact path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>}></Route>
        {/* user inhouse*/}
        <Route path="/manage-user" element={<PrivateRoute><Layout><User /> </Layout></PrivateRoute>}></Route>
        <Route path="/manage-user/create-user" element={<PrivateRoute><Layout><CreateUser /></Layout></PrivateRoute>}></Route>

        <Route path="/manage-user/edit-user/:id" element={<PrivateRoute><Layout><EditUser /></Layout></PrivateRoute>}></Route>
        <Route path="/manage-user/user-detail/:id" element={<PrivateRoute><Layout><UserDetail /></Layout></PrivateRoute>}></Route>
        {/* online users */}
        <Route path="/online-user" element={<PrivateRoute><Layout><OnilneUsers /> </Layout></PrivateRoute>}></Route>
        {/*  */}
        <Route path="/manage-lesson" element={<PrivateRoute><Layout><Lesson /></Layout></PrivateRoute>}></Route>
        <Route path="/manage-payment" element={<PrivateRoute><Layout><Payment /> </Layout></PrivateRoute>}></Route>
        {/* therpaost */}
        <Route path="/manage-therapist" element={<PrivateRoute><Layout><Therapist /></Layout></PrivateRoute>}></Route>
        <Route path="/manage-therapist/add-therapist" element={<PrivateRoute><Layout><AddTherapist /></Layout></PrivateRoute>}></Route>
        <Route path="/manage-therapist/edit-therapist/:id" element={<PrivateRoute><Layout><EditTherapist /></Layout></PrivateRoute>}></Route>
        <Route path="/manage-therapist/case-therapist-details/:id" element={<PrivateRoute><Layout><CaseManagerDetails /> </Layout></PrivateRoute>}></Route>

        {/* lesson */}
        <Route path="/manage-lesson/add-lessons" element={<PrivateRoute><Layout><AddLessons /></Layout></PrivateRoute>}></Route>
        <Route path="/manage-lesson/edit-lesson/:id" element={<PrivateRoute><Layout><EditLessons /></Layout></PrivateRoute>}></Route>
        <Route path="/manage-lesson/viewlesson/:id" element={<PrivateRoute><Layout><ViewLesson /></Layout></PrivateRoute>}></Route>
        {/* manage case manager */}
        <Route path="/manage-case-manager" element={<PrivateRoute><Layout><Manager /></Layout></PrivateRoute>}></Route>
        <Route path="/manage-case-manager/add-case-manager" element={<PrivateRoute><Layout><AddCaseManager /> </Layout></PrivateRoute>}></Route>
        <Route path="/manage-case-manager/edit-case-manager/:id" element={<PrivateRoute><Layout><EditCaseManager /> </Layout></PrivateRoute>}></Route>
        <Route path="/manage-case-manager/case-manager-details/:id" element={<PrivateRoute><Layout><CaseManagerDetailsss /></Layout></PrivateRoute>}></Route>
      </Routes>
    </div>
  );
}

export default App;