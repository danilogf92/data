import FormMeters from "@/Components/FormMeters";
import Modal from "@/Components/Modal";
import ContainerAuth from "@/Components/MyComponents/ContainerAuth";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index({ auth, measurements, total }) {
  const { flash } = usePage().props;
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (flash.success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  }, [flash]);

  const deleteMeasurement = (measurement) => {
    router.delete(route("measurement.destroy", measurement.id), {
      onSuccess: (response) => {
        console.log(response); // AQUI GENERA EL showSuccess
      },
      onError: (errors) => {
        // console.log(errors);
      },
    });
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
          {(auth.user.roles.includes("Water") ||
            auth.user.permissions.includes("Create Water")) && (
            <>
              <Link
                href={route("measurement.create")}
                className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
              >
                New Measure
              </Link>
            </>
          )}
        </div>
      }
    >
      <Head title="Meters" />

      <ContainerAuth>
        <button
          href={route("measurement.create")}
          className="justify-end mb-4 bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
        >
          Export Data
        </button>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
          {showSuccess && (
            <div className="mt-20 fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center shadow-md">
              <div className="relative">
                <strong className="font-bold block">Success!</strong>
                <span className="block sm:inline">{flash.success}</span>
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
          {measurements.data.length > 0 && (
            <>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-red-50 rounded-lg">
                <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500 rounded-lg">
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
                    {auth.user.roles.includes("Water") && (
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {measurements.data.map((measurement, index) => (
                    <tr
                      key={measurement.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                      } border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                    >
                      <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {measurement.plant_id}
                      </td>
                      <td className="px-6 py-2">{measurement.meter_id}</td>
                      <td className="px-6 py-2">{measurement.start_value}</td>
                      <td className="px-6 py-2">{measurement.end_value}</td>
                      <td className="px-6 py-2">{measurement.difference}</td>
                      <td className="px-6 py-2 text-nowrap">
                        {measurement.date}
                      </td>
                      {auth.user.roles.includes("Water") && (
                        <td className="py-2 text-center">
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
                      )}
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
            </>
          )}
          {measurements.data.length === 0 && (
            <div className="flex items-center justify-center p-4 text-yellow-800">
              <span className="mr-2 text-5xl">No content</span>
              <span className="text-5xl" role="img" aria-label="barrel">
                🛢
              </span>
            </div>
          )}

          {/* <pre>{JSON.stringify(auth.user, undefined, 2)}</pre> */}
          {/* <pre>{JSON.stringify(auth.user.permissions, undefined, 2)}</pre> */}
        </div>
      </ContainerAuth>
    </AuthenticatedLayout>
  );
}
