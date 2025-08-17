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

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);


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
            onDelete={() => removeTodo(index)}
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
    initial={{ scale: 0.9, opacity: 0, y: 20 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    exit={{ scale: 0.9, opacity: 0, y: 20 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="fixed bottom-24 right-6 p-5 rounded-3xl 
               bg-white/20 backdrop-blur-2xl border border-white/30 
               shadow-[0_8px_30px_rgba(0,0,0,0.2)] w-80"
  >
    {/* Heading */}
    <h3 className="text-white/90 text-lg font-semibold mb-3 text-center">
      New Task
    </h3>

    {/* Input */}
    <input
      type="text"
      placeholder="What’s on your mind?"
      value={formData.desc}
      onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
      className="w-full p-3 rounded-2xl bg-white/30 text-white placeholder-white/60 
                 focus:outline-none focus:ring-2 focus:ring-blue-400/70 transition"
    />

    {/* Color Selector */}
    <div className="flex justify-center gap-3 mt-4 mb-4">
      {[
        { name: "sky", value: "#38bdf8" },
        { name: "green", value: "#22c55e" },
        { name: "purple", value: "#a855f7" },
        { name: "pink", value: "#ec4899" },
        { name: "red", value: "#ef4444" },
        { name: "orange", value: "#f97316" }
      ].map((c) => (
        <motion.div
          key={c.name}
          onClick={() => setFormData({ ...formData, tagColor: c.value })}
          whileHover={{ scale: 1.15 }}
          className={`w-7 h-7 rounded-full cursor-pointer border-2 ${
            formData.tagColor === c.value ? "border-white" : "border-transparent"
          }`}
          style={{ backgroundColor: c.value }}
        />
      ))}
    </div>

    {/* Add Button */}
    <button
      onClick={addTodo}
      className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 
                 text-white font-semibold shadow-lg hover:opacity-90 transition"
    >
      Add Task
    </button>
  </motion.div>
)}

    </div>
  );
};

export default Foreground;
