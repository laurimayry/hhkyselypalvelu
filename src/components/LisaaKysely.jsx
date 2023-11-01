import { useEffect } from "react";

function LisaaKysely() {
  const backendUrl = "http://localhost:8080/kyselyLista";

  useEffect(() => {
    window.location.href = backendUrl;
  }, []);

  return (
    <div>
      <p>moi</p>
    </div>
  );
}

export default LisaaKysely;
