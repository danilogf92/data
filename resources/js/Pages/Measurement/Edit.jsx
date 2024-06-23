import Container from "@/Components/Container";
import FormMeters from "@/Components/FormMeters";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { Head, Link } from "@inertiajs/react";

export default function Create({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Edit Measure
        </h2>
      }
    >
      <Head title="Meters" />

      <Container route={route("measurement.index")} buttonText="Before">
        <FormMeters />
      </Container>
    </AuthenticatedLayout>
  );
}
