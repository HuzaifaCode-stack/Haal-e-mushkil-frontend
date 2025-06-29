import axios from "axios";
import React, { useEffect, useState } from "react";

const Events = () => {
  const endpoint = import.meta.env.VITE_API_URL;
  const [eventDetails, setEventDetails] = useState([]);

  // Fetch event list from API
  const listEvent = async () => {
    try {
      const { data } = await axios.get(`${endpoint}/v1/admin/event/list`);
      setEventDetails(data?.data || []); // API returns events in data.data
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    listEvent();
  }, []);

  return (
    <div className="container my-5">
      <div className="row">
        <h2 className="text-center">
          Lorem ipsum dolor sit amet consectetur <br /> Debitis, distinctio.
        </h2>
        <p className="text-center pb-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta{" "}
          <br />
          mollitia veritatis inventore assumenda repudiandae, esse porro et,
          quam, cupiditate aspernatur facere? Explicabo totam aliquam harum
        </p>

        {eventDetails.map((event, index) => {
          const carouselId = `carousel-${index}`;
          return (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <div
                  id={carouselId}
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {event.image.map((img, imgIndex) => (
                      <div
                        className={`carousel-item ${
                          imgIndex === 0 ? "active" : ""
                        }`}
                        key={imgIndex}
                      >
                        <img
                          src={img}
                          className="d-block w-100"
                          alt={`Slide ${imgIndex + 1}`}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                  {event.image.length > 1 && (
                    <>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#${carouselId}`}
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#${carouselId}`}
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </>
                  )}
                </div>

                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">
                    <strong>📍 {event.area}</strong>
                    <br />
                    <strong>
                      📅 {new Date(event.date).toLocaleDateString()}
                    </strong>
                    <br />
                    <small>{event.description}</small>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
