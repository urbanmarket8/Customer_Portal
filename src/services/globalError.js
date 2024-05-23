import { goToLogin } from "../navigation";
import toaster from "../toaster";

const handleHttpError = (error) => {
  const status = error?.response?.status;

  if (status === 401) {
    displayError("Your session has been expired\n Please login again");
    goToLogin();
    return true;
  }

  return false;
};

export const displayError = (displayMessage, options = {}) => {
  toaster.error(displayMessage, {
    toastId: "handle",
    ...options,
  });
};

export const handleGlobalError = (
  error,
  displayMessage,
  { report = true, tag = "handler", options } = {}
) => {
  if (error?.request && error.message === "Network Error") {
    return displayError("you are currently offline");
  }

  if (error?.response?.status && handleHttpError(error, options)) {
    return;
  }
  if (displayMessage) {
    displayError(displayMessage);
  }
};
