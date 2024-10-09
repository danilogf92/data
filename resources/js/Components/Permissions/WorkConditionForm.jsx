import React, { useState } from "react";

const WorkConditionForm = () => {
  const [formData, setFormData] = useState({
    fechaEjecucion: "8/16/2024",
    desde: "6:00",
    hasta: "23:00",
    inspectorSSA: "AREA FREON COMPRESORES",
    proceso: "Ciesa 1",
    areaMaquina: "AREA FREON COMPRESORES",
    ordenTrabajo: "N/A",
    ejecutorTrabajo: "ARQ FRANCO",
    descripcionTrabajo: "Pintura y empaste",
    TrabajosIncompatible: "Vacios",
    RiesgosFactores: "Vacios",
    altoRiesgo: {
      electrico: "NO",
      soldadura: "NO",
      alturas: "SI",
      cocinadores: "NO",
      quimicos: "NO",
      levantarPesado: "NO",
    },
    condiciones: [
      {
        name: "EQUIPO/ÁREA FUERA DE SERVICIO",
        cumple: "SI",
        observaciones: "",
      },
      { name: "VÁLVULAS CERRADAS", cumple: "SI", observaciones: "" },
      { name: "VÁLVULAS BLOQUEADAS", cumple: "SI", observaciones: "" },
      { name: "INTERRUPTORES APAGADOS", cumple: "SI", observaciones: "" },
      {
        name: "TABLEROS DE CONTROL ELÉCTRICO BLOQUEADOS",
        cumple: "SI",
        observaciones: "",
      },
      { name: "EQUIPOS PURGADOS", cumple: "SI", observaciones: "" },
      { name: "EQUIPOS SIN RESIDUOS", cumple: "SI", observaciones: "" },
      { name: "EQUIPOS DRENADOS", cumple: "SI", observaciones: "" },
      { name: "EQUIPOS SIN PRESIÓN", cumple: "SI", observaciones: "" },
      {
        name: "EQUIPOS SIN ENERGÍA ELÉCTRICA",
        cumple: "SI",
        observaciones: "",
      },
      {
        name: "EQUIPOS A TEMPERATURA ADECUADA",
        cumple: "SI",
        observaciones: "",
      },
      {
        name: "POSIBLE CONTAMINACIÓN CRUZADA DURANTE/ DESPUÉS DEL TRABAJO",
        cumple: "NO",
        observaciones: "",
      },
      {
        name: "POSIBLES IMPACTOS AMBIENTALES (RESIDUOS)",
        cumple: "SI",
        observaciones: "",
      },
      {
        name: "Área Circundante Libre de Otros Elementos de Riesgo",
        cumple: "SI",
        observaciones: "",
      },
      {
        name: "PERSONAL INVOLUCRADO INFORMADO",
        cumple: "SI",
        observaciones: "",
      },
      {
        name: "EQUIPO DE EMERGENCIA DISPONIBLE",
        cumple: "SI",
        observaciones: "",
      },
      { name: "PERSONAL EJECUTOR CAPACITADO", cumple: "SI", observaciones: "" },
      {
        name: "SUPERVISIÓN PERMANENTE",
        cumple: "NO",
        observaciones: "Cada 2 hrs",
      },
    ],
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      {/* Tabla de Fecha Ejecución */}
      <table className="table-auto w-full mb-4 border-collapse border border-gray-300">
        <tbody>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-300">Fecha Ejecución</th>
            <td className="p-2 border border-gray-300 bg-lime-300">
              {formData.fechaEjecucion}
            </td>
            <th className="p-2 border border-gray-300">DESDE:</th>
            <td className="p-2 border border-gray-300 bg-lime-300">
              {formData.desde}
            </td>
            <th className="p-2 border border-gray-300">HASTA:</th>
            <td className="p-2 border border-gray-300 bg-lime-300">
              {formData.hasta}
            </td>
            <th className="p-2 border border-gray-300">Inspector SSA</th>
            <td className="p-2 border border-gray-300 bg-lime-300">
              {formData.inspectorSSA}
            </td>
          </tr>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-300">Proceso</th>
            <td className="p-2 border border-gray-300 bg-lime-300">
              {formData.proceso}
            </td>
            <th className="p-2 border border-gray-300">Área/Máquina</th>
            <td className="p-2 border border-gray-300 bg-lime-300">
              {formData.areaMaquina}
            </td>
            <th className="p-2 border border-gray-300">Orden/Trabajo #</th>
            <td className="p-2 border border-gray-300 bg-lime-300">
              {formData.ordenTrabajo}
            </td>
            <th className="p-2 border border-gray-300">Ejecutor Del Trabajo</th>
            <td className="p-2 border border-gray-300 bg-lime-300">
              {formData.ejecutorTrabajo}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Tabla de Descripción Breve del Trabajo */}
      <table className="table-auto w-full mb-4 border-collapse border border-gray-300">
        <tbody>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-300">
              Descripción Breve Del Trabajo a Realizar
            </th>
            <td className="p-2 border border-gray-300 bg-gray-100" colSpan="4">
              <textarea
                name="descripcionTrabajo"
                value={formData.descripcionTrabajo}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 text-zinc-800"
                rows="4"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Tabla de Condiciones */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-300">CUMPLE CON</th>
            <th className="p-2 border border-gray-300">SÍ</th>
            <th className="p-2 border border-gray-300">NO</th>
            <th className="p-2 border border-gray-300">N/A</th>
            <th className="p-2 border border-gray-300">OBSERVACIONES</th>
          </tr>
        </thead>
        <tbody>
          {formData.condiciones.map((condicion, index) => (
            <tr key={index}>
              <td className="p-2 border border-gray-300">{condicion.name}</td>
              <td className="p-2 border border-gray-300">
                <input
                  type="radio"
                  name={`cumple-${index}`}
                  value="SI"
                  checked={condicion.cumple === "SI"}
                  onChange={() => handleChange(index, "cumple", "SI")}
                />
              </td>
              <td className="p-2 border border-gray-300">
                <input
                  type="radio"
                  name={`cumple-${index}`}
                  value="NO"
                  checked={condicion.cumple === "NO"}
                  onChange={() => handleChange(index, "cumple", "NO")}
                />
              </td>
              <td className="p-2 border border-gray-300">
                <input
                  type="radio"
                  name={`cumple-${index}`}
                  value="N/A"
                  checked={condicion.cumple === "N/A"}
                  onChange={() => handleChange(index, "cumple", "N/A")}
                />
              </td>
              <td className="p-2 border border-gray-300">
                <input
                  type="text"
                  value={condicion.observaciones}
                  onChange={(e) =>
                    handleChange(index, "observaciones", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla de Trabajos Incompatible en las Cercanias */}
      <table className="table-auto w-full mb-4 border-collapse border border-gray-300">
        <tbody>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-300">
              Trabajos Incompatible en las Cercanias:
            </th>
            <td className="p-2 border border-gray-300 bg-gray-100" colSpan="4">
              <textarea
                name="TrabajosIncompatible"
                value={formData.TrabajosIncompatible}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 text-zinc-800"
                rows="4"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Tabla de Riesgos y Factores de Riesgo en la Tarea Reconocidos por el Ejecutor del Trabajo */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <tbody>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-300">
              Riesgos y Factores de Riesgo en la Tarea Reconocidos por el
              Ejecutor del Trabajo:
            </th>
            <td className="p-2 border border-gray-300 bg-gray-100" colSpan="4">
              <textarea
                name="RiesgosFactores"
                value={formData.RiesgosFactores}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 text-zinc-800"
                rows="4"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table-auto w-full mb-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-300" colSpan="3">
              Destimación de Alto Riesgo de Actividad
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border border-gray-300">
              Intervención en instalaciones o equipos eléctricos de mediana
              tensión (1KV - 50KV) o alta tensión (50KV - 500KV)
            </td>
            <td className="p-2 border border-gray-300">
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="electrico"
                  value="SI"
                  checked={formData.altoRiesgo.electrico === "SI"}
                  onChange={handleInputChange}
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="electrico"
                  value="NO"
                  checked={formData.altoRiesgo.electrico === "NO"}
                  onChange={handleInputChange}
                />
                No
              </label>
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-300">
              Trabajo de soldadura fuera de los talleres (ambiente controlado)
            </td>
            <td className="p-2 border border-gray-300">
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="soldadura"
                  value="SI"
                  checked={formData.altoRiesgo.soldadura === "SI"}
                  onChange={handleInputChange}
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="soldadura"
                  value="NO"
                  checked={formData.altoRiesgo.soldadura === "NO"}
                  onChange={handleInputChange}
                />
                No
              </label>
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-300">
              Trabajos de cualquier tipo, a alturas mayores a la referencial (h
              + 1 piso de altura), fuera de ambiente controlado.
            </td>
            <td className="p-2 border border-gray-300">
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="alturas"
                  value="SI"
                  checked={formData.altoRiesgo.alturas === "SI"}
                  onChange={handleInputChange}
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="alturas"
                  value="NO"
                  checked={formData.altoRiesgo.alturas === "NO"}
                  onChange={handleInputChange}
                />
                No
              </label>
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-300">
              Trabajos dentro de cocinadores, autoclaves, cisternas, tanques,
              reservorios o similares
            </td>
            <td className="p-2 border border-gray-300">
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="cocinadores"
                  value="SI"
                  checked={formData.altoRiesgo.cocinadores === "SI"}
                  onChange={handleInputChange}
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="cocinadores"
                  value="NO"
                  checked={formData.altoRiesgo.cocinadores === "NO"}
                  onChange={handleInputChange}
                />
                No
              </label>
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-300">
              Transportar, trasvasar, mezclar, utilizar o manipular químicos
              peligrosos, fuera del ambiente controlado
            </td>
            <td className="p-2 border border-gray-300">
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="quimicos"
                  value="SI"
                  checked={formData.altoRiesgo.quimicos === "SI"}
                  onChange={handleInputChange}
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="quimicos"
                  value="NO"
                  checked={formData.altoRiesgo.quimicos === "NO"}
                  onChange={handleInputChange}
                />
                No
              </label>
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-300">
              Trabajos que implican levantar objetos pesados o cargas utilizando
              equipos especializados, como grúas, polipastos o similares
            </td>
            <td className="p-2 border border-gray-300">
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="levantarPesado"
                  value="SI"
                  checked={formData.altoRiesgo.levantarPesado === "SI"}
                  onChange={handleInputChange}
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="levantarPesado"
                  value="NO"
                  checked={formData.altoRiesgo.levantarPesado === "NO"}
                  onChange={handleInputChange}
                />
                No
              </label>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="p-4 border border-gray-300 bg-gray-100">
              Si se ha seleccionado alguna de las opciones anteriores, el
              trabajo está catalogado como de "alto riesgo". El coordinador de
              la actividad deberá contactarse con SSAP para la gestión
              correspondiente.
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="p-4 border border-gray-300 bg-gray-50">
              <strong>NOTA:</strong> Ambiente o área controlada: Lugar de
              trabajo que tiene controles, herramientas, procedimientos y/o
              métodos específicos para proteger a los trabajadores de los
              riesgos presentes en sus actividades laborales.
            </td>
          </tr>
        </tbody>
      </table>

      <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default WorkConditionForm;
