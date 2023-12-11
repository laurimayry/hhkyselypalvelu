import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Kysely() {
  const [kyselyId, setKyselyId] = React.useState('');
  const [kyselyData, setKyselyData] = useState(null);
  const { kyselyId: urlKyselyId } = useParams();
  const [vastaukset, setVastaukset] = useState([]);

  const handleInputChange = (index, event) => {
    const uudetVastaukset = [...vastaukset];
    uudetVastaukset[index] = event.target.value;
    setVastaukset(uudetVastaukset);
  };

  const handleSubmit = () => {
    console.log(kyselyData);
    fetch('http://localhost:8080/tallennaVastaus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vastaus: vastaukset.join(',') }),

      
    })
      .then(response => response.json())
      .then(data => {
        console.log('Vastaukset tallennettu onnistuneesti: ', data);
      })
      .catch(error => {
        console.error('Virhe tallennettaessa vastauksia: ', error);
      });
  };

  useEffect(() => {
    setKyselyId(urlKyselyId);
  }, [urlKyselyId]);

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

  return (
    <div>
      {kyselyData && kyselyData.length > 0 ? (
        <div>
          <p>Kysely ID: {kyselyData[0].kysely.kyselyId}</p>

          {kyselyData.map((kysymysObj, index) => (
            <div key={index}>
              <p>{index + 1}: {kysymysObj.kysymysteksti}</p>
              <input
                type="text"
                value={vastaukset[index] || ''}
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <p>Ladataan kyselyn tietoja...</p>
      )}
    </div>
  );
}

export default Kysely;
