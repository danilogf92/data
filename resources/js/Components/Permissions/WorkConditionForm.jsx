import React, { useEffect, useState } from "react";
import { condiciones } from "../Constantes/Constantes";

const WorkConditionForm = ({ plants, areaMachine, suppliers }) => {
  const date = () => {
    const hoy = new Date();
    hoy.setDate(hoy.getDate());
    return hoy.toISOString().split("T")[0];
  };
  const [filteredArea, setFilteredArea] = useState([]);
  const [allAreas, setAllAreas] = useState(areaMachine);
  const [allSuppliers, setAllSuppliers] = useState(suppliers);

  // Inicializa el estado de formData
  const [formData, setFormData] = useState({
    fechaEjecucion: date() || "",
    desde: "06:00",
    hasta: "23:00",
    inspectorSSA: "Inspector",
    plant: "",
    areaMaquina: "",
    ejecutorTrabajo: "",
    descripcionTrabajo: "",
    condiciones,
    TrabajosIncompatible: "",
    RiesgosFactores: "",
    TrabajosElectricos: "NO",
    TrabajosDeSoldadura: "NO",
    TrabajosEnAlturas: "NO",
    TrabajosDentroCocinadores: "NO",
    TrabajosTransportar: "NO",
    TrabajosLevantarObjetos: "NO",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleConditionChange = (index, value) => {
    const newCondiciones = [...condiciones];
    newCondiciones[index].cumple = value;
    setFormData((prevData) => ({
      ...prevData,
      condiciones: newCondiciones,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("permission.store"), {
      onSuccess: (response) => {
        // console.log("Respuesta exitosa:", response);
        // setTimeout(() => {
        //   setShowSuccess(false);
        // }, 3000);
      },
      onError: (errors) => {
        console.error("Errores:", errors);
        // Opcional: mostrar errores en la interfaz de usuario
      },
    });
  };

  const handlePlantChange = async (selectedPlantId) => {
    const filteredArea = allAreas.filter(
      (area) => area.plant_id === parseInt(selectedPlantId, 10)
    );
    setFilteredArea(filteredArea);
  };

  useEffect(() => {
    handlePlantChange(formData.plant);
  }, [formData.plant]);

  return (
    <form onSubmit={onSubmit} className="border border-gray-300 p-4 rounded-lg">
      <table className="table-auto w-full mb-4 border-collapse border border-gray-300">
        <tbody>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-700">Fecha Ejecución</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              <input
                type="date"
                name="fechaEjecucion"
                value={formData.fechaEjecucion}
                onChange={handleChange}
              />
            </td>
            <th className="p-2 border border-gray-700">DESDE:</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              <input
                type="time"
                name="desde"
                value={formData.desde}
                onChange={handleChange}
              />
            </td>
            <th className="p-2 border border-gray-700">HASTA:</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              <input
                type="time"
                name="hasta"
                value={formData.hasta}
                onChange={handleChange}
              />
            </td>

            <th className="p-2 border border-gray-700">Inspector SSA</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              {formData.inspectorSSA}
            </td>
          </tr>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-700">Planta</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              <div className="mt-2">
                <select
                  onChange={handleChange}
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
              </div>
            </td>
            <th className="p-2 border border-gray-700">Área/Máquina</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              <div className="mt-2">
                <select
                  onChange={handleChange}
                  value={formData.areaMaquina}
                  id="areaMaquina"
                  name="areaMaquina"
                  autoComplete="areaMaquina"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="" disabled>
                    -- Select Machine --
                  </option>
                  {filteredArea.map((machine) => (
                    <option key={machine.id} value={machine.nombre}>
                      {machine.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </td>
            <th className="p-2 border border-gray-700">Proveedor</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              <div className="mt-2">
                <select
                  onChange={handleChange}
                  value={formData.ejecutorTrabajo}
                  id="ejecutorTrabajo"
                  name="ejecutorTrabajo"
                  autoComplete="ejecutorTrabajo"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="" disabled>
                    -- Select Proveedor --
                  </option>
                  {allSuppliers.map((proveedor) => (
                    <option key={proveedor.id} value={proveedor.name}>
                      {proveedor.name}
                    </option>
                  ))}
                </select>
              </div>
            </td>
            <th className="p-2 border border-gray-700">Orden/Trabajo</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              No Aplica
            </td>
          </tr>

          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-700">
              Descripción Breve Del Trabajo a Realizar
            </th>
            <td className="p-2 border bg-gray-300 text-gray-700" colSpan="8">
              <textarea
                name="descripcionTrabajo"
                value={formData.descripcionTrabajo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-zinc-800"
                rows="4"
                placeholder="Descripción del trabajo..."
              ></textarea>
            </td>
          </tr>

          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-700">CUMPLE CON</th>
            <th className="p-2 border border-gray-700">SÍ</th>
            <th className="p-2 border border-gray-700">NO</th>
            <th className="p-2 border border-gray-700">N/A</th>
            <th className="p-2 border border-gray-700" colSpan="4">
              OBSERVACIONES
            </th>
          </tr>

          {condiciones.map((condicion, index) => (
            <tr key={index}>
              <td className="p-2 border border-gray-300">{condicion.name}</td>
              <td className="p-2 border border-gray-300">
                <input
                  type="radio"
                  name={`cumple_${index}`}
                  value="SI"
                  checked={condicion.cumple === "SI"}
                  onChange={() => handleConditionChange(index, "SI")}
                />
              </td>
              <td className="p-2 border border-gray-300">
                <input
                  type="radio"
                  name={`cumple_${index}`}
                  value="NO"
                  checked={condicion.cumple === "NO"}
                  onChange={() => handleConditionChange(index, "NO")}
                />
              </td>
              <td className="p-2 border border-gray-300">
                <input
                  type="radio"
                  name={`cumple_${index}`}
                  value="N/A"
                  checked={condicion.cumple === "N/A"}
                  onChange={() => handleConditionChange(index, "N/A")}
                />
              </td>
              <td className="p-2 border border-gray-300" colSpan="4">
                <textarea
                  type="text"
                  className="w-full p-1 border border-gray-300"
                  placeholder="Observaciones"
                  value={condicion.observaciones}
                  onChange={(e) => {
                    const newCondiciones = [...formData.condiciones];
                    newCondiciones[index].observaciones = e.target.value;
                    setFormData((prevData) => ({
                      ...prevData,
                      condiciones: newCondiciones,
                    }));
                  }}
                />
              </td>
            </tr>
          ))}

          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-300">
              Trabajos Incompatible en las Cercanias:
            </th>
            <td className="p-2 border border-gray-300" colSpan={8}>
              <textarea
                name="TrabajosIncompatible"
                value={formData.TrabajosIncompatible}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-zinc-800"
                rows="4"
                placeholder="Observaciones"
              ></textarea>
            </td>
          </tr>

          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-300">
              Trabajos Incompatible en las Cercanias:
            </th>
            <td className="p-2 border border-gray-300" colSpan={8}>
              <textarea
                name="RiesgosFactores"
                value={formData.RiesgosFactores}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-zinc-800"
                rows="4"
                placeholder="Observaciones"
              ></textarea>
            </td>
          </tr>

          <tr className="bg-blue-900 text-white">
            <th className="text-center p-2 border border-gray-300" colSpan={8}>
              Destimación de Alto Riesgo de Actividad
            </th>
          </tr>

          <tr>
            <td className="p-2 border border-gray-300" colSpan={6}>
              Intervención en instalaciones o equipos eléctricos de mediana
              tensión (1KV - 50KV) o alta tensión (50KV - 500KV)
            </td>
            <td className="p-2 border border-gray-300" colSpan={2}>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosElectricos" // Cambié aquí para que coincida con el nombre en formData
                  value="SI"
                  checked={formData.TrabajosElectricos === "SI"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosElectricos" // Cambié aquí también
                  value="NO"
                  checked={formData.TrabajosElectricos === "NO"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                No
              </label>
            </td>
          </tr>

          <tr>
            <td className="p-2 border border-gray-300" colSpan={6}>
              Trabajo de soldadura fuera de los talleres (ambiente controlado)
            </td>
            <td className="p-2 border border-gray-300" colSpan={2}>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosDeSoldadura" // Cambié aquí para que coincida con el nombre en formData
                  value="SI"
                  checked={formData.TrabajosDeSoldadura === "SI"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosDeSoldadura" // Cambié aquí también
                  value="NO"
                  checked={formData.TrabajosDeSoldadura === "NO"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                No
              </label>
            </td>
          </tr>

          <tr>
            <td className="p-2 border border-gray-300" colSpan={6}>
              Trabajos de cualquier tipo, a alturas mayores a la referencial (h
              + 1 piso de altura), fuera de ambiente controlado.
            </td>
            <td className="p-2 border border-gray-300" colSpan={2}>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosEnAlturas" // Cambié aquí para que coincida con el nombre en formData
                  value="SI"
                  checked={formData.TrabajosEnAlturas === "SI"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosEnAlturas" // Cambié aquí también
                  value="NO"
                  checked={formData.TrabajosEnAlturas === "NO"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                No
              </label>
            </td>
          </tr>

          <tr>
            <td className="p-2 border border-gray-300" colSpan={6}>
              Trabajos dentro de cocinadores, autoclaves, cisternas, tanques,
              reservorios o similares
            </td>
            <td className="p-2 border border-gray-300" colSpan={2}>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosDentroCocinadores" // Cambié aquí para que coincida con el nombre en formData
                  value="SI"
                  checked={formData.TrabajosDentroCocinadores === "SI"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosDentroCocinadores" // Cambié aquí también
                  value="NO"
                  checked={formData.TrabajosDentroCocinadores === "NO"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                No
              </label>
            </td>
          </tr>

          <tr>
            <td className="p-2 border border-gray-300" colSpan={6}>
              Transportar, trasvasar, mezclar, utilizar o manipular químicos
              peligrosos, fuera del ambiente controlado
            </td>
            <td className="p-2 border border-gray-300" colSpan={2}>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosTransportar" // Cambié aquí para que coincida con el nombre en formData
                  value="SI"
                  checked={formData.TrabajosTransportar === "SI"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosTransportar" // Cambié aquí también
                  value="NO"
                  checked={formData.TrabajosTransportar === "NO"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                No
              </label>
            </td>
          </tr>

          <tr>
            <td className="p-2 border border-gray-300" colSpan={6}>
              Trabajos que implican levantar objetos pesados o cargas utilizando
              equipos especializados, como grúas, polipastos o similares
            </td>
            <td className="p-2 border border-gray-300" colSpan={2}>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosLevantarObjetos" // Cambié aquí para que coincida con el nombre en formData
                  value="SI"
                  checked={formData.TrabajosLevantarObjetos === "SI"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosLevantarObjetos" // Cambié aquí también
                  value="NO"
                  checked={formData.TrabajosLevantarObjetos === "NO"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                No
              </label>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        type="submit"
        className="mt-4 block mx-auto bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Save
      </button>

      {/* <pre>{JSON.stringify(formData, undefined, 2)}</pre> */}
      {/* <pre>{JSON.stringify(suppliers, undefined, 2)}</pre> */}
    </form>
  );
};

export default WorkConditionForm;
