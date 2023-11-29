import Kyselyt from "./Kyselyt";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Kysely() {
  const [kyselyId, setKyselyId] = React.useState('');
  const [kyselyData, setKyselyData] = useState(null); // Lisätty state kyselyn datalle
  const { kyselyId: urlKyselyId } = useParams();
  


  useEffect(() => {
    setKyselyId(urlKyselyId);
  }, [urlKyselyId]);


  // Päivitetty KyselyHaku funktio hakemaan yksittäisen kyselyn tiedot
  useEffect(() => {
    if (kyselyId) {
      fetch(`http://localhost:8080/kysymyksetIdREST/${kyselyId}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Virhe tietojen hakemisessa");
          }
        })
        .then(data => {
          console.log("Saatu kyselydata:", data);
          setKyselyData(data);
        })
        .catch(error => {
          console.error("Virhe:", error);
        });
    }
  }, [kyselyId]);

  //toinen koukku sen vuoksi, 
  //että kyselyId tulostuisi jo ensimmäisellä sivun avauksella/päivityksellä konsoliin
  /*useEffect(() => {
    KyselyHaku();
  }, [kyselyId]);*/

  /*function KyselyHaku() {
    console.log(kyselyId);
  }
*/
  return (
    <div>
      {kyselyData && kyselyData.length > 0 ? (
        <div>
          {/* Näytä yksittäisen kyselyn tiedot */}
          <p>Kysely ID: {kyselyData[0].kysely.kyselyId}</p>

          {kyselyData.map((kysymysObj, index) => (
          <div key={index}>
            <p> {index + 1}: {kysymysObj.kysymysteksti}</p>
            <input type="text" />
        </div>
          ))}
        </div>
      ) : (
        <p>Ladataan kyselyn tietoja...</p>
      )}
    </div>
  );
}

export default Kysely;