const axios = require('axios');

// In-memory storage for history
const history = [];

// Controller for testing API
const testApi = async (req, res) => {
    const { targetUrl, requestsPerSecond, durationInSeconds } = req.body;

    if (!targetUrl || !requestsPerSecond || !durationInSeconds) {
        return res.status(400).json({ message: 'Please provide targetUrl, requestsPerSecond, and durationInSeconds.' });
    }

    const interval = 1000 / requestsPerSecond; // Interval in milliseconds
    const endTime = Date.now() + durationInSeconds * 1000; // Calculate the end time

    let requestCount = 0;
    const errors = [];
    const startTime = new Date();

    const sendRequest = async () => {
        if (Date.now() > endTime) {
            // Stop sending requests after the duration
            const result = {
                targetUrl,
                requestsPerSecond,
                durationInSeconds,
                startTime,
                endTime: new Date(),
                totalRequests: requestCount,
                totalErrors: errors.length,
                errors,
            };

            // Save history
            history.push(result);

            res.json(result);
            return;
        }

        try {
            await axios.get(targetUrl);
        } catch (error) {
            errors.push({ timestamp: new Date(), error: error.message });
        } finally {
            requestCount++;
            setTimeout(sendRequest, interval);
        }
    };

    sendRequest();
};

// Controller to get history
const getHistory = (req, res) => {
    res.json(history);
};

module.exports = { testApi, getHistory };
