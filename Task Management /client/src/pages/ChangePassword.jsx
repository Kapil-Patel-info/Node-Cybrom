import React, { useState } from 'react';
import axios from 'axios';
import BackEndUrl from "../config/BackendUrl";
import { Eye, EyeOff } from 'react-feather'; // For password visibility toggle

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: ""
  });
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [showPassword, setShowPassword] = useState({
    oldPass: false,
    newPass: false,
    confirmPass: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userid = localStorage.getItem("userid");

    // Validation
    if (formData.newPass !== formData.confirmPass) {
      setMsg({ text: "New passwords do not match.", type: "error" });
      return;
    }

    if (formData.newPass.length < 8) {
      setMsg({ text: "Password must be at least 8 characters long.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    setMsg({ text: "", type: "" });

    try {
      const res = await axios.post(`${BackEndUrl}/user/changepassword`, {
        userid,
        oldPass: formData.oldPass,
        newPass: formData.newPass,
      });

      if (res.data.success) {
        setMsg({ text: "Password changed successfully!", type: "success" });
        setFormData({
          oldPass: "",
          newPass: "",
          confirmPass: ""
        });
      } else {
        setMsg({ text: res.data.message || "Error occurred.", type: "error" });
      }
    } catch (err) {
      setMsg({ 
        text: err.response?.data?.message || "Server error.", 
        type: "error" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card p-4 shadow" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary">Change Password</h3>
          <p className="text-muted">Update your account password</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Old Password */}
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <div className="input-group">
              <input 
                type={showPassword.oldPass ? "text" : "password"} 
                className="form-control" 
                name="oldPass"
                value={formData.oldPass} 
                onChange={handleChange} 
                required 
              />
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={() => togglePasswordVisibility('oldPass')}
              >
                {showPassword.oldPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          {/* New Password */}
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <div className="input-group">
              <input 
                type={showPassword.newPass ? "text" : "password"} 
                className="form-control" 
                name="newPass"
                value={formData.newPass} 
                onChange={handleChange} 
                required 
              />
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={() => togglePasswordVisibility('newPass')}
              >
                {showPassword.newPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <small className="text-muted">Minimum 8 characters</small>
          </div>
          
          {/* Confirm New Password */}
          <div className="mb-4">
            <label className="form-label">Confirm New Password</label>
            <div className="input-group">
              <input 
                type={showPassword.confirmPass ? "text" : "password"} 
                className="form-control" 
                name="confirmPass"
                value={formData.confirmPass} 
                onChange={handleChange} 
                required 
              />
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={() => togglePasswordVisibility('confirmPass')}
              >
                {showPassword.confirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Changing...
              </>
            ) : "Change Password"}
          </button>
          
          {/* Message Alert */}
          {msg.text && (
            <div className={`mt-3 alert alert-${msg.type === "error" ? "danger" : "success"}`}>
              {msg.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;