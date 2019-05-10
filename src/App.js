import React ,{ Component } from 'react';

import './App.css';
import ToDo from "./todo";
import styled, { css } from 'styled-components'

const StyledApp = styled.div`
  padding: 75px 0;
  & > * {
    margin: 0 auto;
    width: 300px;
    min-height: 500px;
    box-sizing: border-box;
  }
`;

class App extends Component {
    render() {
        return (
            <StyledApp className="App">
                <ToDo/>
            </StyledApp>
        );
    }
}

export default App;