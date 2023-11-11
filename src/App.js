import logo from './logo.svg';
import './App.css';
import { keys } from './data';
import { useState } from 'react';

function App() {

  const [input, setInput] = useState('0');

  const handleInput = (id, value) => {


    if (id === 'clear') {

      setInput('0');

    } else if (id === 'equals') {

      try {
        setInput(eval(input));
      } catch (error) {
        setInput('Error')
      }

    } else {

      if (value === 'x') {
        value = '*';
      }

      setInput(prev => {

        if (prev === '0') {
          return prev.slice(0, -1) + value;
        }

        prev = prev.toString();

        if (value === '.') {
          const lastPart = prev.split(/[\+\-\*\/]/).pop();
          if (lastPart.includes(value)) {
            return prev;
          }
        }

        if (['*', '/', '+'].includes(value)) {

          while (['*', '/', '+','-'].includes(prev.slice(-1))) {

            prev = prev.substring(0,prev.length-1);

          } 

          return prev + value;
          
        } else {

          return prev + value

        }

      }
      );

    }
  }


  return (
    <div className="App">

      <main>
        <section id='display'>
          {input}
        </section>

        <section className='box_wrapper'>

          {
            keys?.map(({ text, id }) => (
              <div onClick={() => handleInput(id, text)} className='box' id={id}>
                <span>{text}</span>
              </div>
            ))
          }

        </section>
      </main>
    </div>
  );
}

export default App;
