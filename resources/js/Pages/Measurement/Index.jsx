import FormMeters from "@/Components/FormMeters";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, measurements }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      // header={
      //   <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
      //     Measurement
      //   </h2>
      // }
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
              {/* <pre>{JSON.stringify(measurements, undefined, 2)}</pre> */}

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
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

                          <Link
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                            href={route("measurement.destroy", measurement.id)}
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Pagination links={measurements.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
