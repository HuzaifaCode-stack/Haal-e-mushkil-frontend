import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";

const CardGrid = () => {
  const [animateCards, setAnimateCards] = useState(false);
  const [openChatIndex, setOpenChatIndex] = useState(null);
  const [commentInput, setCommentInput] = useState(""); // For handling comment input
  const [cardData, setCardData] = useState([]);
  const [selectedComments, setSelectedComments] = useState([]); // For storing comments of a selected member

  const endpoint = import.meta.env.VITE_API_URL;

  const userId = localStorage.getItem("anon-user-id");

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${endpoint}/v1/listing/fullList`);
        if (res.data.success === 1) {
          setCardData(res.data.data);
        } else {
          console.error("Failed to fetch members");
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };
    fetchData();
  }, []);

  const handleLike = async (memberId) => {
    try {
      const res = await axios.post(`${endpoint}/v1/listing/like`, {
        memberId,
        userId,
      });

      if (res.data.success === 1) {
        setCardData((prev) =>
          prev.map((member) =>
            member._id === memberId
              ? {
                  ...member,
                  likes: [...(member.likes || []), userId],
                  dislikes: (member.dislikes || []).filter(
                    (id) => id !== userId
                  ),
                }
              : member
          )
        );
      }
    } catch (error) {
      console.error("Like failed:", error.message);
    }
  };

  const handleDislike = async (memberId) => {
    try {
      const res = await axios.post(`${endpoint}/v1/listing/dislike`, {
        memberId,
        userId,
      });

      if (res.data.success === 1) {
        setCardData((prev) =>
          prev.map((member) =>
            member._id === memberId
              ? {
                  ...member,
                  dislikes: [...(member.dislikes || []), userId],
                  likes: (member.likes || []).filter((id) => id !== userId),
                }
              : member
          )
        );
      }
    } catch (error) {
      console.error("Dislike failed:", error.message);
    }
  };

  // Handle comment submission
  const handleComment = async (memberId) => {
    if (!commentInput.trim()) return;
    try {
      const { data } = await axios.post(`${endpoint}/v1/listing/comment`, {
        memberId,
        text: commentInput,
        user: userId, // Use the userId from localStorage
      });

      if (data.success === 1) {
        setCardData((prev) =>
          prev.map((member) =>
            member._id === memberId
              ? {
                  ...member,
                  comments: data.data, // Update comments with response from backend
                }
              : member
          )
        );
        setSelectedComments(data.data); // Update comments in the modal
        setCommentInput(""); // Clear input after submitting
      }
    } catch (error) {
      console.error("Comment failed:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center">Public Representatives</h1>
        <p className="text-center">
          Explore elected representatives in your area and interact with them.
        </p>

        <div className="gridcard">
          {cardData.map((member, index) => {
            const liked = member.likes?.includes(userId);
            const disliked = member.dislikes?.includes(userId);

            return (
              <div
                key={member._id}
                className={`card rounded-3 shadow mb-4 ${
                  animateCards ? "flip-animate" : ""
                }`}
              >
                <img
                  src={
                    member.photos ||
                    "https://via.placeholder.com/250x250.png?text=No+Image"
                  }
                  className="card-img-top"
                  height="250px"
                  alt="Representative"
                />
                <div className="card-body">
                  <h5>{member.name}</h5>
                  <p className="mb-1">
                    <strong>Position:</strong> {member.position}
                  </p>
                  <p className="mb-1">
                    <strong>Area:</strong> {member.area}
                  </p>

                  <div className="d-flex align-items-center gap-3 mb-2">
                    <ThumbsUp
                      style={{
                        cursor: liked ? "not-allowed" : "pointer",
                        color: liked ? "green" : "black",
                      }}
                      onClick={() => {
                        if (!liked) handleLike(member._id);
                      }}
                    />{" "}
                    {member.likes?.length || 0}
                    <ThumbsDown
                      style={{
                        cursor: disliked ? "not-allowed" : "pointer",
                        color: disliked ? "red" : "black",
                      }}
                      onClick={() => {
                        if (!disliked) handleDislike(member._id);
                      }}
                    />{" "}
                    {member.dislikes?.length || 0}
                    <MessageCircle
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpenChatIndex(index);
                        setSelectedComments(member.comments || []);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comment Modal with Styling */}
        {openChatIndex !== null && (
          <div className="modal-overlay" onClick={() => setOpenChatIndex(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h5 className="mb-3 text-center">
                Comments for {cardData[openChatIndex]?.name}
              </h5>

              <div className="comments mb-3">
                {selectedComments.length > 0 ? (
                  selectedComments.map((comment, idx) => (
                    <div key={idx} className="comment">
                      <div className="comment-author">
                        {/* {comment.user ? comment.user : 'Anonymous'} */}
                        <span className="comment-timestamp">
                          {/* Format the timestamp to be more readable */}
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="comment-text">{comment.text}</div>
                    </div>
                  ))
                ) : (
                  <div className="no-comments">No comments yet</div>
                )}
              </div>

              {/* Comment input field */}
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleComment(cardData[openChatIndex]?._id)}
                >
                  Submit Comment
                </button>
              </div>

              {/* Close Modal Button */}
              <button
                className="btn btn-secondary mt-3"
                onClick={() => setOpenChatIndex(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardGrid;
