import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";
import {
  createCompany,
  getMyCompany,
  updateCompany,
} from "../../services/company.service";
import ConfirmModal from "../../components/recruiter/shared/ConfirmModal";
import "../../styles/recruiter/companyProfilePage.css";

const CompanyProfilePage = () => {
  const { user, setUser } = useAuth();

  const companyExists = !!user?.companyId;

  const [formData, setFormData] = useState({
    name: "",
    website: "",
    industry: "",
    size: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(!companyExists);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (companyExists) {
      fetchCompany();
    }
  }, [companyExists]);

  const fetchCompany = async () => {
    try {
      const response = await getMyCompany();
      setFormData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmSave = async () => {
    try {
      setLoading(true);

      if (companyExists) {
        await updateCompany(formData);
      } else {
        await createCompany(formData);
      }

      const freshUser = await api.get("/auth/me");
      setUser(freshUser.data.data);

      setIsEditing(false);
      setShowConfirm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="company-page">
        <div className="company-header">
          <h2>Company Profile</h2>

          {companyExists && !isEditing && (
            <button
              className="edit-company-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Company Details
            </button>
          )}
        </div>

        {error && <div className="company-error">{error}</div>}

        {/* ================= VIEW MODE ================= */}
        {companyExists && !isEditing && (
          <div className="company-view-card">
            <div className="company-detail-item">
              <span className="label">Company Name</span>
              <span>{formData.name}</span>
            </div>

            <div className="company-detail-item">
              <span className="label">Website</span>
              <span>{formData.website || "-"}</span>
            </div>

            <div className="company-detail-item">
              <span className="label">Industry</span>
              <span>{formData.industry || "-"}</span>
            </div>

            <div className="company-detail-item">
              <span className="label">Company Size</span>
              <span>{formData.size || "-"}</span>
            </div>

            <div className="company-detail-item">
              <span className="label">Location</span>
              <span>{formData.location || "-"}</span>
            </div>

            <div className="company-detail-item full-width">
              <span className="label">Description</span>
              <span>{formData.description || "-"}</span>
            </div>
          </div>
        )}

        {/* ================= EDIT MODE ================= */}
        {isEditing && (
          <form
            className="company-form"
            onSubmit={(e) => {
              e.preventDefault();
              setShowConfirm(true);
            }}
          >
            <div className="company-grid">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Industry</label>
                <input
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Company Size</label>
                <input
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Location</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="company-actions">
              {companyExists && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              )}

              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>

      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to save these company changes?"
          confirmText="Save Changes"
          cancelText="Review Again"
          variant="primary"
          onConfirm={handleConfirmSave}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default CompanyProfilePage;
