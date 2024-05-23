import { useState } from "react";

export const useMutation = (requestFn, options = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const { onSuccess, onError } = options;

  const startRequest = async (payload) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await requestFn(payload);
      setData(result.data);
      if (typeof onSuccess === "function") {
        onSuccess(result);
      }
    } catch (err) {
      const { response } = err || {};
      setError(response);
      setData(null);
      if (typeof onError === "function") {
        onError(response);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const mutate = async (payload) => {
    await startRequest(payload);
  };
  return { data, isMutating: isLoading, error, mutate };
};
