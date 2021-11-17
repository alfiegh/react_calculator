import './App.css';
import React, { useState } from 'react';

function App() {
  const [expression, setExpression] = useState('');
  const [answer, setAnswer] = useState(expression);

  function display(symbol) {
    setExpression(prevValue => {
      if (
        /[+*-/]/.test(symbol) &&
        /[+*-/]/.test(prevValue[prevValue.length - 1])
      ) {
        let newValue;
        if (/[-]/.test(symbol)) {
          newValue = prevValue.slice(0, prevValue.length) + symbol;
        } else {
          let count = 0;
          for (let i = 0; i < prevValue.length; i++) {
            if (isNaN(+prevValue[i])) {
              count++;
            } else {
              count = 0;
            }
          }
          newValue = prevValue.slice(0, prevValue.length - count) + symbol;
        }

        setExpression(newValue);
      } else {
        if (prevValue) {
          prevValue = prevValue + '';
          let valArr = prevValue.split(/[+/*-]/g);
          // console.log('valArr ' + JSON.stringify(valArr));
          let lastNumber = valArr[valArr.length - 1];
          if (!isNaN(lastNumber) && /[.]/.test(lastNumber) && symbol === '.') {
            console.log('symbol = empty ');
            symbol = '';
          }
        }

        setExpression(
          (prevValue + symbol).replace(/^0/g, '').replace(/\.+/g, '.')
        );
      }
    });

    setAnswer(prevValue =>
      (prevValue + symbol).replace(/^0/g, '').replace(/\.+/g, '.')
    );
  }

  function calculate() {
    setAnswer(eval(expression));
    setExpression(eval(expression));
  }
  function allClear() {
    setExpression('');
    setAnswer(0);
  }
  function clear() {
    setExpression(prev => {
      setAnswer(0);
      prev = prev + '';
      return prev
        .split('')
        .slice(0, prev.length - 1)
        .join('');
    });
  }

  return (
    <div className="container">
      <div className="grid">
        <div className="dis">
          <input
            // class="expression"
            value={expression}
            placeholder="0"
            disabled
          />
          <input
            id="display"
            className="answer"
            disabled
            value={answer}
          ></input>
        </div>
        <div
          onClick={allClear}
          className="padButton AC"
          id="allClear"
          id="clear"
        >
          AC
        </div>
        <div onClick={clear} className="padButton C">
          C
        </div>
        <div
          onClick={() => display('/')}
          className="padButton operators"
          id="divide"
        >
          /
        </div>
        <div
          onClick={() => display('*')}
          className="padButton operators"
          id="multiply"
        >
          *
        </div>
        <div onClick={() => display('7')} className="padButton" id="seven">
          7
        </div>
        <div onClick={() => display('8')} className="padButton" id="eight">
          8
        </div>
        <div onClick={() => display('9')} className="padButton" id="nine">
          9
        </div>
        <div
          onClick={() => display('-')}
          className="padButton operators"
          id="subtract"
        >
          -
        </div>
        <div onClick={() => display('4')} className="padButton" id="four">
          4
        </div>
        <div onClick={() => display('5')} className="padButton" id="five">
          5
        </div>
        <div onClick={() => display('6')} className="padButton" id="six">
          6
        </div>
        <div
          onClick={() => display('+')}
          className="padButton operators"
          id="add"
        >
          +
        </div>
        <div onClick={() => display('1')} className="padButton" id="one">
          1
        </div>
        <div onClick={() => display('2')} className="padButton" id="two">
          2
        </div>
        <div onClick={() => display('3')} className="padButton" id="three">
          3
        </div>
        <div onClick={calculate} className="padButton operators" id="equals">
          =
        </div>
        <div onClick={() => display('0')} className="padButton" id="zero">
          0
        </div>
        <div onClick={() => display('.')} className="padButton" id="decimal">
          .
        </div>
      </div>
    </div>
  );
}

export default App;
