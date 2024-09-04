import React, { useState, useEffect } from "react";
import api from "../../../../Utils/axios"; // Ensure the correct path to your axios instance
import Table from '../../Common/Table';

const AccessControl = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewComments, setReviewComments] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await api.get("/access-control/applications");
        console.log("API Response:", response.data);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleUpdateStatus = async (applicationId, status) => {
    setLoading(true);
    try {
      const response = await api.put(`/access-control/applications/update/${applicationId}`, {
        status,
        reviewComments
      });
      console.log("Update Response:", response.data);
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === applicationId ? { ...app, status, reviewComments } : app
        )
      );
    } catch (error) {
      console.error(`Error updating status to ${status}:`, error);
    } finally {
      setLoading(false);
      setModalVisible(false);
      setReviewComments(""); // Reset the comment input
    }
  };

  const handleActionClick = (application, status) => {
    setSelectedApplication({ ...application, status });
    setModalVisible(true);
  };

  const handleModalSubmit = () => {
    if (selectedApplication) {
      handleUpdateStatus(selectedApplication._id, selectedApplication.status);
    }
  };

  const columns = [
    { header: 'Full Name', field: 'driverName' },
    { header: 'Email', field: 'email' },
    { header: 'Phone', field: 'phone' },
    { header: 'Vehicle Registration', field: 'vehicleNumber' },
    { header: 'Vehicle Type', field: 'vehicleType' },
    { header: 'Application Status', field: 'status' },
    { header: 'Review Comments', field: 'reviewComments' },
  ];

  const actions = [
    {
      label: 'Accept',
      onClick: (row) => handleActionClick(row, 'Accepted'),
      disabled: (row) => row.status === 'Accepted',
      color: 'bg-green-500',
      visible: (row) => row.status === 'Pending' || row.status === 'Rejected',
    },
    {
      label: 'Reject',
      onClick: (row) => handleActionClick(row, 'Rejected'),
      disabled: (row) => row.status === 'Rejected',
      color: 'bg-red-500',
      visible: (row) => row.status === 'Pending' || row.status == 'Rejected' && row.status === 'Accepted',
    },
    {
      label: 'Edit',
      onClick: (row) => handleActionClick(row, row.status),
      color: 'bg-blue-500',
      visible: (row) => row.status === 'Accepted' || row.status === 'Rejected',
    },
  ];
  

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Access Control</h1>
          <p className="text-gray-600">Manage drivers and their application details</p>
        </div>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}
      {!loading && applications.length === 0 && (
        <p className="text-gray-600">No data found.</p>
      )}

      <div className="w-full overflow-x-auto mt-6">
        {applications.length > 0 && (
          <Table
            columns={columns}
            data={applications}
            actions={actions.filter(action => action.visible)}
          />
        )}
      </div>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Review Comments</h2>
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="4"
              value={reviewComments}
              onChange={(e) => setReviewComments(e.target.value)}
              placeholder="Enter your review comments here..."
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessControl;
