import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.decodeGTIN = this.decodeGTIN.bind(this);
    this.state = { result: 'Enter Your Code first to see the result' };
  }

  START = "]d2";
  GS = "<GS>";

  MAP = {
    "01": 16,
    "02": 16,
    "03": 16,
    "17": 8,
  }

  handleChange(e) {
    const input = e.target.value;
    console.log(input);

    // Basic Validation
    if (input.length < 7) {
      this.setState({ result: "at least 7 digit is acceptable " });
    } else {

      if (input.indexOf(this.START) !== 0) {
        this.setState({ result: "ERROR 1 : Invalid Code , Code must start with ']d2' " });
      } else {
        // start a recursive procedure of decoding the string  ....
        this.decodeGTIN(input);
      }
    }
  }

  decodeGTIN(input) {
    const code = input.replace(this.START, '');
    const startCode = code.substring(0, 2);
    console.log(startCode);

    const length = this.MAP[startCode]
    console.log(length);

    if (length) {
      let ourCode = code.substring(0, length + 1);
      if (ourCode.indexOf(this.GS) > -1) {
        this.setState({ result: `Invalid Code Code Contain Invalid ${this.GS}` });
      }
      else if (ourCode.length === 16) {
        let c = ourCode.substring(2);
        this.setState({ result: `OK,OK . Your Code is Valid  '${c}'` });
      } else if (ourCode.length === 8) {
        let c = ourCode.substring(2);
        let d = c.substring(0);
        let m = ourCode.substring(2);
        let y = ourCode.substring(4);
        this.setState({ result: `OK,OK . Expire Date is  :  '${d} - ${m} - ${y}'` });
      }
    } else {
      console.log('GOING to process 22');
      if (code.indexOf(this.GS) > -1) {
        const c = code.split(this.GS)[0];
        if (c) {
          this.setState({ result: `OK,OK . Your Code is Valid  '${c}'` });
        } else {
          if (code.length === 14) {
            this.setState({ result: `OK,OK . Your Code is Valid  '${code}'` });
          } else {
            this.setState({ result: `Invalid Code ` });
          }
        }
      } else {
        this.setState({ result: `Not a Valid Code ` });
      }
    }
  }




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Enter the Code to Desode
          </p>
          <input autoFocus onChange={this.handleChange} type="text" />
          <p>{this.state.result}</p>
        </header>
      </div>
    );
  }
}

export default App;
