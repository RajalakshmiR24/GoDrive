const asyncHandler = require("express-async-handler");
const AccessControl = require("../models/accessControl"); // Assuming the AccessControl model is in the models folder
const Driver = require("../models/Driver");

// Get all driver applications for access control
const getApplications = asyncHandler(async (req, res) => {
  try {
    // Fetch all applications from AccessControl and populate the driver details
    const applications = await AccessControl.find().populate("driver");

    // Check if there are no applications found
    if (!applications.length) {
      return res.status(404).json({ message: "No applications found" });
    }

    // Transform the application data for the response
    const applicationData = applications.map((app) => ({
      _id: app._id,
      driverName: `${app.driver.firstName} ${app.driver.lastName}`, // Driver's full name
      email: app.driver.email, // Driver's email
      phone: app.driver.phone, // Driver's phone number
      vehicleNumber: app.driver.vehicleRegistration, // Vehicle registration number
      vehicleType: `${app.driver.vehicleMake} ${app.driver.vehicleModel}`, // Vehicle make and model
      status: app.status, // Application status
      reviewComments: app.reviewComments, // Review comments
      reviewedBy: app.reviewedBy, // Admin who reviewed the application
      reviewedAt: app.reviewedAt, // Date of review
    }));

    // Send the application data as a response
    res.status(200).json(applicationData);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error fetching applications:", error);
    res
      .status(500)
      .json({ message: "Error fetching applications", error: error.message });
  }
});


// Function to update application status
const updateApplication = asyncHandler(async (req, res) => {
  console.log(req.params, req.body);

  const { id } = req.params;
  const { status, reviewComments } = req.body;

  try {
    const application = await AccessControl.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status and comments
    application.status = status;
    application.reviewComments = reviewComments;
    application.reviewedBy = req.user._id; // Assuming the user is an admin
    application.reviewedAt = new Date();

    if (status === "Accepted") {
      // Find the related driver and update the verified field to true
      const driver = await Driver.findById(application.driver);

      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }

      driver.verified = true;
      await driver.save();
    }
    if (status === "Rejected") {
      // Find the related driver and update the verified field to true
      const driver = await Driver.findById(application.driver);

      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }

      driver.verified = false;
      await driver.save();
    }

    await application.save();

    res.status(200).json({ message: "Application updated successfully" });
  } catch (error) {
    console.error("Error updating application:", error);
    res
      .status(500)
      .json({ message: "Failed to update application", error: error.message });
  }
});

// Function to update application status


// const updateApplication = asyncHandler(async (req, res) => {
//   console.log(req.params, req.body);

//   const { id } = req.params;
//   const { status, reviewComments } = req.body;

//   try {
//     const application = await AccessControl.findById(id);

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // Update the application status and comments
//     application.status = status;
//     application.reviewComments = reviewComments;
//     application.reviewedBy = req.user._id; // Assuming the user is an admin
//     application.reviewedAt = new Date();

//     // Find the related driver and update the verified field and rejection comments
//     const driver = await Driver.findById(application.driver);

//     if (!driver) {
//       return res.status(404).json({ message: "Driver not found" });
//     }

//     if (status === "Accepted") {
//       driver.verified = true;
//       driver.rejectionComments = ''; // Clear any existing rejection comments
//     } else if (status === "Rejected") {
//       driver.verified = false;
//       driver.rejectionComments = reviewComments || 'No comments provided'; // Set rejection comments
//     }

//     await driver.save();
//     await application.save();

//     res.status(200).json({ message: "Application updated successfully" });
//   } catch (error) {
//     console.error("Error updating application:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to update application", error: error.message });
//   }
// });


module.exports = {
  getApplications,
  updateApplication, // Ensure this is exported
};
