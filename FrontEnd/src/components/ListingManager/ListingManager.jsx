import React, { useState } from "react";

const ListingManager = () => {
  const [listings, setListings] = useState([]);
  const [newListing, setNewListing] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setNewListing({ ...newListing, [e.target.name]: e.target.value });
  };

  const addListing = () => {
    if (newListing.title && newListing.description) {
      setListings([...listings, newListing]);
      setNewListing({ title: "", description: "" });
    }
  };

  const removeListing = (index) => {
    setListings(listings.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Listing Manager</h2>
      <input
        type="text"
        name="title"
        value={newListing.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        name="description"
        value={newListing.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded mb-2"
      ></textarea>
      <button
        onClick={addListing}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Add Listing
      </button>
      <ul className="mt-4">
        {listings.map((listing, index) => (
          <li
            key={index}
            className="p-4 bg-gray-100 rounded flex justify-between items-center mt-2"
          >
            <div>
              <h3 className="font-semibold">{listing.title}</h3>
              <p className="text-sm text-gray-600">{listing.description}</p>
            </div>
            <button
              onClick={() => removeListing(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingManager;