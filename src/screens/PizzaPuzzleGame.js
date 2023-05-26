import React, { useState } from "react";

const PizzaPuzzleGame = () => {
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [puzzlePieces, setPuzzlePieces] = useState([
    { id: 1, imageUrl: "puzzle-piece-1.jpg" },
    { id: 2, imageUrl: "puzzle-piece-2.jpg" },
    { id: 3, imageUrl: "puzzle-piece-3.jpg" },
    { id: 4, imageUrl: "puzzle-piece-4.jpg" },
  ]);

  const handleDragStart = (event, pieceId) => {
    event.dataTransfer.setData("text/plain", pieceId);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const pieceId = event.dataTransfer.getData("text/plain");
    const pieceIndex = puzzlePieces.findIndex((piece) => piece.id === parseInt(pieceId));
    if (pieceIndex !== -1) {
      const updatedPuzzlePieces = [...puzzlePieces];
      updatedPuzzlePieces.splice(pieceIndex, 1);
      setPuzzlePieces(updatedPuzzlePieces);
      if (updatedPuzzlePieces.length === 0) {
        setPuzzleSolved(true);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="col-lg-12 mt-4">
      {!puzzleSolved ? (
        <div className="puzzle-container" onDrop={handleDrop} onDragOver={handleDragOver}>
          {puzzlePieces.map((piece) => (
            <img
              key={piece.id}
              src={piece.imageUrl}
              alt={`Puzzle Piece ${piece.id}`}
              className="puzzle-piece"
              draggable
              onDragStart={(event) => handleDragStart(event, piece.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h5>Puzzle Solved!</h5>
          <button className="btn btn-hover" onClick={checkOutHandler}>
            Bill out
          </button>
        </div>
      )}
    </div>
  );
};

export default PizzaPuzzleGame;
