import { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";


function Kyselyt() {
  const backendUrl = "http://localhost:8080/kyselytREST";
  const [kysely, setKysely] = useState([]);
  //const [kyselyId, setKyselyId] = useState('');


  //const { kyselyId } = useParams(); // Haetaan kyselyId reittiparametrina
  //console.log("kyselyId:", kyselyId);

  useEffect(() => {
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
          console.log("Saatu data:", data); // Lisää tämä rivi nähdäksesi saadun datan

          if (Array.isArray(data)) {
            setKysely(data); // Huomaa, että käytetään silti taulukkoa käsittelyyn
          } else {
            throw new Error("Haettu data ei ole odotettu muoto");
          }
        })
        .catch(error => {
          console.error("Virhe:", error);
        });
    };
    fetchKyselyt();
  }, [backendUrl]); // Lisää fetchKyselyt ja backendUrl riippuvuuslistaan

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