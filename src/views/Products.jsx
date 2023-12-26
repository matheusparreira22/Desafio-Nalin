import { useEffect, useState } from "react"
import userService from "../services/userGet"
import OutherList from "../components/OutherList"
import { useNavigate } from "react-router-dom"
import { IoPerson } from "react-icons/io5";

export default function Products() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]) //apiresponse
  const [filterProduct, setFilterProduct] = useState([]) //lista filtrada
  const [filter, setFilter] = useState("")
  const [select, setSelect] = useState("") //input

  const logOut = () => {
    sessionStorage.clear()
    navigate("/")
  }
  const fetchProduct = async () => {
    const response = await userService.getListProducts()
    setProducts(response)
  }
  const onSelect = function (ev) {
    setSelect(ev.target.value)
  }
  const onHandler = function (ev) {
    setFilter(ev.target.value)
  }
  useEffect(() => {
    fetchProduct()
  }, [])
  useEffect(() => {
    setFilterProduct(
      products.filter((item) => {
        if (item.codigo == Number(filter)) return item
        if (item.descricao?.toLowerCase() == filter.toLowerCase()) return item
      })
    )
  }, [filter, products])
  useEffect(() => {
    if (select === false) setFilterProduct(products)
    setFilterProduct(
      products.filter((item) => {
        if (item.departamento?.toLowerCase() == select.toLowerCase())
          return item
      })
    )
  }, [select, products])

  return (
    <div id="products-page">
      <div>
        <button
          className="logout-button"
          style={{ padding: "5px", margin: "10px", cursor: "pointer" }}
          onClick={logOut}
        >
          Sair
          <IoPerson/>
        </button>

        <h1 style={{ textAlign: "center" }}>Lista de produtos</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center"
          }}
        >
          <label>Filtre Seu Produto</label>
          <input
            style={{ width: "30%" }}
            type="text"
            onChange={onHandler}
            placeholder="ex: Produto 1 ou por codigo ex 10"
          />
          <select onChange={onSelect}>
            <option value={false}>Nao filtrar</option>
            <option value="Eletrônicos">Eletrônicos</option>
            <option value="Roupas">Roupas</option>
          </select>
        </div>
      </div>

      <div id="container-list">
        {filterProduct != ""
          ? filterProduct.map((item, index) => (
              <OutherList item={item} index={index} key={index} />
            ))
          : products.map((item, index) => (
              <OutherList item={item} index={index} key={index} />
            ))}
      </div>
    </div>
  )
}
