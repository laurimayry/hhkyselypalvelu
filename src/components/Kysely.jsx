import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Kysely() {
  const [kyselyId, setKyselyId] = React.useState("");
  const [kyselyData, setKyselyData] = useState(null);
  const { kyselyId: urlKyselyId } = useParams();
  const [vastaukset, setVastaukset] = useState([]);
  const [vastausolio, setVastausolio] = useState([{}]);

  const handleInputChange = (index, event) => {
    const uudetVastaukset = [...vastaukset];
    uudetVastaukset[index] = event.target.value;
    setVastaukset(uudetVastaukset);
  };

  const handleSubmit = () => {
    // Check if kyselyData is available and has the expected structure
    if (kyselyData && kyselyData.length > 0 && kyselyData[0].kysely.kyselyId) {
      // Map over each answer in the vastaukset array
      vastaukset.forEach((vastaus, index) => {
        const currentKysymysId = kyselyData[index].kysymysId;

        // Create a new vastausolio for each answer
        const currentVastausolio = {
          vastaus: vastaus,
          kysymys: { kysymysId: currentKysymysId },
          kysely: { kyselyId: kyselyData[0].kysely.kyselyId },
        };

        console.log(currentVastausolio);

        // Send a separate fetch request for each answer
        fetch("http://localhost:8080/tallennaVastaus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentVastausolio),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(
              `Vastaus ${index + 1} tallennettu onnistuneesti: `,
              data
            );
          })
          .catch((error) => {
            console.error(
              `Virhe tallennettaessa vastausta ${index + 1}: `,
              error
            );
          });
      });
    } else {
      console.log("Data not available yet. Please wait.");
    }

    setVastaukset("");
  };

  useEffect(() => {
    setKyselyId(urlKyselyId);
  }, [urlKyselyId]);

  useEffect(() => {
    if (kyselyId) {
      fetch(`http://localhost:8080/kysymyksetIdREST/${kyselyId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Virhe tietojen hakemisessa");
          }
        })
        .then((data) => {
          console.log("Saatu kyselydata:", data);
          setKyselyData(data);
        })
        .catch((error) => {
          console.error("Virhe:", error);
        });
    }
  }, [kyselyId]);

  return (
    <div>
      <style>
        {`
          button, input[type="text"] {
            display: block;
            color: #0044cc; /* Text color */
            background-color: #f8f8f8; /* Background color */
            border: 1px solid #dddddd; /* Border */
            border-radius: 5px; /* Rounded corners */
            padding: 8px 12px; /* Padding */
            margin: 5px 0; /* Margin */
            font-family: Arial, sans-serif; /* Font family */
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* Shadow */
            transition: background-color 0.3s, color 0.3s; /* Color transition */
            width: 100px; /* Width */
            font-size: 15px; /* Font size */
          }

          button:hover {
            background-color: #e9e9e9; /* Background color on hover */
            color: #000000; /* Text color on hover */
          }

          input[type="text"] {
            width: auto; /* Adjust width as needed */
          }

          label {
            font-family: Arial, sans-serif; /* Font family */
          }

          div {
            margin-bottom: 15px; /* Spacing between questions */
          }
        `}
      </style>
      {kyselyData && kyselyData.length > 0 ? (
        <div>
          <p>Kysely ID: {kyselyData[0].kysely.kyselyId}</p>

          {kyselyData.map((kysymysObj, index) => (
            <div key={index}>
              <p>
                {index + 1}: {kysymysObj.kysymysteksti}
              </p>
              <input
                type="text"
                value={vastaukset[index] || ""}
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
