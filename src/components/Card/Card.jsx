import personImg from '../../assets/man-person-icon.png';
import placeholderImg from '../../assets/image-placeholder.png';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { BiPhoneCall } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr';
import { FiTruck } from 'react-icons/fi';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { useState } from 'react';

export const Card = ({ displayName, phone, category, covered, imgUrl, additionalInfo, id, profileImgUrl, location }) => {
  const [sideState, setSideState] = useState(true);
  console.log(covered)

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
              <img className="person-img" src={profileImgUrl ? profileImgUrl : personImg} alt="" />
            </div>
            <div className="card-row">
              {/* <span>Telefone:</span> */}
              <BiPhoneCall size="1.25rem" />
              <span>{phone}</span>
            </div>
            <div className="card-row">
              {/* <span>Localização:</span> */}
              <GrLocation size="1.25rem" />
              <span>{location}</span>
            </div>
            <div className="card-row">
              {/* <span>Tamanho do veículo:</span> */}
              <FiTruck size="1.25rem" />
              <span>{category}</span>
            </div>
            <div className="card-row">
              {/* <span>É coberto:</span> */}
              {
                covered === "Coberto" ?
                <AiOutlineCheckCircle size="1.25rem" /> :
                <AiOutlineCloseCircle size="1.25rem" />
              }
              <span>{covered}</span>
            </div>
          </div>
        </> :
        <>
          <div className="card-img-wrapper">
            <img className="card-img" src={imgUrl ? imgUrl : placeholderImg} alt="" />
          </div>
          <div className="b-side">
            <div className="card-row">
              <span>Informações adicionais:</span>
              <textarea readOnly value={additionalInfo}></textarea>
            </div>
          </div>
        </>
      }
      <BsArrowCounterclockwise 
        onClick={() => setSideState(current => !current)} 
        size="1.5rem" 
        id="svg-turn"
      />
    </div>
  )
}