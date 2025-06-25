import React, { useRef } from "react";

import GrievanceForm from "./grievanceform";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const grievanceRef = useRef(null);

  const handleNavigate = () => {
    navigate("/volunteer");
  };

  return (
    <div className="bg-light w-full">
      {/* Hero Section */}
      <div className="container-fluid p-0">
        <section
          className="mb-5 position-relative overflow-hidden text-white"
          style={{
            zIndex: 1,
            background:
              "url('https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1170&auto=format&fit=crop') center/cover no-repeat",
            height: "550px",
            backgroundAttachment: "fixed",
          }}
        >
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              backdropFilter: "blur(6px)",
              background: "rgba(0, 0, 0, 0.4)",
              zIndex: 0,
            }}
          ></div>

          <div
            className="container text-center d-flex justify-content-center align-items-center h-100 position-relative"
            style={{ zIndex: 1 }}
          >
            <div className="row">
              <div
                className="col-lg-12 px-4 d-flex flex-column align-items-center h-100"
                style={{ animation: "fadeIn 1.5s ease" }}
              >
                <h1 className="display-5 fw-bold text-white mb-3">
                  Empowering Communities. Enriching <br /> Lives. Together
                </h1>
                <p className="lead text-white mb-4">
                  Khushaal Kasheer is a grassroots movement to uplift, empower,
                  and <br />
                  connect every citizen of Kashmir.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <button
                    className="btn btn-outline-light px-4 py-2"
                    onClick={handleNavigate}
                  >
                    Become a Volunteer
                  </button>
                  <button
                    className="btn btn-outline-light px-4 py-2"
                    onClick={() => {
                      grievanceRef.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    Submit a Grievance
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="position-absolute bottom-0 start-0 w-100"
            style={{
              height: "500px",
              background:
                "linear-gradient(135deg, #ffffffb0 0%, #6c757d88 40%, #000000e0 100%)",
              clipPath:
                "polygon(0 100%, 15% 75%, 30% 85%, 50% 65%, 70% 80%, 85% 60%, 100% 70%, 100% 100%)",
              zIndex: 0,
              boxShadow: "0 -20px 60px rgba(0, 0, 0, 0.3)",
            }}
          ></div>
        </section>
      </div>

      {/* About NGO Section */}
      <section
        className="bg-light position-relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://restroking.dexignzone.com/welcome/images/bg2.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center mb-4 mb-lg-0">
              <img
                className="rounded-3 mb-3"
                src="https://img.freepik.com/free-photo/handsome-bearded-businessman-rubbing-hands-having-deal_176420-18778.jpg?w=740"
                style={{ width: "400px" }}
                alt=""
              />
              <h2 className="h3 fw-bold mb-3">About the NGO</h2>
              <p className="text-muted mb-1 fw-semibold">
                Yahan paakhe , tel aamat toote haashetu organisation. In sectum
                ussac kaantetu 📞, voluptate urna vel, chartibus, silii, asi ni
                casus yt morues.
              </p>
              <p className="text-muted">
                Now has continent boges algonsoli ets — “changaling begins wqthu
                thunder.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section
        className="mb-5 bg-light mb-5"
        style={{
          backgroundImage:
            "url('https://restroking.dexignzone.com/welcome/images/bg2.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container ">
          <h1 className="h3 fw-bold text-center display-6 fw-semibold py-5"> 
            What Members Are <br /> Part Of
          </h1>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3  ">
              <div className="card h-100 shadow-lg rounded- border-0 text-center p-2">
                <img
                  className="rounded-3"
                  style={{ objectFit: "cover", height: "180px", width: "100%" }}
                  src="https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg"
                  alt=""
                />
                <h5 className="mt-3">Grievance Cell</h5>
                <p>We listen, escalate, and resolve your community issues.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 ">
              <div className="card h-100 shadow-lg rounded- border-0 text-center p-2">
                <img 
                  className="rounded-3"
                  style={{ objectFit: "cover", height: "180px", width: "100%" }}
                  src="https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg"
                  alt=""
                />
                <h5 className="mt-3">Awaam Ki Awaaz</h5>
                <p>Your voice matters. Speak, and we amplify it.</p>
              </div>
            </div>
 
            <div className="col-md-6 col-lg-3 ">
              <div className="card h-100 shadow-lg rounded- border-0 text-center p-2">
                <img
                  className="rounded-3"
                  style={{ objectFit: "cover", height: "180px", width: "100%" }}
                  src="https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg"
                  alt=""
                /> 
                <h5 className="mt-3">Youth Forum</h5>
                <p>Empowering Kashmir’s youth with opportunities & dialogue.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 ">
              <div className="card h-100 shadow-lg rounded- border-0 text-center p-2">
                <img
                  className="rounded-3"
                  style={{ objectFit: "cover", height: "180px", width: "100%" }}
                  src="https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg"
                  alt=""
                />
                <h5 className="mt-3">Volunteer Match</h5>
                <p>
                  Connecting willing hearts to the causes that need them most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        className="py-5 text-white position-relative overflow-hidden"
        style={{
          background:
            "url('https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?q=80&w=1176&auto=format&fit=crop') top/cover no-repeat",
          height: "350px",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backdropFilter: "blur(2px)",
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 0,
          }}
        ></div>
        <div
          className="container position-relative h-100"
          style={{ zIndex: 1 }}
        >
          <div className="d-flex align-items-center justify-content-evenly h-100">
            {[
              { count: "325+", label: "Grievances Resolved" },
              { count: "500+", label: "Volunteers Registered" },
              { count: "1200+", label: "Youth Engaged" },
            ].map((item, index) => (
              <div className="card border-0 bg-transparent" key={index}>
                <div className="card-body">
                  <h2 className="display-2 fw-bold text-white mb-0">
                    {item.count}
                  </h2>
                  <p className="text-white-50 mb-0">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <h1 className="h3 fw-bold mb-4 display-5">Recent Events</h1>
          <div className="row g-4">
            {[1, 2].map((index) => (
              <div className="col-lg-6" key={index}>
                <div className="card border rounded-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1169&auto=format&fit=crop"
                        alt="Event"
                        className="rounded-start-3"
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title mb-1">Event Title</h5>
                        <p className="card-text small text-muted">
                          brief toturs, wia viti auged.
                        </p>
                        <button className="btn btn-outline-secondary btn-sm">
                          View More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="py-5 bg-dark text-white text-center">
        <div className="container">
          <h2 className="h3 fw-bold mb-4">Make a Difference. Get Involved.</h2>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button className="btn btn-outline-light px-4 py-2">Join Us</button>
            <button className="btn btn-outline-light px-4 py-2">Donate</button>
          </div>
        </div>
      </section> */}

      <div ref={grievanceRef}>
        <GrievanceForm />
      </div>
    </div>
  );
};

export default App;
