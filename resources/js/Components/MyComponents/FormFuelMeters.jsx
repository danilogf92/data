import React, { useState } from "react";
import InputError from "../InputError";
import { useForm } from "@inertiajs/react";

const WorkConditionForm = ({ plants }) => {
  const datetest = () => {
    const hoy = new Date();
    hoy.setDate(hoy.getDate());
    return hoy.toISOString().split("T")[0];
  };

  const { formData, setFormData, post, errors } = useForm({
    fechaEjecucion: datetest() || "",
    desde: "6:00",
    hasta: "23:00",
    inspectorSSA: "AREA FREON COMPRESORES",
    plant: "", // Debe coincidir con la propiedad que se espera usar
    areaMaquina: "AREA FREON COMPRESORES",
    ordenTrabajo: "N/A",
    ejecutorTrabajo: "ARQ FRANCO",
    descripcionTrabajo: "Pintura y empaste",
    TrabajosIncompatible: "Vacios",
    RiesgosFactores: "Vacios",
    condiciones: [], // Asegúrate de inicializar 'condiciones' si lo necesitas
    altoRiesgo: {}, // Asegúrate de inicializar 'altoRiesgo' si lo necesitas
  });

  const handleChange = (index, field, value) => {
    const newCondiciones = [...formData.condiciones];
    newCondiciones[index][field] = value;
    setFormData({ ...formData, condiciones: newCondiciones });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.altoRiesgo) {
      setFormData({
        ...formData,
        altoRiesgo: {
          ...formData.altoRiesgo,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("permission.store"), {
      onSuccess: (response) => {
        // console.log("Respuesta exitosa:", response);
      },
      onError: (errors) => {
        console.error("Errores:", errors);
        // Opcional: mostrar errores en la interfaz de usuario
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-4xl mx-auto">
      {/* Tabla de Fecha Ejecución */}
      <table className="table-auto w-full mb-4 border-collapse border border-gray-300">
        <tbody>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-700">Fecha Ejecución</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              {formData.fechaEjecucion}
            </td>
            <th className="p-2 border border-gray-700">DESDE:</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              {formData.desde}
            </td>
            <th className="p-2 border border-gray-700">HASTA:</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              {formData.hasta}
            </td>
            <th className="p-2 border border-gray-700">Inspector SSA</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              {formData.inspectorSSA}
            </td>
          </tr>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-700">Planta</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              {formData.plant}

              <div className="mt-2">
                <select
                  onChange={handleInputChange} // Cambiado aquí
                  value={formData.plant}
                  id="plant"
                  name="plant"
                  autoComplete="plant"
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
                  message={errors.plant}
                  className="mt-2 text-red-500"
                />
              </div>
            </td>
            <th className="p-2 border border-gray-700">Área/Máquina</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              {formData.areaMaquina}
            </td>
            <th className="p-2 border border-gray-700">Orden/Trabajo #</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              {formData.ordenTrabajo}
            </td>
            <th className="p-2 border border-gray-700">Ejecutor Del Trabajo</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              {formData.ejecutorTrabajo}
            </td>
          </tr>
        </tbody>
      </table>

      <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
        Submit
      </button>

      <pre>{JSON.stringify(formData, undefined, 2)}</pre>
    </form>
  );
};

export default WorkConditionForm;
