import React, { useState } from 'react';
import axios from 'axios';
import BackEndUrl from "../config/BackendUrl";

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = async (e) => {
    e.preventDefault();
    const userid = localStorage.getItem("userid");

    if (newPass !== confirmPass) {
      setMsg("New passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(`${BackEndUrl}/admin/changepassword`, {
        userid,
        oldPass,
        newPass,
      });

      if (res.data.success) {
        setMsg("Password changed successfully!");
      } else {
        setMsg(res.data.message || "Error occurred.");
      }
    } catch (err) {
      setMsg("Server error.");
    }
  };

  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h4 className="mb-3">Change Password</h4>
      <form onSubmit={handleChange}>
        <div className="mb-3">
          <label className="form-label">Old Password</label>
          <input type="password" className="form-control" value={oldPass} onChange={e => setOldPass(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input type="password" className="form-control" value={newPass} onChange={e => setNewPass(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm New Password</label>
          <input type="password" className="form-control" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Change Password</button>
        {msg && <div className="mt-3 alert alert-info">{msg}</div>}
      </form>
    </div>
  );
};

export default ChangePassword;
