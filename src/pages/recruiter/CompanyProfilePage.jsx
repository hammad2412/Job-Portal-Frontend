import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  createCompany,
  getMyCompany,
  updateCompany,
} from "../../services/company.service";

const CompanyProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const isEditMode = !!user?.companyId;

  const [formData, setFormData] = useState({
    name: "",
    // website: "",
    industry: "",
    size: "",
    // location: "",
    //  description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode) {
      fetchCompany();
    }
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let response;

      if (isEditMode) {
        response = await updateCompany(formData);
        console.log("Update Company Response:", response);
      } else {
        response = await createCompany(formData);
        console.log("Create Company Response:", response);
      }

      // 🔥 Refresh real user from backend
      const freshUser = await api.get("/auth/me");
      console.log("Fresh User:", freshUser.data);

      setUser(freshUser.data.data);

      navigate("/recruiter/dashboard");
    } catch (err) {
      console.error("Company Operation Error:", err);
      console.error("Error Response:", err.response);
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{isEditMode ? "Edit Company" : "Create Company"}</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          placeholder="Company Name"
          onChange={handleChange}
          required
        />
        {/* <input
          name="website"
          value={formData.website}
          placeholder="Website"
          onChange={handleChange}
        /> */}
        <input
          name="industry"
          value={formData.industry}
          placeholder="Industry"
          onChange={handleChange}
        />
        <input
          name="size"
          value={formData.size}
          placeholder="Company Size"
          onChange={handleChange}
        />
        {/* <input
          name="location"
          value={formData.location}
          placeholder="Location"
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
        /> */}

        <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : isEditMode
              ? "Update Company"
              : "Create Company"}
        </button>
      </form>
    </div>
  );
};

export default CompanyProfilePage;
