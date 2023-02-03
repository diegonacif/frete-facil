import personImg from '../../assets/man-person-icon.png';

export const Card = () => {
  return (
    <div className="card-container">
      <div className="card-row">
        <img src={personImg} alt="" />
        <span> João da Silva</span>
      </div>
      <div className="card-row">
        <span>Telefone: </span>
        <span>(84) 991751414</span>
      </div>
      <div className="card-row">
        <span>Tamanho do veículo: </span>
        <span>Médio</span>
      </div>
      <div className="card-row">
        <span>É coberto: </span>
        <span>Não</span>
      </div>
    </div>
  )
}