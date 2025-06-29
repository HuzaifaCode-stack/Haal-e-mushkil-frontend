import axios from "axios";
import React, { useEffect, useState } from "react";

const Policies = () => {
  const endpoint = import.meta.env.VITE_API_URL;
  const [policies, setPolicies] = useState([]);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});

  const userId = localStorage.getItem("anon-user-id");

  const handleAddComment = async (policyId, e) => {
    e.preventDefault();
    const text = newComments[policyId];

    if (!text || !userId) return;

    try {
      const { data } = await axios.post(
        `${endpoint}/v1/user/comment/addComment`,
        {
          policyId,
          content: text,
          user: userId,
        }
      );

      if (data.success) {
        const updated = {
          ...comments,
          [policyId]: [...(comments[policyId] || []), text],
        };

        setComments(updated);
        setNewComments({ ...newComments, [policyId]: "" });
      } else {
        console.log("Failed to add comment:", data.message);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const getList = async () => {
    try {
      const { data } = await axios.get(`${endpoint}/v1/user/comment/all`);
      const policyList = data?.data || [];
      setPolicies(policyList);

      // Extract and store comments from response
      const commentMap = {};
      policyList.forEach((policy) => {
        commentMap[policy._id] = (policy.comments || []).map((c) => c.content);
      });
      setComments(commentMap);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="container my-5">
      <div
        className="p-4 rounded shadow"
        style={{ backgroundColor: "#fefefe", border: "1px solid #ddd" }}
      >
        <h2 className="mb-4 text-primary fw-bold">📜 Our Policies</h2>
        <div className="accordion" id="policiesAccordion">
          {policies.map((policy, index) => (
            <div className="accordion-item border-0 mb-3" key={policy._id}>
              <h2 className="accordion-header" id={`heading${policy._id}`}>
                <button
                  className={`accordion-button rounded shadow-sm ${
                    index !== 0 ? "collapsed" : ""
                  }`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${policy._id}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse${policy._id}`}
                  style={{
                    backgroundColor: "#f0f4ff",
                    fontWeight: "600",
                    fontSize: "1.1rem",
                  }}
                >
                  📌 {policy.title}
                </button>
              </h2>
              <div
                id={`collapse${policy._id}`}
                className={`accordion-collapse collapse ${
                  index === 0 ? "show" : ""
                }`}
                aria-labelledby={`heading${policy._id}`}
                data-bs-parent="#policiesAccordion"
              >
                <div className="accordion-body">
                  <p
                    className="mb-4 text-dark"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {policy.content}
                  </p>

                  {/* Comment Section */}
                  <h6 className="mt-4 text-secondary">💬 Comments</h6>
                  <ul className="list-group mb-3">
                    {(comments[policy._id] || []).map((comment, i) => (
                      <li
                        key={i}
                        className="list-group-item d-flex align-items-start"
                      >
                        <img
                          src={`https://ui-avatars.com/api/?name=User&background=random`}
                          alt="avatar"
                          width="35"
                          height="35"
                          className="rounded-circle me-2"
                        />
                        <span>{comment}</span>
                      </li>
                    ))}
                    {(comments[policy._id] || []).length === 0 && (
                      <li className="list-group-item text-muted">
                        No comments yet
                      </li>
                    )}
                  </ul>

                  {/* Add Comment Form */}
                  <form onSubmit={(e) => handleAddComment(policy._id, e)}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Write a comment..."
                        value={newComments[policy._id] || ""}
                        onChange={(e) =>
                          setNewComments({
                            ...newComments,
                            [policy._id]: e.target.value,
                          })
                        }
                      />
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={!newComments[policy._id]}
                      >
                        Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Policies;
