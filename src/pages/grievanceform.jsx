"use client";

import axios from "axios";
import { useState } from "react";
import MapSelector from "../utils/MapSelector";

export default function GrievanceForm() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [otherCategory, setOtherCategory] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const [uploadingImages, setUploadingImages] = useState(false);

  const endpoint = import.meta.env.VITE_API_URL;
  const cloudName = "duzj8q5as"; 
  const uploadPreset = "unsigned_grievance_upload";


  const categories = [
    "Water Supply",
    "Electricity",
    "Road / Transport",
    "Women Safety / Health",
    "Sanitation",
    "Government Services",
  ];

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const uploadImagesToCloudinary = async () => {
    setUploadingImages(true);
    const urls = [];

    for (const { file } of selectedImages) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "grievance_photos");

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      urls.push(data.secure_url);
    }

    setUploadingImages(false);
    return urls;
  };


  const handleGPSDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to detect location. Please fill manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!consent) {
      alert("Please provide consent to submit the grievance.");
      return;
    }

    try {
      setIsSubmitting(true);
      const imageUrls = await uploadImagesToCloudinary();

      const form = e.target;

      const payload = {
        fullName: isAnonymous ? "" : form.fullName?.value || "",
        phone: isAnonymous ? "" : form.phone?.value || "",
        email: isAnonymous ? "" : form.email?.value || "",
        issueTitle: form.issueTitle.value,
        description: form.description.value,
        districtTehsil: form.district?.value || "",
        areaWard: form.area?.value || "",
        pinCode: form.pincode?.value || "",
        anonymous: isAnonymous,
        consent: true,
        lat: location.lat,
        lon: location.lng,
        otherCategory,
        grievanceCategories: selectedCategories,
        photos: imageUrls,
      };

      const response = await axios.post(
        `${endpoint}/v1/gravience/createGravience`,
        payload
      );

      if (response.data?.success) {
        alert("Grievance submitted successfully!");
        form.reset();
        setLocation({ lat: null, lng: null });
        setSelectedCategories([]);
        setOtherCategory("");
        setIsAnonymous(false);
        setConsent(false);
        setSelectedImages([]);
      } else {
        alert("Failed to submit grievance.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-vh-100 bg-white py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-10">
            <div className="p-4 bg-light rounded-4">
              <div className="text-center py-4">
                <h2 className="mb-2 fw-bold">Grievance Submission Form</h2>
                <p className="mb-0 text-muted">
                  Khushaal Kasheer - Your Voice Matters
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* 1. Identity Section */}
                <div className="mb-5">
                  <h4 className="text-dark border-bottom pb-2 mb-4">
                    {" "}
                    Identity (Optional)
                  </h4>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input shadow-none"
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                    <label
                      className="form-check-label d-flex align-items-center"
                      htmlFor="anonymous"
                    >
                      <i
                        className={`bi ${
                          isAnonymous ? "bi-eye-slash" : "bi-eye"
                        } me-2`}
                      ></i>
                      Submit anonymously
                    </label>
                  </div>

                  {!isAnonymous && (
                    <div className="ps-4  border-3">
                      <div className="row g-3">
                        <div className="col-12">
                          <label
                            htmlFor="fullName"
                            className="form-label fw-semibold"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-2 px-4 py-2 border border border-2"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="phone"
                            className="form-label fw-semibold"
                          >
                            Phone / WhatsApp
                          </label>
                          <input
                            type="tel"
                            className="form-control rounded-2 px-4 py-2 border border border-2"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="email"
                            className="form-label fw-semibold"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="form-control rounded-2 px-4 py-2 border border border-2"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Grievance Details */}
                <div className="mb-5">
                  <h4 className="text-dark border-bottom pb-2 mb-4">
                    {" "}
                    Grievance Details
                  </h4>

                  <div className="mb-3">
                    <label
                      htmlFor="issueTitle"
                      className="form-label fw-semibold"
                    >
                      Issue Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-2 px-4 py-2 border border border-2"
                      id="issueTitle"
                      name="issueTitle"
                      placeholder="e.g., Broken streetlight in XYZ area"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="description"
                      className="form-label fw-semibold"
                    >
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control rounded-4 px-2 py-3 border border-secondary"
                      id="description"
                      name="description"
                      rows={5}
                      placeholder="Give as much detail as possible. What, where, when, how, etc."
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="photos" className="form-label fw-semibold">
                      Upload Photos (up to 3)
                    </label>
                       <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          if (selectedImages.length >= 3) {
            alert("Maximum 3 images allowed.");
            return;
          }
          setSelectedImages((prev) => [
            ...prev,
            { file, preview: URL.createObjectURL(file) },
          ]);
        }}
      />
                    <div className="form-text">Maximum 3 images allowed</div>

                    {selectedImages.length > 0 && (
                      <div className="d-flex gap-3 flex-wrap mt-3">
                        {selectedImages.map((img, index) => (
                          <div
                            key={index}
                            style={{
                              position: "relative",
                              width: "100px",
                              height: "100px",
                              overflow: "hidden",
                              borderRadius: "8px",
                              border: "1px solid #ddd",
                            }}
                          >
                            <img
                              src={img.preview}
                              alt={`preview-${index}`}
                              className="img-thumbnail"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...selectedImages];
                                updated.splice(index, 1);
                                setSelectedImages(updated);
                              }}
                              style={{
                                position: "absolute",
                                top: "4px",
                                right: "4px",
                                background: "transparent", 
                                border: "none",
                                color: "red", 
                                fontSize: "18px",
                                fontWeight: "bold",
                                lineHeight: "1",
                                cursor: "pointer",
                                padding: 0,
                              }}
                              title="Remove"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Location */}
                {/* 3. Location */}
                <div className="mb-5">
                  <h4 className="text-dark border-bottom pb-2 mb-4">
                    Location
                  </h4>

                  {/* OpenStreetMap Selector */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Select Location on Map
                    </label>
                    <MapSelector
                      value={
                        location.lat && location.lng
                          ? { lat: location.lat, lng: location.lng }
                          : null
                      }
                      onChange={(coords) => {
                        setLocation({ lat: coords.lat, lng: coords.lng });
                      }}
                    />
                    {location.lat && location.lng && (
                      <div className="text-success mt-2">
                        Coordinates selected: {location.lat.toFixed(6)},{" "}
                        {location.lng.toFixed(6)}
                      </div>
                    )}
                  </div>

                  {/* Optional: GPS Button */}
                  <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handleGPSDetection}
                    >
                      <i className="bi bi-crosshair me-2"></i> Auto-detect GPS
                      Location
                    </button>
                  </div>

                  {/* Manual address fields */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label
                        htmlFor="district"
                        className="form-label fw-semibold"
                      >
                        District / Tehsil
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-2 px-4 py-2 border border-2"
                        id="district"
                        name="district"
                        placeholder="Enter district/tehsil"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="area" className="form-label fw-semibold">
                        Village / Area / Ward
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-2 px-4 py-2 border border-2"
                        id="area"
                        name="area"
                        placeholder="Enter village/area/ward"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="pincode" className="form-label fw-semibold">
                      Pin Code
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-2 px-4 py-2 border border-2"
                      id="pincode"
                      name="pincode"
                      placeholder="Enter pin code"
                      maxLength={6}
                    />
                  </div>
                </div>

                {/* 4. Category of Grievance */}
                <div className="mb-5">
                  <h4 className="text-dark border-bottom pb-2 mb-4">
                    4. Category of Grievance
                  </h4>
                  <div className="row g-2 mb-3">
                    {categories.map((category) => (
                      <div key={category} className="col-md-6">
                        <div className="form-check">
                          <input
                            className="form-check-input shadow-none"
                            type="checkbox"
                            id={category.replace(/\s+/g, "")}
                            checked={selectedCategories.includes(category)}
                            onChange={(e) =>
                              handleCategoryChange(category, e.target.checked)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={category.replace(/\s+/g, "")}
                          >
                            {category}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input shadow-none"
                          type="checkbox"
                          id="other"
                          checked={selectedCategories.includes("Other")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([
                                ...selectedCategories,
                                "Other",
                              ]);
                            } else {
                              setSelectedCategories(
                                selectedCategories.filter((c) => c !== "Other")
                              );
                              setOtherCategory("");
                            }
                          }}
                        />
                        <label
                          className="form-check-label fw-semibold"
                          htmlFor="other"
                        >
                          Other:
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control rounded-2 px-4 py-2 border border border-2"
                        placeholder="Specify other category"
                        value={otherCategory}
                        onChange={(e) => setOtherCategory(e.target.value)}
                        disabled={!selectedCategories.includes("Other")}
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Consent */}
                <div className="mb-4">
                  <h4 className="text-dark border-bottom pb-2 mb-4">
                    5. Consent
                  </h4>
                  <div className="form-check">
                    <input
                      className="form-check-input shadow-none"
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                    />
                    <label className="form-check-label small" htmlFor="consent">
                      <strong>
                        I consent to Khushaal Kasheer storing and processing my
                        grievance data.
                      </strong>{" "}
                      I understand that my personal details will be kept
                      confidential unless I have chosen to submit anonymously.
                    </label>
                  </div>
                </div>

                <div className="alert border border-1 mb-4">
                  <h6 className="alert-heading mb-2">
                    <i className="bi bi-info-circle me-2"></i>
                    Important Notes:
                  </h6>
                  <ul className="mb-0 ">
                    <li>Anonymous submissions are fully supported.</li>
                    <li>
                      For tracking updates, please provide at least one contact
                      method.
                    </li>
                    <li>
                      Your data is protected under our privacy and ethical
                      standards.
                    </li>
                  </ul>
                </div>

                <div className="d-grid  justify-content-center align-items-center">
                  <button
                    type="submit mx-auto"
                    className="btn btn-primary btn-lg  py-2"
                    disabled={isSubmitting || uploadingImages}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Submit Grievance
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
