import React, { useRef, useState, useEffect } from "react";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";
import { IoAdd } from "react-icons/io5";

const Foreground = () => {
  const ref = useRef(null);
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    desc: "",
    tagColor: "#38bdf8" // Default: Sky Blue
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add todo
  const addTodo = () => {
    if (!formData.desc.trim()) return;
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    setTodos([
      ...todos,
      {
        desc: formData.desc,
        filesize: formattedDate,
        close: true,
        tag: { isOpen: true, tagTitle: "Todo", tagColor: formData.tagColor },
        done: false
      }
    ]);
    setFormData({ desc: "", tagColor: "#38bdf8" });
    setShowForm(false);
  };

  // Mark done
  const markDone = (index) => {
    const updated = [...todos];
    updated[index].done = !updated[index].done;
    setTodos(updated);
  };

  // Remove todo
  const removeTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  return (
    <div
      ref={ref}
      className="fixed z-[3] top-0 left-0 w-full h-full flex gap-10 flex-wrap p-5 overflow-hidden"
    >
      {/* Cards */}
      <AnimatePresence>
        {todos.map((item, index) => (
          <Card
            key={index}
            data={item}
            reference={ref}
            onDone={() => markDone(index)}
            onRemove={() => removeTodo(index)}
          />
        ))}
      </AnimatePresence>

      {/* Plus Button */}
      <motion.button
        onClick={() => setShowForm(!showForm)}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl shadow-lg"
      >
        <IoAdd />
      </motion.button>

      {/* Minimal Form */}
      {showForm && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          className="fixed bottom-24 right-6 p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg w-72"
        >
          <input
            type="text"
            placeholder="What’s on your mind?"
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            className="w-full p-2 mb-3 rounded-lg bg-white/20 placeholder-white/60 text-white focus:outline-none"
          />

          {/* Color Selector */}
          <div className="flex gap-2 mb-3">
            {[
              { name: "sky", value: "#38bdf8" },    // Sky Blue
              { name: "green", value: "#22c55e" },  // Green
              { name: "purple", value: "#a855f7" }, // Purple
              { name: "pink", value: "#ec4899" },   // Pink
              { name: "red", value: "#ef4444" },    // Red
              { name: "orange", value: "#f97316" }  // Orange
            ].map((c) => (
              <div
                key={c.name}
                onClick={() => setFormData({ ...formData, tagColor: c.value })}
                className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                  formData.tagColor === c.value
                    ? "border-white"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>

          <button
            onClick={addTodo}
            className="w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Foreground;
