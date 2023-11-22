import { useEffect, useState } from "react";

function Kyselyt() {
  const backendUrl = "http://localhost:8080/kyselytREST";
  const [kysely, setKysely] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [kyselyId, setKyselyId] = useState(2);

  useEffect(() => {
    const fetchKyselyt = () => {
      const url = `${backendUrl}/${kyselyId}`;
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Virhe tietojen hakemisessa");
          }
        })
        .then(data => {
          console.log("Saatu data:", data); // Lisää tämä rivi nähdäksesi saadun datan

          if (typeof data === 'object' && data !== null) {
            setKysely([data]); // Huomaa, että käytetään silti taulukkoa käsittelyyn
          } else {
            throw new Error("Haettu data ei ole odotettu muoto");
          }
        })
        .catch(error => {
          console.error("Virhe:", error);
        });
    };

    fetchKyselyt();
  }, [kyselyId, backendUrl]); // Lisää fetchKyselyt ja backendUrl riippuvuuslistaan

  return (
    <div>
      {kysely.map((kysely, index) => (
        <div key={index}>
          {kysely.kyselyId}, {kysely.name}
        </div>
      ))}
    </div>
  );
}

export default Kyselyt;