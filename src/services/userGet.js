import api from "./api"

const userService = {
  getUser: async (user, password) => {
    const data = await api
      .get(`/estagionalin/login?ds_login=${user}&ds_senha=${password}`)
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 401) {
          return error.response
        }
        return error
      })

    if (data.status == 200) {
      sessionStorage.setItem("token-nalin", data.data.data[0].token)
    }

    return data
  },

  getListProducts: async () => {
    const { data } = await api
      .get("/estagionalin/produtos/listar")
      .catch((error) => {
        return error
      })

    return data.data
  }
}

export default userService
