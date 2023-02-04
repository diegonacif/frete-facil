import personImg from '../../assets/man-person-icon.png';
import placeholderImg from '../../assets/image-placeholder.png';

export const Card = ({ displayName, phone, category, covered }) => {
  return (
    <div className="card-container">
      <div className="card-img-wrapper">
        <img className="card-img" src={placeholderImg} alt="" />
      </div>
      <div className="card-info-wrapper">
        <div className="card-row">
          <span>{displayName}</span>
          <img className="person-img" src={personImg} alt="" />
        </div>
        <div className="card-row">
          <span>Telefone:</span>
          <span>{phone}</span>
        </div>
        <div className="card-row">
          <span>Tamanho do veículo:</span>
          <span>{category}</span>
        </div>
        <div className="card-row">
          <span>É coberto:</span>
          <span>{covered}</span>
        </div>
        <div className="card-row">
          <span>Outras informações:</span>
          <span>blah</span>
        </div>
      </div>
    </div>
  )
}