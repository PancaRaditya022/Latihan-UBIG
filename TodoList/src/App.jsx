import { useState, useEffect, useContext, useMemo, createContext } from 'react';

const ThemeContext = createContext();

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div
        style={{
          background: darkMode ? '#1e1e2e' : '#f4f4f9',
          color: darkMode ? '#cdd6f4' : '#333333',
          minHeight: '100vh',
          padding: '40px 20px',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          display: 'flex',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: '520px',
          background: darkMode ? '#181825' : '#ffffff',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <ThemeToggle />
          <TodoList />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        padding: '8px 16px',
        borderRadius: '6px',
        border: 'none',
        background: darkMode ? '#45475a' : '#e0e0e0',
        color: darkMode ? '#fff' : '#333',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '600'
      }}
    >
      {darkMode ? 'Mode Terang' : 'Mode Gelap'}
    </button>
  );
}

function TodoList() {
  const { darkMode } = useContext(ThemeContext);

  // Lazy initialization
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('data_todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    localStorage.setItem('data_todos', JSON.stringify(todos));
  }, [todos]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  const filteredTodos = useMemo(() => {
    if (filter === "completed") return todos.filter((t) => t.completed);
    if (filter === "active") return todos.filter((t) => !t.completed);
    return todos;
  }, [todos, filter]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id, e) => {
    e.stopPropagation();
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (todo, e) => {
    e.stopPropagation();
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = (id, e) => {
    e.preventDefault();
    if (!editingText.trim()) return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = (e) => {
    e.stopPropagation();
    setEditingId(null);
    setEditingText("");
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = darkMode ? '#58a6ff' : '#007bff';
    e.target.style.boxShadow = darkMode
      ? '0 0 0 3px rgba(88, 166, 255, 0.25)'
      : '0 0 0 3px rgba(0, 123, 255, 0.25)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = darkMode ? '#44445a' : '#ccc';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span>To-Do List</span>
      </h2>

      <form onSubmit={addTodo} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tambah tugas baru..."
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            flex: 1,
            padding: '10px 12px',
            borderRadius: '6px',
            border: darkMode ? '1px solid #44445a' : '1px solid #ccc',
            outline: 'none',
            fontSize: '14px',
            background: darkMode ? '#2a2a3c' : '#fff',
            color: darkMode ? '#fff' : '#333',
            transition: 'border-color 0.2s, box-shadow 0.2s'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 16px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Tambah
        </button>
      </form>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        {['all', 'active', 'completed'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: filter === type ? '#007bff' : '#8882',
              color: filter === type ? '#fff' : 'inherit',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'capitalize'
            }}
          >
            {type === 'all' ? 'Semua' : type === 'active' ? 'Belum Selesai' : 'Selesai'}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filteredTodos.map((todo) => {
          const textColor = todo.completed
            ? '#28a745'
            : darkMode
            ? '#cdd6f4'
            : '#333333';

          return (
            <li
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              style={{
                padding: '12px',
                marginBottom: '8px',
                borderRadius: '6px',
                backgroundColor: '#8881',
                color: textColor,
                opacity: todo.completed ? 0.8 : 1,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background 0.2s',
                gap: '10px'
              }}
            >
              {editingId === todo.id ? (
                <form
                  onSubmit={(e) => saveEdit(todo.id, e)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ display: 'flex', gap: '6px', flex: 1 }}
                >
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      borderRadius: '4px',
                      border: darkMode ? '1px solid #44445a' : '1px solid #ccc',
                      outline: 'none',
                      fontSize: '14px',
                      background: darkMode ? '#2a2a3c' : '#fff',
                      color: darkMode ? '#fff' : '#333',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    autoFocus
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '6px 12px',
                      borderRadius: '4px',
                      border: 'none',
                      background: '#28a745',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '4px',
                      border: 'none',
                      background: '#6c757d',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Batal
                  </button>
                </form>
              ) : (
                <>
                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', flex: 1 }}>
                    {todo.text}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '11px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      backgroundColor: todo.completed ? '#28a74522' : '#ffc10722',
                      color: todo.completed ? '#28a745' : '#ffc107'
                    }}>
                      {todo.completed ? 'Selesai' : 'Belum Selesai'}
                    </span>

                    <button
                      onClick={(e) => startEdit(todo, e)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: 'none',
                        background: '#ffc107',
                        color: '#000',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => deleteTodo(todo.id, e)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: 'none',
                        background: '#dc3545',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
