import styled from '@emotion/styled'

export const Wrapper = styled.div`
 width: 500px;
 margin: 0 auto;

  @media (max-width: 420px) {
    width: 100%;
    max-width: 355px;
  }
`

export const NoteWrapper = styled.div`
  width: 450px;
  margin: 0 auto;

  @media (max-width: 420px) {
    width: 100%;
  }
`

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Card = styled.div`
  width: 200px;
  padding: 20rem;
  text-align: center;

  .label {
    font-size: 14rem;
    font-weight: 200;
    margin-bottom: 8rem;
    color: #72757e;
  }

  .number {
    font-size: 35rem;
  }

  .info {
    color: ${props => props.theme.colors.black};
  }

  .danger {
    color: ${props => props.theme.colors.red};
  }

  .highlight {
    color: ${props => props.theme.colors.green};
  }
`
