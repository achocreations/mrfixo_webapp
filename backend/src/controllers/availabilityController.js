const Availability = require('../models/Availability');
const logger = require('../utils/logger');

const setAvailability = async (req, res) => {
  try {
    const { dayOfWeek, startTime, endTime } = req.body;

    const availability = await Availability.create({
      provider: req.user._id,
      dayOfWeek,
      startTime,
      endTime,
    });

    res.status(201).json(availability);
  } catch (error) {
    logger.error('Error in setAvailability:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAvailability = async (req, res) => {
  try {
    const availability = await Availability.findById(req.params.id);

    if (!availability) {
      return res.status(404).json({ message: 'Availability not found' });
    }

    if (availability.provider.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this availability' });
    }

    const updatedAvailability = await Availability.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedAvailability);
  } catch (error) {
    logger.error('Error in updateAvailability:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAvailabilityByProvider = async (req, res) => {
  try {
    const availability = await Availability.find({ provider: req.params.providerId });

    if (!availability) {
      return res.status(404).json({ message: 'Availability not found' });
    }

    res.status(200).json(availability);
  } catch (error) {
    logger.error('Error in getAvailabilityByProvider:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  setAvailability,
  updateAvailability,
  getAvailabilityByProvider,
};
