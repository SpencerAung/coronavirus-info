import styled from '@emotion/styled'

export const TableWrapper = styled.div`
  width: 450px;
  margin: 0 auto;

  @media (max-width: 420px) {
    width: 100%;
    max-width: 355px;
  }
`

export const HeaderTable = styled.table`
  width: 100%;
  margin: auto;
  border: none;
  outline: none;
  border-collapse: collapse;

  tbody {
    display: none;
  }

  th, td {
    padding: 8rem;
    text-align: right;

    @media (max-width: 420px) {
      padding: 8rem 5rem;
    }
  }

  th.country-col,
  td.country-col {
    text-align: left;
    width: 202px;

    @media (max-width: 420px) {
      width: 110px;
      max-width: 110px;
    }
  }

  th.confirmed-col,
  td.confirmed-col {
    width: 77px;
  }

  th.recovered-col,
  td.recovered-col {
    width: 77px;
  }

  th.deaths-col,
  td.deaths-col {
    width: 60px;
  }

  th.action-col,
  td.action-col {
    text-align: center;
    width: 40px;
  }

  th.action-col {
  }

  th {
    background-color: #d1d1e9;
    font-weight: 200;
    font-size: 13rem;
  }

  td {
    border: 1px solid ${props => props.theme.colors.washedWhite};
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  td.zero-case {
    color: ${props => props.theme.colors.offWhite};
    font-weight: 200;
  }

  span.change {
    font-size: 11rem;
  }

  span.danger {
    color: ${props => props.theme.colors.red};
  }

  span.highlight {
    color: ${props => props.theme.colors.green};
  }
`

export const DataTable = styled(HeaderTable)`
  thead {
    display: none;
  }

  tbody {
    display: block;
    max-height: 500px;
    overflow-y: scroll;
    position: relative;
  }

  td.action-col {
    padding-right: 0;
  }
`

export const SearchInput = styled.input`
  width: 100%;
  margin-bottom: 10rem;
  padding: 8rem;
  border: 1px solid ${props => props.theme.colors.lightPurple};
`

export const BookmarkButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0;
  color: ${props => props.active ? props.theme.colors.purple : props.theme.colors.offWhite};
  opacity: 0.4;
  font-size: 25rem;
  text-align: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`

export const BookmarkSwitchButton = styled(BookmarkButton)`
  color: #fff;
  opacity: ${props => props.active ? 1 : 0.5};
`
