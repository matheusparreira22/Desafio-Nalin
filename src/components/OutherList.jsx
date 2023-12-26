import PropTypes from "prop-types"

const styleDepartament = {
    background: 'white',
    color: 'red',
}

export default function OutherList({ item, index }) {
    return (
        <>
            <div className='lista' key={index}>
                <div>
                    <img src="nalin-logo.png" height={'30px'} alt="" />
                </div>
                <h4>{item.descricao}</h4>
                <small style={styleDepartament}>{item.departamento}</small>
                <small>Código: {item.codigo}</small>
                <p style={{backgroundColor: 'black', padding: '2px'}}>R$:{item.valor}</p>
            </div>

        </>
    )
}

OutherList.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number
}