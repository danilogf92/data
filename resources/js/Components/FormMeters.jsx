import { Link, useForm } from "@inertiajs/react";
import React from "react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";

export default function FormMeters() {
  const { data, setData, post, errors } = useForm({
    plant_id: "",
    meter_id: "",
    type: "",
    start_value: "",
    end_value: "",
    difference: "",
    date: "",
  });

  const calculateDifference = () => {
    const start = parseFloat(data.start_value);
    const end = parseFloat(data.end_value);
    console.log(start, end);
    if (!isNaN(start) && !isNaN(end)) {
      return end - start;
    }
    return "";
  };

  const handleStartChange = (e) => {
    const startValue = e.target.value;
    const newData = {
      ...data,
      start_value: startValue,
      difference: calculateDifference(),
    };
    setData(newData);
  };

  const handleFinalChange = (e) => {
    const endValue = e.target.value;
    const newData = {
      ...data,
      end_value: endValue,
      difference: calculateDifference(),
    };
    setData(newData);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("measurement.store"), {
      onSuccess: () => {
        console.log("Measurement saved successfully!");
      },
      onError: (errors) => {
        console.log("Error saving measurement:", errors);
      },
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 bg-gray-600">
      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-white pb-12 text-center">
            <h2 className="font-semibold leading-7 text-white text-xl">
              Measurement water data
            </h2>
          </div>

          <div className="border-b border-white pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="plant_id"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Plant
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setData("plant_id", e.target.value)}
                    value={data.plant_id}
                    id="plant_id"
                    name="plant_id"
                    autoComplete="plant_id"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
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
                  className="block text-sm font-medium leading-6 text-white"
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
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                  <InputError
                    message={errors.meter_id}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Type
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setData("type", e.target.value)}
                    value={data.type}
                    type="text"
                    name="type"
                    id="type"
                    readOnly
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.type}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="start_value"
                  className="block text-sm font-medium leading-6 text-white"
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
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Final Value
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleFinalChange}
                    value={data.end_value}
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
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Difference
                </label>
                <div className="mt-2">
                  <input
                    value={data.difference}
                    type="text"
                    name="difference"
                    id="difference"
                    readOnly
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 disabled:bg-gray-100 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.difference}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-white"
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
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            href={route("measurement.index")}
            className="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>

      {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
    </div>
  );
}
