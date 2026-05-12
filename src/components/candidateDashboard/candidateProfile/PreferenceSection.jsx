import { useState } from "react";
import axios from "../../../api/axios";
import Modal from "../Modal";
import "./PreferenceSection.css";

const jobTypes = [
  "full-time",
  "part-time",
  "internship",
  "contract",
  "freelance",
];

const remoteOptions = ["remote", "hybrid", "onsite"];

const noticePeriods = ["immediate", "15-days", "30-days", "60-days", "90-days"];

const PreferenceSection = ({ preferences, refreshProfile }) => {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    preferredLocations: preferences?.preferredLocations || [],
    expectedSalary: preferences?.expectedSalary || "",
    jobType: preferences?.jobType || "",
    remotePreference: preferences?.remotePreference || "",
    noticePeriod: preferences?.noticePeriod || "",
    willingToRelocate: preferences?.willingToRelocate || false,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLocationChange = (value) => {
    const locations = value.split(",").map((l) => l.trim());

    setFormData((prev) => ({
      ...prev,
      preferredLocations: locations,
    }));
  };

  const handleSave = async () => {
    const payload = {
      ...formData,
      expectedSalary: formData.expectedSalary
        ? Number(formData.expectedSalary)
        : undefined,
    };

    try {
      await axios.patch("/candidate-preference", payload);

      await refreshProfile();
      setOpenModal(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save preferences");
    }
  };

  const handleClearAll = async () => {
    try {
      await axios.delete("/candidate-preference");

      await refreshProfile();
      setOpenModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to clear preferences");
    }
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h3>Preferences</h3>

        <button
          className="section-edit-btn"
          onClick={() => {
            setFormData({
              preferredLocations: preferences?.preferredLocations || [],
              expectedSalary: preferences?.expectedSalary || "",
              jobType: preferences?.jobType || "",
              remotePreference: preferences?.remotePreference || "",
              noticePeriod: preferences?.noticePeriod || "",
              willingToRelocate: preferences?.willingToRelocate || false,
            });
            setError("");
            setOpenModal(true);
          }}
        >
          Edit
        </button>
      </div>

      {preferences ? (
        <div className="preference-content">
          {preferences.preferredLocations?.length > 0 && (
            <p>
              <strong>Preferred Locations:</strong>{" "}
              {preferences.preferredLocations.join(", ")}
            </p>
          )}

          {preferences.expectedSalary && (
            <p>
              <strong>Expected Salary:</strong> ₹{preferences.expectedSalary}
            </p>
          )}

          {preferences.jobType && (
            <p>
              <strong>Job Type:</strong> {preferences.jobType}
            </p>
          )}

          {preferences.remotePreference && (
            <p>
              <strong>Work Mode:</strong> {preferences.remotePreference}
            </p>
          )}

          {preferences.noticePeriod && (
            <p>
              <strong>Notice Period:</strong> {preferences.noticePeriod}
            </p>
          )}

          <p>
            <strong>Willing to Relocate:</strong>{" "}
            {preferences.willingToRelocate ? "Yes" : "No"}
          </p>
        </div>
      ) : (
        <p className="empty-section-text">No preferences added</p>
      )}

      {openModal && (
        <Modal title="Edit Preferences" onClose={() => setOpenModal(false)}>
          {error && <p className="form-error">{error}</p>}

          <div className="preference-modal">
            <div className="preference-clear">
              <button className="clear-all-btn" onClick={handleClearAll}>
                Clear all
              </button>
            </div>

            <input
              placeholder="Preferred Locations (Jaipur, Bangalore)"
              value={formData.preferredLocations.join(", ")}
              onChange={(e) => handleLocationChange(e.target.value)}
            />

            <input
              type="number"
              placeholder="Expected Salary (Annual ₹ e.g. 1200000)"
              value={formData.expectedSalary}
              onChange={(e) => handleChange("expectedSalary", e.target.value)}
            />

            <select
              value={formData.jobType}
              onChange={(e) => handleChange("jobType", e.target.value)}
            >
              <option value="">Job Type</option>
              {jobTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>

            <select
              value={formData.remotePreference}
              onChange={(e) => handleChange("remotePreference", e.target.value)}
            >
              <option value="">Work Mode</option>
              {remoteOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <select
              value={formData.noticePeriod}
              onChange={(e) => handleChange("noticePeriod", e.target.value)}
            >
              <option value="">Notice Period</option>
              {noticePeriods.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>

            <label className="relocate-checkbox">
              <input
                type="checkbox"
                checked={formData.willingToRelocate}
                onChange={(e) =>
                  handleChange("willingToRelocate", e.target.checked)
                }
              />
              Willing to relocate
            </label>

            <div className="modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>

              <button className="modal-submit-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PreferenceSection;
