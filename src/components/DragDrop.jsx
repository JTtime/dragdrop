import React, { useState, useRef } from "react";

function DragDropList() {
  const [items, setItems] = useState([
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
  ]);

  // Refs to track dragged item and drag-over item indices
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // State to highlight the currently dragged item
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, position) => {
    console.log("drag start event:", position);
    dragItem.current = position;
    setDraggingIndex(position);
  };

  const handleDragEnter = (e, position) => {
    console.log("handle drag enter:", position);
    dragOverItem.current = position;
    setDragOverIndex(position);
  };

  const handleDragOver = (e) => {
    console.log("handle drag over:");
    e.preventDefault(); // Necessary to allow drop
  };

  const handleDrop = (e) => {
    console.log(
      "handle drop",
      "dragoverItem:",
      dragOverItem.current,
      "draggedItem:",
      dragItem.current
    );
    // setDragOverIndex(null);
    e.preventDefault();

    const listCopy = [...items];
    const draggedItemContent = listCopy[dragItem.current];

    // Remove dragged item
    listCopy.splice(dragItem.current, 1);
    // Insert dragged item at new position
    listCopy.splice(dragOverItem.current, 0, draggedItemContent);

    // Reset refs and dragging state
    dragItem.current = null;
    dragOverItem.current = null;
    setDraggingIndex(null);

    setItems(listCopy);
  };

  const handleDragEnd = (e) => {
    console.log("drag ended", dragItem.current, dragOverItem.current);
    // Clean up refs and state in case drop was canceled or outside target
    dragItem.current = null;
    dragOverItem.current = null;
    setDraggingIndex(null);
    setTimeout(() => {
      setDragOverIndex(null);
    }, 2000);
  };

  return (
    <div>
      <h2>Drag and Drop List (No libraries)</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            style={{
              padding: "8px",
              margin: "4px 0",
              backgroundColor:
                dragOverIndex === index
                  ? "#0E59A9"
                  : draggingIndex === index
                  ? "#d1e7fd"
                  : "#f0f0f0",
              border: "1px solid #ccc",
              cursor: "move",
              userSelect: "none",
              transition: "background-color 2s ease",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DragDropList;
