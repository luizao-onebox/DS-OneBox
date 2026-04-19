import { LoginForm } from "./LoginForm"

export default {
  title: "Blocks/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
}

export const Default = {
  args: {
    isLoading: false,
    errorMessage: "",
  },
}

export const Loading = {
  args: {
    isLoading: true,
  },
}

export const WithError = {
  args: {
    errorMessage: "Credenciais inválidas. Tente novamente.",
  },
}
