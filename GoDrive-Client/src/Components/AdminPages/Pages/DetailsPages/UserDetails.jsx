import React, { useState } from "react";

const Trip = () => {
  const [customer, setCustomer] = useState({
    name: "Karima Jameel Adas",
    dob: "4-12-1995",
    contact: "+966593948852",
    email: "customer@gmail.com",
    nid: "5468 5879 45821",
    photo: image,
  });

  const [trip, setTrip] = useState({
    pickup: "6 Al-Anwar Street, Jeddah",
    dropoff: "30 Tahir Al-Jazairi Street, Makkah",
    date: "4-12-1995",
    time: "7:55am",
    vehicleType: "Car",
    vehicleId: "SZ15E0010",
    manager: "Sarah Al Mazrouei",
    driverId: "ED-001",
    driverName: "Ayman Abu Dayya",
    amount: "BDT 5,480/-",
    status: "Confirmed",
    payment: "By cash",
    paymentStatus: "Due",
  });

  const handleEditBooking = () => {
    // Open an edit modal (placeholder functionality)
    alert("Edit Booking functionality will open here.");
  };

  const handleDeleteBooking = () => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      // Logic to delete the booking
      alert("Booking deleted!");
    }
  };

  const handleChangePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomer((prev) => ({
          ...prev,
          photo: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative p-6 bg-[#EDF5F8]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-[#165E6C] font-medium">Trip Details</h1>
        <div className="flex gap-3">
          <button
            onClick={handleDeleteBooking}
            className="bg-red-600 text-white px-3 py-1.5 font-medium rounded-lg"
          >
            Delete
          </button>
          <button
            onClick={handleEditBooking}
            className="bg-green-500 text-white px-3 py-1.5 font-medium rounded-lg"
          >
            Edit Booking
          </button>
        </div>
      </div>

      {/* Customer Details Section */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <h2 className="text-xl font-medium mb-3">
          Customer Details <span className="text-gray-400">(#FT584GH)</span>
        </h2>
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <div className="flex flex-col items-center">
            <img
              src={customer.photo}
              alt="Customer"
              className="rounded-full w-20 h-20 object-cover mb-3"
            />
            <label className="text-blue-500 font-medium text-sm cursor-pointer">
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChangePhoto}
              />
            </label>
          </div>
          <div className="flex flex-wrap w-full md:flex-nowrap justify-between gap-4">
            <div className="flex-1">
              <p className="text-gray-500 text-sm">Name</p>
              <h3 className="text-md">{customer.name}</h3>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm">Date of Birth</p>
              <h3 className="text-md">{customer.dob}</h3>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm">Contact Number</p>
              <h3 className="text-md">{customer.contact}</h3>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm">Email Address</p>
              <h3 className="text-md">{customer.email}</h3>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm">NID Number</p>
              <h3 className="text-md">{customer.nid}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Details Section */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <h2 className="text-xl font-medium mb-3">Trip Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Pickup Location</p>
            <h3 className="text-md">{trip.pickup}</h3>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Drop off Location</p>
            <h3 className="text-md">{trip.dropoff}</h3>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Trip Date | Time</p>
            <h3 className="text-md">
              {trip.date} | {trip.time}
            </h3>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Vehicle Type</p>
            <h3 className="text-md">{trip.vehicleType}</h3>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Vehicle ID</p>
            <h3 className="text-md">{trip.vehicleId}</h3>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Dedicated Manager</p>
            <h3 className="text-md">{trip.manager}</h3>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Driver ID</p>
            <h3 className="text-md">{trip.driverId}</h3>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Driver Name</p>
            <h3 className="text-md">{trip.driverName}</h3>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Payable Amount</p>
            <h3 className="text-md">{trip.amount}</h3>
          </div>
        </div>
      </div>

      {/* Trip Status Section */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-medium mb-3">Trip Status</h2>
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <h3 className="text-md">{trip.status}</h3>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Payment</p>
            <h3 className="text-md">{trip.payment}</h3>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Payment Status</p>
            <h3 className="text-md">{trip.paymentStatus}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
