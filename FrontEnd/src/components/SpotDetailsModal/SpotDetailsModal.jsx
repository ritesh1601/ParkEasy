import React, { useState } from "react";

const SpotDetailsModal = ({ isOpen, onClose, spot }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{spot.name}</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="image-section">
            <img src={spot.images[activeImageIndex]} alt={spot.name} />
            <div className="image-thumbnails">
              {spot.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="thumbnail"
                  onClick={() => setActiveImageIndex(index)}
                  className={index === activeImageIndex ? "active" : ""}
                />
              ))}
            </div>
          </div>
          <div className="details-section">
            <p>{spot.description}</p>
            <div className="pricing">
              <p>Hourly: ${spot.hourlyRate}</p>
              <p>Daily: ${spot.dailyRate}</p>
              <p>Monthly: ${spot.monthlyRate}</p>
            </div>
            <div className="tabs">
              <button onClick={() => setActiveTab("details")} className={activeTab === "details" ? "active" : ""}>Details</button>
              <button onClick={() => setActiveTab("reviews")} className={activeTab === "reviews" ? "active" : ""}>Reviews</button>
            </div>
            {activeTab === "details" ? (
              <div className="tab-content">Amenities: {spot.amenities.join(", ")}</div>
            ) : (
              <div className="tab-content">Reviews: {spot.reviews}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotDetailsModal;
