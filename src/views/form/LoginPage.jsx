import { useForm } from "react-hook-form"
import userService from "../../services/userGet"
import { useNavigate } from "react-router-dom"
import OnclickButton from "../../components/OnClickButton"
import { useState } from "react"

export default function LoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const user = sessionStorage.getItem("token-nalin")

  if (user) {
    navigate("/products")
  }
  const { register, handleSubmit } = useForm({
    login: "",
    password: ""
  })
  const onSubmit = async (user) => {
    const data = await userService.getUser(user.login, user.password)
    if (data.status == 200) {
      navigate("/products")
    } else {
      setError(!error)
    }
  }
  const clickError = () => {
    console.log("error")
  }

  return (
    <div id="login-page">
      <div id="form">
        <img src="nalin-logo.png" width={"150px"} style={{ margin: "10px" }} />

        <div className="form-date">
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <OnclickButton
                textError={"Verifique os dados"}
                event={clickError}
              />
            )}
            <label>Loguin</label>
            <input {...register("login")} />
            <label>Password</label>
            <input {...register("password")} />
            <div>
              <input type="submit" value="Entrar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
