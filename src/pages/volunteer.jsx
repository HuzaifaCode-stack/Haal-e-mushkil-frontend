import React, { useState } from "react";
import axios from "axios";

export default function VolunteerRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    district: "",
    tehsil: "",
    village: "",
    otherInterest: "",
    pinCode: "",
    interests: [],
    daysAvailable: [],
    timeOfDay: [],
    volunteeringStyle: "",
    weeklyHours: "",
    matchPreferences: [],
    consentData: false,
    consentTerms: false,
  });

  const endpoint = import.meta.env.VITE_API_URL;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (
        name === "interests" ||
        name === "daysAvailable" ||
        name === "timeOfDay" ||
        name === "matchPreferences"
      ) {
        setFormData((prev) => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((item) => item !== value),
          ...(name === "interests" &&
            value === "Other" &&
            !checked && { otherInterest: "" }),
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        fullName: formData.fullName,
        phoneOrWhatsapp: formData.phone,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        district: formData.district,
        tehsilOrBlock: formData.tehsil,
        villageOrLocality: formData.village,
        pinCode: formData.pinCode,
        areasOfInterest: formData.interests,
        otherInterest: formData.interests.includes("Other")
          ? formData.otherInterest
          : "",
        availableDays: formData.daysAvailable,
        timeOfDay: formData.timeOfDay,
        preferredVolunteeringStyle: formData.volunteeringStyle,
        weeklyTimeCommitment: formData.weeklyHours,
        matchPreferences: formData.matchPreferences,
        consentToStoreData: formData.consentData,
        consentToBeContacted: formData.consentTerms,
      };

      const { data } = await axios.post(
        `${endpoint}/v1/volenteer/create`,
        payload
      );

      if (data.success) {
        alert("Volunteer registered successfully!");
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          age: "",
          gender: "",
          district: "",
          tehsil: "",
          village: "",
          otherInterest: "",
          pinCode: "",
          interests: [],
          daysAvailable: [],
          timeOfDay: [],
          volunteeringStyle: "",
          weeklyHours: "",
          matchPreferences: [],
          consentData: false,
          consentTerms: false,
        });
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      alert("Server error while submitting the form.");
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid bg-white">
        <div className="container pb-5 bg-light">
          <div className="row justify-content-center p-3">
            <div className="col-lg-12">
              <div
                className="card bg-light  border-0"
                style={{ borderRadius: "20px" }}
              >
                <h1 className="py-4 text-center border-bottom border-2 ">
                  WE come a Volunteer{" "}
                </h1>
                <p className="text-center">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Nobis placeat nemo doloremque, officiis iure dolorum modi{" "}
                  <br /> corrupti ex praesentium quod rerum nesciunt tempora non
                  repellat minus optio ea minima ad.
                </p>
                <div
                  className="card-header bg-light text-start py-4 text-black"
                  style={{
                    background: "white",
                    borderRadius: "20px 20px 0 0",
                    color: "white",
                  }}
                >
                  <h className="mb-0 fw-bold"> Khushaal Kasheer</h>
                  <p className="mb-0 mt-2 ">
                    Volunteer Match Registration Form
                  </p>
                </div>

                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    {/* Basic Information */}
                    <div className="mb-4">
                      <h4 className="text-black mb-4 d-flex align-items-center">
                        <i className="bi bi-person-circle me-2"></i>
                        Basic Information
                      </h4>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            className="form-control shadow-none form-control-lg py-1"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            className="form-control shadow-none form-control-lg py-1"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                        <div className="col-md-8">
                          <label className="form-label fw-semibold">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            className="form-control shadow-none form-control-lg py-1"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label fw-semibold">
                            Age *
                          </label>
                          <input
                            type="number"
                            className="form-control shadow-none form-control-lg py-1"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            required
                            min="16"
                            max="80"
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-semibold">
                            Gender (optional)
                          </label>
                          <div className="d-flex flex-wrap gap-3 mt-2">
                            {[
                              "Male",
                              "Female",
                              "Other",
                              "Prefer not to say",
                            ].map((option) => (
                              <div key={option} className="form-check">
                                <input
                                  className="form-check-input shadow-none"
                                  type="radio"
                                  name="gender"
                                  value={option}
                                  checked={formData.gender === option}
                                  onChange={handleInputChange}
                                />
                                <label className="form-check-label">
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Location Details */}
                    <div className="mb-4">
                      <h4 className="text-black mb-4 d-flex align-items-center">
                        <i className="bi bi-geo-alt-fill me-2"></i>
                        Location Details
                      </h4>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            District *
                          </label>
                          <input
                            type="text"
                            className="form-control shadow-none form-control-lg py-1"
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            required
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Tehsil / Block *
                          </label>
                          <input
                            type="text"
                            className="form-control shadow-none form-control-lg py-1"
                            name="tehsil"
                            value={formData.tehsil}
                            onChange={handleInputChange}
                            required
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                        <div className="col-md-8">
                          <label className="form-label fw-semibold">
                            Village / Locality *
                          </label>
                          <input
                            type="text"
                            className="form-control shadow-none form-control-lg py-1"
                            name="village"
                            value={formData.village}
                            onChange={handleInputChange}
                            required
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label fw-semibold">
                            Pin Code *
                          </label>
                          <input
                            type="text"
                            className="form-control shadow-none form-control-lg py-1"
                            name="pinCode"
                            value={formData.pinCode}
                            onChange={handleInputChange}
                            required
                            pattern="[0-9]{6}"
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Areas of Interest */}
                    <div className="mb-4">
                      <h4 className="text-black mb-4 d-flex align-items-center">
                        Areas of Interest (Select all that apply)
                      </h4>
                      <div className="row g-2">
                        {[
                          "Women's Health & Empowerment",
                          "Education / Tuition Programs",
                          "Environment / Clean-up Drives",
                          "Civic Grievance Redress",
                          "Event Management & Media",
                          "Awareness Campaigns",
                          "Tech Support (Website, Data Entry)",
                          "Medical / Health Camps",
                          "Legal Aid / Documentation Help",
                        ].map((interest) => (
                          <div key={interest} className="col-md-6">
                            <div
                              className="form-check p-3 border rounded-3 h-100"
                              style={{ backgroundColor: "#f8f9fa" }}
                            >
                              <input
                                className="form-check-input shadow-none"
                                type="checkbox"
                                name="interests"
                                value={interest}
                                checked={formData.interests.includes(interest)}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label fw-medium">
                                {interest}
                              </label>
                            </div>
                          </div>
                        ))}
                        <div className="col-12">
                          <div
                            className="form-check p-3 border rounded-3"
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            <input
                              className="form-check-input shadow-none"
                              type="checkbox"
                              name="interests"
                              value="Other"
                              checked={formData.interests.includes("Other")}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label fw-medium me-3">
                              Other:
                            </label>
                            <input
                              type="text"
                              name="otherInterest"
                              className="form-control shadow-none d-inline-block"
                              value={formData.otherInterest}
                              onChange={handleInputChange}
                              disabled={!formData.interests.includes("Other")} // ✅ disables when "Other" is not checked
                              style={{ width: "auto", minWidth: "200px" }}
                              placeholder="Please specify..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Availability & Commitment */}
                    <div className="mb-4">
                      <h4 className="text-black mb-4 d-flex align-items-center">
                        <i className="bi bi-calendar-check me-2"></i>
                        Availability & Commitment
                      </h4>

                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          Days Available *
                        </label>
                        <div className="d-flex flex-wrap gap-2 mt-3 ">
                          {[
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ].map((day) => (
                            <div key={day} className="form-check">
                              <input
                                className="form-check-input shadow-none"
                                type="checkbox"
                                name="daysAvailable"
                                value={day}
                                checked={formData.daysAvailable.includes(day)}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label fw-medium">
                                {day}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          Time of Day *
                        </label>
                        <div className="d-flex flex-wrap gap-3 mt-3 ">
                          {["Morning", "Afternoon", "Evening"].map((time) => (
                            <div key={time} className="form-check">
                              <input
                                className="form-check-input shadow-none"
                                type="checkbox"
                                name="timeOfDay"
                                value={time}
                                checked={formData.timeOfDay.includes(time)}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label fw-medium">
                                {time}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          Preferred Volunteering Style *
                        </label>
                        <div className="d-flex flex-wrap gap-3 mt-3 ">
                          {["Field Work", "Remote / Online", "Both"].map(
                            (style) => (
                              <div key={style} className="form-check">
                                <input
                                  className="form-check-input shadow-none"
                                  type="radio"
                                  name="volunteeringStyle"
                                  value={style}
                                  checked={formData.volunteeringStyle === style}
                                  onChange={handleInputChange}
                                />
                                <label className="form-check-label fw-medium">
                                  {style}
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          Weekly Time Commitment *
                        </label>
                        <div
                          className="input-groupy-1"
                          style={{ maxWidth: "200px" }}
                        >
                          <input
                            type="number"
                            className="form-control shadow-none form-control-lg py-1"
                            name="weeklyHours"
                            value={formData.weeklyHours}
                            onChange={handleInputChange}
                            required
                            min="1"
                            max="40"
                            style={{ borderRadius: "10px 0 0 10px" }}
                          />
                          <span
                            className="input-group-text"
                            style={{ borderRadius: "0 10px 10px 0" }}
                          >
                            Hours/week
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Match Me With */}
                    <div className="mb-4">
                      <h4 className="text-black mb-4 d-flex align-items-center">
                        <i className="bi bi-search-heart me-2"></i>
                        Match Me With
                      </h4>
                      <p className="text-muted mb-4">
                        Select the kinds of events/projects you'd like to be
                        matched with
                      </p>
                      <div className="row g-2">
                        {[
                          "One-time Events (e.g., campaigns, camps)",
                          "Long-term Projects (e.g., education, grievance follow-up)",
                          "Emergency Response (e.g., disaster relief, urgent issues)",
                          "Any opportunity near my area",
                        ].map((preference) => (
                          <div key={preference} className="col-12">
                            <div
                              className="form-check p-3 border rounded-3"
                              style={{ backgroundColor: "#f8f9fa" }}
                            >
                              <input
                                className="form-check-input shadow-none"
                                type="checkbox"
                                name="matchPreferences"
                                value={preference}
                                checked={formData.matchPreferences.includes(
                                  preference
                                )}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label fw-medium">
                                {preference}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Consent & Declaration */}
                    <div className="mb-4">
                      <h4 className="text-black mb-4 d-flex align-items-center">
                        <i className="bi bi-shield-check me-2"></i>
                        Consent & Declaration
                      </h4>
                      <div className="bg-light p-3 rounded-3">
                        <div className="form-check mb-4">
                          <input
                            className="form-check-input shadow-none"
                            type="checkbox"
                            name="consentData"
                            checked={formData.consentData}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="form-check-label fw-medium">
                            I consent to Khushaal Kasheer storing my data for
                            volunteer coordination. *
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input shadow-none"
                            type="checkbox"
                            name="consentTerms"
                            checked={formData.consentTerms}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="form-check-label fw-medium">
                            I understand that I will be contacted for
                            opportunities based on my interests and
                            availability. *
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-4">
                      <button
                        type="submit"
                        className="btn btn-lg px-5 py-3 fw-bold text-white"
                        style={{
                          background:
                            "linear-gradient(45deg, #28a745, #20c997)",
                          border: "none",
                          borderRadius: "50px",
                          boxShadow: "0 8px 25px rgba(40, 167, 69, 0.3)",
                        }}
                      >
                        Register as Volunteer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Icons CDN */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css"
        rel="stylesheet"
      />

      {/* Bootstrap CSS CDN */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
        rel="stylesheet"
      />
    </div>
  );
}
