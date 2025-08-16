import React from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";

const Card = ({ data, reference, onDone, onDelete }) => {
  const isDone = data.done;

  return (
    <motion.div
      drag
      whileDrag={{ scale: 1.05 }}
      whileHover={{ scale: 1.03, y: -5 }}
      dragConstraints={reference}
      className={`relative flex-shrink-0 w-64 h-80 p-6 rounded-3xl backdrop-blur-xl border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out`}
      style={{
        backgroundColor: isDone ? "rgba(107,114,128,0.3)" : "rgba(255,255,255,0.1)",
        opacity: isDone ? 0.6 : 1
      }}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 text-white shadow-inner">
        <FaRegFileAlt size={20} />
      </div>

      {/* Description */}
      <p className="text-sm text-white/90 leading-tight mt-5 font-medium">
        {data.desc}
      </p>

      {/* Date */}
      <p className="text-[0.7rem] text-white/50 mt-2">
        {data.date}
      </p>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="flex items-center px-6 justify-between py-4">
          <h5 className="text-white/70 text-xs">{data.filesize}</h5>
          
          <div className="flex gap-2">
            {/* Done Button */}
            {!isDone && (
              <span
                onClick={onDone}
                className="w-8 h-8 bg-green-500/70 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-green-500 transition"
              >
                ✓
              </span>
            )}

            {/* Delete Button */}
            <span
              onClick={onDelete}
              className="w-8 h-8 bg-red-500/70 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 transition"
            >
              <IoIosClose size={18} />
            </span>
          </div>
        </div>

        {/* Tag */}
        {data.tag.isOpen && (
          <div
            className="tag w-full py-3 flex items-center justify-center text-white text-sm font-semibold tracking-wide backdrop-blur-md rounded-b-3xl"
            style={{
              backgroundColor: data.tag.tagColor,
              opacity: 0.85
            }}
          >
            {data.tag.tagTitle}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
