// src/App.tsx
import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Route/routes";
import { persistQueryClientRestore } from "@tanstack/react-query-persist-client";
import { queryClient, localStoragePersister } from "./queryClientSetup"; // Move queryClient setup here if required
import Loader from "./components/Loader/Loader";

const App = () => {
  const [isCacheLoaded, setIsCacheLoaded] = useState(false);

  useEffect(() => {
    // Restore persisted cache
    persistQueryClientRestore({
      queryClient,
      persister: localStoragePersister,
    }).then(() => {
      setIsCacheLoaded(true); // Cache fully restored
    });
  }, []);

  // Prevent rendering until the cache is restored
  // TODO: Fix sudden logout
  if (!isCacheLoaded) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
