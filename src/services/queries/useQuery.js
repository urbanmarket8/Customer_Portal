import { useCallback, useEffect, useState } from "react";
import { handleGlobalError } from "../globalError";

export const useQuery = (requestFn, options = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [data, setData] = useState(null);

  const { onSuccess, onError } = options;

  const startRequest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await requestFn();
      setData(result.data);
      if (typeof onSuccess === "function") {
        onSuccess(result);
      }
    } catch (err) {
      handleGlobalError(err);

      setError(err);
      if (typeof onError === "function") {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [error, onError, onSuccess, requestFn]);

  useEffect(() => {
    startRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { data, isLoading, error };
};
