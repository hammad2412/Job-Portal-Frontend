import { useState } from "react";
import axios from "../../../../api/axios";
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

const PreferenceModal = ({ preferences, closeModal, refreshProfile }) => {
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
      console.log("CREATE:", payload);
      await axios.patch("/candidate-preference", payload);
      console.log("Updated", payload);

      await refreshProfile();
      closeModal();
    } catch (error) {
      console.error("Preference save error:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="preference-modal">
        <h3>Edit Preferences</h3>

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
          <button className="modal-cancel-btn" onClick={closeModal}>
            Cancel
          </button>

          <button className="modal-submit-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferenceModal;
