import Container from "@/Components/Container";
import FormMetersEdit from "@/Components/FormMetersEdit";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { Head, Link } from "@inertiajs/react";

export default function Create({ auth, plants, meters, measurement }) {
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
        <FormMetersEdit
          plants={plants}
          meters={meters}
          measurement={measurement}
        />
      </Container>
    </AuthenticatedLayout>
  );
}
