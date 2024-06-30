import { AreaChartHero } from "@/ChartComponents/AreaChartHero";
import { BarChartHero } from "@/ChartComponents/BarChartHero";
import ChartResume from "@/ChartComponents/ChartResume";
import { CardTest } from "@/Components/MyComponents/CardTest";
import { CardUsageExample } from "@/Components/MyComponents/CardUsageExample";
import ContainerAuth from "@/Components/MyComponents/ContainerAuth";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <ContainerAuth>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <CardUsageExample />
          <CardUsageExample />
          <CardUsageExample />
          <CardUsageExample />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2 py-4">
          <ChartResume />
          <ChartResume />
        </div>

        <div className="grid grid-cols-1 bg-slate-50 shadow-lg p-1 rounded-md mt-2">
          <AreaChartHero />
        </div>

        <div className="grid grid-cols-1 bg-slate-50 shadow-lg p-1 rounded-md mt-2">
          <BarChartHero />
        </div>
      </ContainerAuth>
    </AuthenticatedLayout>
  );
}
