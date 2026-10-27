import { useState } from 'react'
import './App.css'

import Great from './components/greet'
import Hello from './components/hello'
import Message from './components/Message'
import FunctionClick from './components/functionClick'
import UserGreeting from './components/userGreet'
import NameList from './components/nameList'
import HooksDemo from './components/HooksDemo'
import ReduxDemo from './latihan-redux/ReduxDemo'
import RoutingFetchDemo from './routing-fetch/RoutingFetchDemo'
import FormHandling from './components/FormHandling'

function App() {
  return (
    <div className='App' style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'left' }}>
      <h1>React Dasar & Modul Tambahan</h1>

      <section style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
        <h2>1 & 3. Greet (Component & Props)</h2>
        <Great name="Bruce" heroName="Batman">
          <p>This is children props</p>
        </Great>
        <Great name="Clark" heroName="Superman" />
      </section>

      <section style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
        <h2>2. Hello (JSX with React.createElement)</h2>
        <Hello />
      </section>

      <section style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
        <h2>4. Message (State)</h2>
        <Message />
      </section>

      <section style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
        <h2>5. Function Click (Event Handling)</h2>
        <FunctionClick />
      </section>

      <section style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
        <h2>6. User Greeting (Conditional Rendering)</h2>
        <UserGreeting />
      </section>

      <section style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
        <h2>7. Name List (Lists and Keys)</h2>
        <NameList />
      </section>

      <section style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
        <h2>8. Hooks (useState, useEffect, useContext, useRef, useMemo)</h2>
        <HooksDemo />
      </section>

      <section style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
        <h2>9. Context API & State Management Menggunakan Redux</h2>
        <ReduxDemo />
      </section>

      <section style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
        <h2>10. React Routing & API Fetching</h2>
        <RoutingFetchDemo />
      </section>

      <section style={{ margin: '20px 0', paddingBottom: '15px' }}>
        <h2>11. Form Handling & Validation</h2>
        <FormHandling />
      </section>
    </div>
  )
}

export default App
