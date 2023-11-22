import { useEffect, useState } from "react";

function Kyselyt() {
  const backendUrl = "http://localhost:8080/kyselytREST";
  const [kysely, setKysely] = useState([]);



  useEffect(() => {
    //window.location.href = backendUrl;
    fetchKyselyt();
  }, []);

  

  const fetchKyselyt = () => {
    fetch(backendUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Virhe tietojen hakemisessa");
      }
    })
    .then(data => {
      if (Array.isArray(data)) {
        setKysely(data);
        console.log(data)

      } else {
        throw new Error("Haettu data ei ole taulukko");
      }
  })
    .catch(error => {
      console.error("Virhe:", error);
  })}

  return (
    <div>
      {kysely.map((kysely, index) => (
        <div key={index}>
          {kysely.kyselyId},{" "}
          {kysely.name}
        </div>
      ))}
    </div>
  );
}

export default Kyselyt;
