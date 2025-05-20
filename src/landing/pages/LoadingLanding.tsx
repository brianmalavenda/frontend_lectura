// src/pages/LoadingLanding.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingLanding: React.FC = () => {
  const navigate = useNavigate();
  
// function waitForAccessToken(timeoutMs: number = 1000, intervalMs: number = 500): Promise<string | null> {
//   return new Promise((resolve) => {
//     const start = Date.now();

//     const interval = setInterval(() => {
//       const token = Cookies.get("access_token");
//       if (token) {
//         console.log("aca estoy: ", token);
//         clearInterval(interval);
//         resolve(token);
//       } else if (Date.now() - start >= timeoutMs) {
//         clearInterval(interval);
//         resolve(null); // Timeout alcanzado, no se encontró la cookie
//       }
//     }, intervalMs);
//   });
//   }

  useEffect(() => {
      navigate("/");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 h-32 w-32 mb-4 animate-spin"></div>
        <p className="text-xl font-semibold">Cargando tus datos...</p>
      </div>
    </div>
  );
};

export default LoadingLanding;
