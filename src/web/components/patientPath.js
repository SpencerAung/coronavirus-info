import styled from '@emotion/styled'
import fetch from 'node-fetch'
import { useState, useEffect, useRef, useReducer } from 'react'
import { IoIosArrowDropdownCircle as ArrowDown, IoIosArrowDropupCircle as ArrowUp, IoIosArrowForward as ArrowNext, IoIosArrowBack as ArrowPrev } from 'react-icons/io'
import Spinner from './spinner'

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
    color: ${props => props.theme.colors.red};
  }

  .recovered {
    color: ${props => props.theme.colors.green};
  }
`
const PaginationWrapper = styled.div`
  margin-top: 20rem;
  text-align: center;


  button {
    padding: 8rem;
    margin: 0 10rem;
    color: ${props => props.theme.colors.purple};
    background-color: transparent;
    font-size: 30rem;
    text-align: center;
    border: none;

    &:disabled {
      color: ${props => props.theme.colors.offWhite};
    }
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

const initialState = { records: [], page: 1, isEnd: null }

function reducer (state, action) {
  switch (action.type) {
    case 'NEW_RECORDS':
      return { ...state, records: [...state.records, ...action.payload] }
    case 'NEXT_PAGE':
      return { ...state, page: state.page + 1 }
    case 'PREV_PAGE':
      return { ...state, page: state.page - 1 }
    case 'END_OF_RECORDS':
      return { ...state, isEnd: true }
    default:
      return state
  }
}

const PAGE_SIZE = 10
const fetchPatientRecords = async (pageSize = PAGE_SIZE, offset) => {
  const url = offset ? `/api/myanmar-patients?offset=${offset}&pageSize=${pageSize}` : `/api/myanmar-patients?pageSize=${pageSize}`
  const fetched = await fetch(url)
  const result = await fetched.json()

  return result
}

const PatientPath = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const pageOffset = useRef(null)

  const handleNextButtonClick = () => {
    if (!state.isEnd) {
      fetchRecords()
    }

    dispatch({ type: 'NEXT_PAGE' })
  }
  const handlePrevButtonClick = () => dispatch({ type: 'PREV_PAGE' })
  const fetchRecords = async () => {
    const { records, offset } = await fetchPatientRecords(PAGE_SIZE, pageOffset.current)

    pageOffset.current = offset

    dispatch({ type: 'NEW_RECORDS', payload: records })

    if (!offset) {
      dispatch({ type: 'END_OF_RECORDS' })
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  const { records, isEnd, page } = state
  const start = PAGE_SIZE * (page - 1)
  const patients = records.slice(start, start + PAGE_SIZE)
  const isLastPage = isEnd && records.length <= page * PAGE_SIZE

  return (
    <div style={{ marginBottom: '80px' }}>
      <h1 className='mm-font'>ပိုးတွေ့လူနာများ</h1>
      {!patients.length && <Spinner />}
      {patients.map(patient => <PatientItem key={patient.id} {...patient} />)}
      <PaginationWrapper>
        <button disabled={page <= 1} onClick={handlePrevButtonClick}><ArrowPrev /></button>
        <button disabled={isLastPage} onClick={handleNextButtonClick}><ArrowNext /></button>
      </PaginationWrapper>
    </div>
  )
}

export default PatientPath
