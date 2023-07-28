const { Application } = require("../models");
const moment = require("moment");
const { generateApiKey } = require("generate-api-key");

// Create a new application
const createApplication = async (req, res) => {
  try {
    const { name } = req.body;
    const application = await Application.create({
      name,
      api_key: generateApiKey({ method: "uuidv4" }),
      registered_date: moment.now(),
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the application." });
  }
};

// Get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications." });
  }
};

// Get a specific application by ID
const getApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findByPk(id);
    if (application) {
      res.json(application);
    } else {
      res.status(404).json({ error: "Application not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the application." });
  }
};

// Update an application
const updateApplication = async (req, res) => {
  const { id } = req.params;
  const { name, api_key, registered_date } = req.body;
  try {
    const application = await Application.findByPk(id);
    if (application) {
      await application.update({
        name,
        api_key,
        registered_date,
      });
      res.json(application);
    } else {
      res.status(404).json({ error: "Application not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the application." });
  }
};

// Delete an application
const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findByPk(id);
    if (application) {
      await application.destroy();
      res.json({ message: "Application deleted successfully." });
    } else {
      res.status(404).json({ error: "Application not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the application." });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
