import personImg from '../../assets/man-person-icon.png';
import placeholderImg from '../../assets/image-placeholder.png';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { useState } from 'react';

export const Card = ({ displayName, phone, category, covered, imgUrl }) => {
  const [sideState, setSideState] = useState(true);
  console.log(imgUrl ? true : false);

  return (
    <div className="card-container">
      {
        sideState ?
        <>
          <div className="card-img-wrapper">
            <img className="card-img" src={imgUrl ? imgUrl : placeholderImg} alt="" />
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
          </div>
        </> :
        <>
          <div className="card-img-wrapper">
            <img className="card-img" src={placeholderImg} alt="" />
          </div>
          <div className="b-side">
            <div className="card-row">
              <span>Informações adicionais:</span>
              <textarea readOnly>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sint in voluptas rerum doloremque quisquam tempora, voluptate porro provident nemo id quidem, earum quis ea, labore modi ipsum non ad?</textarea>
            </div>
          </div>
        </>
      }
      <BsArrowCounterclockwise onClick={() => setSideState(current => !current)}size="1.5rem" />
    </div>
  )
}