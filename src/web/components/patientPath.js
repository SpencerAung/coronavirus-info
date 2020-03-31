import styled from '@emotion/styled'
import { useState } from 'react'
import { IoIosArrowDropdownCircle as ArrowDown, IoIosArrowDropupCircle as ArrowUp } from 'react-icons/io'

import useApi from '../hooks/useApi'

const PatientWrapper = styled.div`
  padding: 10rem;
  border-bottom: 1px solid ${props => props.theme.colors.offWhite};
`
const PatientTitle = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: 1.12em;

  svg {
    color: ${props => props.theme.colors.lightPurple};
  }

  .patient-id {
    color: ${props => props.theme.colors.offWhite};
  }

  .dead {
    color: ${props => props.theme.colors.pink};
  }

  .recovered {
    color: ${props => props.theme.colors.green};
  }
`

const PatientItem = ({ patientId, status, nationality, age, gender, notes, hospital, state, city }) => {
  const [isFold, fold] = useState(true)
  const notesArr = notes.split('\n')
  const pId = patientId > 9 ? patientId : `0${patientId}`
  let className
  if (status === 'dead') {
    className = 'dead'
  } else if (status === 'recovered') {
    className = 'recovered'
  }

  return (
    <PatientWrapper className='mm-font'>
      <PatientTitle onClick={() => fold(!isFold)}>
        <div className={className}>
          <span className='patient-id'>{pId}</span> {gender} . {age} နှစ် . {state}
        </div>
        <div>
          {isFold ? <ArrowDown /> : <ArrowUp />}
        </div>
      </PatientTitle>
      {!isFold && (
        <ul>
          {notesArr.map(note => (<li key={note}>{note}</li>))}
        </ul>
      )}
    </PatientWrapper>
  )
}

const PatientPath = () => {
  const patients = useApi('/api/myanmar-patients', [])
  console.log(patients)

  return (
    <div style={{ marginBottom: '80px' }}>
      <h1 className='mm-font'>ပိုးတွေ့လူနာများ</h1>
      {patients.map(patient => <PatientItem key={patient.id} {...patient} />)}
    </div>
  )
}

export default PatientPath
