import FormMeters from "@/Components/FormMeters";
import Modal from "@/Components/Modal";
import ContainerAuth from "@/Components/MyComponents/ContainerAuth";
import ExportButton from "@/Components/MyComponents/ExportButton";
import PaginationTwo from "@/Components/PaginationTwo";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index({ auth, production }) {
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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [measurementToDelete, setMeasurementToDelete] = useState(null);

  const deleteMeasurement = (item) => {
    router.delete(route("production-by-weight.destroy", item.id), {
      onSuccess: (response) => {
        // console.log(response); // AQUI GENERA EL showSuccess
      },
      onError: (errors) => {
        // console.log(errors);
      },
    });
  };

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
            Production
          </h2>
          {(auth.user.roles.includes("Water") ||
            auth.user.permissions.includes("Create Water")) && (
            <>
              <Link
                href={route("production-by-weight.create")}
                className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
              >
                New value
              </Link>
            </>
          )}
        </div>
      }
    >
      <Head title="Meters" />

      <ContainerAuth>
        {/* <ExportButton
          link="/production-by-weight/export"
          documentName="production_by_weights"
        /> */}
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
          {production.data.length > 0 && (
            <>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-red-50 rounded-lg">
                <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500 rounded-lg">
                  <tr>
                    {/* <th scope="col" className="px-6 py-3">
                      Id
                    </th> */}
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Net
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total boxes
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Pn per box
                    </th>
                    {auth.user.roles.includes("Water") && (
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {production.data.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                      } border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                    >
                      {/* <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.id}
                      </td> */}
                      <td className="px-6 py-2">{item.date}</td>
                      <td className="px-6 py-2">{item.net}</td>
                      <td className="px-6 py-2">{item.total_boxes}</td>
                      <td className="px-6 py-2">{item.pn_per_box}</td>
                      {auth.user.roles.includes("Water") && (
                        <td className="py-2 text-center">
                          <Link
                            className="font-medium text-amber-600 dark:text-amber-500 hover:underline mr-4"
                            href={route("production-by-weight.edit", item.id)}
                          >
                            Edit
                          </Link>
                          <button
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                            onClick={() => {
                              setMeasurementToDelete(item);
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
              <PaginationTwo links={production.meta.links} />
            </>
          )}
          {production.data.length === 0 && (
            <div className="flex items-center justify-center p-4 text-yellow-800">
              <span className="mr-2 text-5xl">No content</span>
              <span className="text-5xl" role="img" aria-label="barrel">
                🛢
              </span>
            </div>
          )}
        </div>
      </ContainerAuth>

      {/* 
      <pre>{JSON.stringify(production, undefined, 2)}</pre>
      <pre>{JSON.stringify(auth.user.permissions, undefined, 2)}</pre> */}
    </AuthenticatedLayout>
  );
}
