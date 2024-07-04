import { Link, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import InputError from "./InputError";

export default function FormMeters({ plants, meters, measurements }) {
  const { data, setData, post, errors } = useForm({
    plant_id: "",
    meter_id: "",
    start_value: "",
    end_value: "",
    difference: "",
    date: "" || new Date().toISOString().split("T")[0],
  });

  const [filteredMeters, setFilteredMeters] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);

  const calculateDifference = (start, end) => {
    return end - start;
  };

  const handleStartChange = (e) => {
    const startValue = parseInt(e.target.value, 10) || 0;
    const endValue = parseInt(data.end_value, 10) || 0;
    const difference = calculateDifference(startValue, endValue);

    setData({
      ...data,
      start_value: startValue,
      difference: difference,
    });
  };

  const handleEndChange = (e) => {
    const endValue = parseInt(e.target.value, 10) || 0;
    const startValue = parseInt(data.start_value, 10) || 0;
    const difference = calculateDifference(startValue, endValue);

    setData({
      ...data,
      end_value: endValue,
      difference: difference,
    });
  };

  const handlePlantChange = (e) => {
    const selectedPlantId = e.target.value;

    const filteredMeters = meters.filter(
      (meter) => meter.plant_id === parseInt(selectedPlantId, 10)
    );
    setFilteredMeters(filteredMeters);

    setData({
      ...data,
      plant_id: selectedPlantId,
      meter_id: "",
    });
  };

  useEffect(() => {
    if (data.plant_id) {
      const filteredMeters = meters.filter(
        (meter) => meter.plant_id === parseInt(data.plant_id, 10)
      );
      setFilteredMeters(filteredMeters);
    }
  }, [data.plant_id]);

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("measurement.store"), {
      onSuccess: (response) => {
        setData({
          ...data,
          meter_id: "",
          start_value: "",
          end_value: "",
          difference: "",
        });

        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      },
      onError: (errors) => {},
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg p-4 bg-blue-100">
      {showSuccess && (
        <div className="mt-20 fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center shadow-md">
          <div className="relative">
            <strong className="font-bold block">Success!</strong>
            <span className="block sm:inline">Data stored successfully.</span>
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-1 right-1 px-3 focus:outline-none"
            >
              <svg
                className="fill-current h-6 w-6 text-green-500 hover:opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.354 5.646a.5.5 0 1 0-.708-.708L10 9.293 6.354 5.646a.5.5 0 1 0-.708.708L9.293 10l-3.647 3.646a.5.5 0 1 0 .708.708L10 10.707l3.646 3.647a.5.5 0 0 0 .708-.708L10.707 10l3.647-3.646z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-white pb-6 text-center">
            <h2 className="font-semibold leading-7 text-gray-900 text-xl">
              Measurement water data
            </h2>
          </div>

          <div className="border-b border-white pb-6">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="plant_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Plant
                </label>
                <div className="mt-2">
                  <select
                    onChange={handlePlantChange}
                    value={data.plant_id}
                    id="plant_id"
                    name="plant_id"
                    autoComplete="plant_id"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
                      -- Select Plant --
                    </option>
                    {plants.map((plant) => (
                      <option key={plant.id} value={plant.id}>
                        {plant.name}
                      </option>
                    ))}
                  </select>
                  <InputError
                    message={errors.plant_id}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="meter_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Meter
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setData("meter_id", e.target.value)}
                    value={data.meter_id}
                    id="meter_id"
                    name="meter_id"
                    autoComplete="meter_id"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
                      -- Select Meter --
                    </option>
                    {filteredMeters.map((meter) => (
                      <option key={meter.id} value={meter.id}>
                        {meter.name}
                      </option>
                    ))}
                  </select>
                  <InputError
                    message={errors.meter_id}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setData("date", e.target.value)}
                    value={data.date}
                    type="date"
                    name="date"
                    id="date"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.date}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="start_value"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Start Value
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleStartChange}
                    value={data.start_value}
                    type="number"
                    name="start_value"
                    min={0}
                    id="start_value"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.start_value}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="end_value"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Final Value
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleEndChange}
                    value={data.end_value}
                    min={0}
                    type="number"
                    name="end_value"
                    id="end_value"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.end_value}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="difference"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Difference
                </label>
                <div className="mt-2">
                  <input
                    value={data.difference >= 0 ? data.difference : ""}
                    type="text"
                    name="difference"
                    id="difference"
                    readOnly
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 disabled:bg-gray-500 bg-red-200 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.difference}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            href={route("measurement.index")}
            className="rounded-md bg-amber-600 text-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Save
          </button>
        </div>
      </form>
      <pre>{JSON.stringify(measurements, undefined, 2)}</pre>
    </div>
  );
}
