"use cliient";

import { useState } from "react";

interface TogglePassword {
  showPassword: boolean;
  togglePassword: () => void;
}

const useTogglePassword = (): TogglePassword => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return { showPassword, togglePassword };
};

export default useTogglePassword;
