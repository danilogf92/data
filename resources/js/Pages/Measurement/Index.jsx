import FormMeters from "@/Components/FormMeters";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ auth, measurements }) {
  const deleteMeasurement = (measurement) => {
    console.log(measurement);
    router.delete(route("measurement.destroy", measurement.id));
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [measurementToDelete, setMeasurementToDelete] = useState(null);

  const onDeleteMeasurement = () => {
    if (!measurementToDelete) return;

    deleteMeasurement(measurementToDelete);
    setIsDeleteModalOpen(false);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Measurement
          </h2>
          <Link
            href={route("measurement.create")}
            className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            New Measure
          </Link>
        </div>
      }
    >
      <Head title="Meters" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Plant
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Meter
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Start Value
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Final Value
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Difference
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {measurements.data.map((measurement) => (
                      <tr
                        key={measurement.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {measurement.plant_id}
                        </th>
                        <td className="px-6 py-4">{measurement.meter_id}</td>
                        <td className="px-6 py-4">{measurement.start_value}</td>
                        <td className="px-6 py-4">{measurement.end_value}</td>
                        <td className="px-6 py-4">{measurement.difference}</td>
                        <td className="px-6 py-4 text-nowrap">
                          {measurement.date}{" "}
                        </td>
                        <td className="py-4 text-center">
                          <Link
                            className="font-medium text-amber-600 dark:text-amber-500 hover:underline mr-4"
                            href={route("measurement.edit", measurement.id)}
                          >
                            Edit
                          </Link>

                          <button
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                            onClick={() => {
                              setMeasurementToDelete(measurement);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Modal
                  show={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                  maxWidth="sm"
                >
                  <div className="p-6 bg-slate-500 text-white">
                    <h2 className="text-lg font-semibold mb-4">
                      Delete Confirmation
                    </h2>
                    <p className="text-sm text-white mb-8">
                      Are you sure you want to delete this measurement? This
                      action cannot be undone.
                    </p>
                    <div className="flex justify-end">
                      <button
                        onClick={onDeleteMeasurement}
                        className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Modal>

                <Pagination links={measurements.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
