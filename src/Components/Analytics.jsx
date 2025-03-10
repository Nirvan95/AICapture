import { useState , useEffect } from 'react';

const Analytics = () => {
  const [serviceName, setServiceName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  // Validate and set start date
  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0];

    if (selectedDate > today) {
      setError('Start date cannot be a future date.');
      return;
    }

    setStartDate(selectedDate);
    setError('');
  };

  // Validate and set end date
  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value;

    if (selectedDate <= startDate) {
      setError('End date must be after the start date.');
      return;
    }

    setEndDate(selectedDate);
    setError('');
  };



  async function fetchData() {
    if (!serviceName || !startDate || !endDate) return; // Ensure all values are present

    try {
      const res = await fetch(`http://192.168.151.19:5017/analytics?service_name=${serviceName}&start_date=${startDate}&end_date=${endDate}`);
      const jsonRes = await res.json();
      console.log('jsonRes', jsonRes);
      // Dispatch your actions here
    } catch (error) {
      console.error('API call error:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [serviceName, startDate, endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!serviceName || !startDate || !endDate) {
      alert('Please fill in all fields.');
      return;
    }

    fetchData();

    alert(`Submitting: Service - ${serviceName}, Start Date - ${startDate}, End Date - ${endDate}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Service Date Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div>
          <label className="block mb-2">Service Name:</label>
          <select
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Service</option>
            <option value="crowd">Crowd</option>
            <option value="attendance">Attendance</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            max={new Date().toISOString().split('T')[0]}
            className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate}
            className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Analytics;