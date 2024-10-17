import Modal from "@/Components/Modal";
import ContainerAuth from "@/Components/MyComponents/ContainerAuth";
import ExportButton from "@/Components/MyComponents/ExportButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";

export default function Index({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Permissions
          </h2>
          {(auth.user.roles.includes("Fuel") ||
            auth.user.permissions.includes("Create Fuel")) && (
            <>
              <Link
                href={route("permission.create")}
                className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
              >
                New Permission
              </Link>
            </>
          )}
        </div>
      }
    >
      <Head title="Meters" />

      <ContainerAuth>
        {/* {(auth.user.roles.includes("Fuel") ||
          auth.user.permissions.includes("Create Fuel")) && (
          <>
            <ExportButton link="/fuel-data/export" documentName="fuel" />
          </>
        )} */}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
          {/* {showSuccess && (
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
          )} */}

          <h2 className="text-center">SHOW PERMISSIONS TABLE</h2>

          {/* <pre>{JSON.stringify(fuelData, undefined, 2)}</pre> */}
          {/* <pre>{JSON.stringify(filters, undefined, 2)}</pre> */}
          {/* <pre>{JSON.stringify(fuelData, undefined, 2)}</pre> */}
          {/* <pre>{JSON.stringify(auth.user, undefined, 2)}</pre> */}
          {/* <pre>{JSON.stringify(auth.user.permissions, undefined, 2)}</pre> */}
        </div>
      </ContainerAuth>
    </AuthenticatedLayout>
  );
}
