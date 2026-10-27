import { useState } from 'react'
import './App.css'
import Great from './components/greet'
import Hello from './components/hello'
import Message from './components/Message'
import FunctionClick from './components/functionClick'
import UserGreeting from './components/userGreet'
import NameList from './components/nameList'

function App() {
  return (
    <div className='App'>
      {/* 1 & 3. Functional Component & Props */}
      <section style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
        <h2>1 & 3. Greet (Component & Props)</h2>
        <Great name="Bruce" heroName="Batman">
          <p>This is children props</p>
        </Great>
        <Great name="Clark" heroName="Superman" />
      </section>

      {/* 2. JSX with React.createElement */}
      <section style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
        <h2>2. Hello (JSX with React.createElement)</h2>
        <Hello />
      </section>

      {/* 4. State (Class Component) */}
      <section style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
        <h2>4. Message (State)</h2>
        <Message />
      </section>

      {/* 5. Event Handling */}
      <section style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
        <h2>5. Function Click (Event Handling)</h2>
        <FunctionClick />
      </section>

      {/* 6. Conditional Rendering */}
      <section style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
        <h2>6. User Greeting (Conditional Rendering)</h2>
        <UserGreeting />
      </section>

      {/* 7. List and Keys */}
      <section style={{ margin: '20px 0', paddingBottom: '15px' }}>
        <h2>7. Name List (Lists and Keys)</h2>
        <NameList />
      </section>
    </div>
  )
}

export default App
