import React, { useState, useEffect } from "react";

const BookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBookings = bookings.filter((booking) => {
    return (
      (selectedStatus === "All" || booking.status === selectedStatus) &&
      booking.user.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Booking Manager</h2>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by user name"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ padding: "8px", width: "60%", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>User</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Date</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px", textAlign: "center" }}>{booking.user}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{booking.date}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{booking.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ padding: "10px", textAlign: "center" }}>No bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManager;