import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TrafficCard({
  cantidadContar,
  cantidadSumar,
  cantidadMemoria,
  cantidadObjetos,
}) {
  const data = {
    labels: ["Contar", "Sumas y restas", "Memoria", "Identificar Objetos"],
    datasets: [
      {
        label: "# of Votes",
        data: [cantidadContar, cantidadSumar, cantidadMemoria, cantidadObjetos],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card>
      <CardHeader color="pink" contentPosition="left">
        <h6 className="uppercase text-gray-200 text-xs font-medium">
          Cantidad de veces
        </h6>
        <h2 className="text-white text-2xl">Jugado</h2>
      </CardHeader>
      <CardBody>
        <Pie data={data} />
      </CardBody>
    </Card>
  );
}
