import "../objetos.css";
import React, { useEffect, useState } from "react";
import TableroMemoria from "./TableroMemoria.js";
const emojiList = [
  "⚡",
  "🍕",
  "🍰",
  "🎈",
  "🏈",
  "🐹",
  "🐮",
  "🐷",
  "🐬",
  "🐟",
  "🍉",
  "🍎",
  "🍒",
  "🍓",
];

const Memoria = () => {
  const [shuffledMemoBlocks, setShuffleMemoBlocks] = useState([]);
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
    setShuffleMemoBlocks(
      shuffledEmojiList.map((emoji, i) => ({ index: i, emoji, flipped: false }))
    );
  }, []);
  const listaEmojis = () => {
    for (let i = 0; i < 8; i++) {
      emojiList.splice(Math.floor(Math.random() * emojiList.length), 1);
    }
  };
  listaEmojis();
  const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const handleMemoClick = (memoBlock) => {
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffleMemoBlocks(shuffledMemoBlocksCopy);
    if (selectedMemoBlock === null) {
      setSelectedMemoBlock(memoBlock);
    } else if (selectedMemoBlock.emoji === memoBlock.emoji) {
      setSelectedMemoBlock(null);
    } else {
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(
          selectedMemoBlock.index,
          1,
          selectedMemoBlock
        );
        setShuffleMemoBlocks(shuffledMemoBlocksCopy);
        setSelectedMemoBlock(null);
        setAnimating(false);
      }, 1500);
    }
  };

  return (
    <TableroMemoria
      memoBlocks={shuffledMemoBlocks}
      animating={animating}
      handleMemoClick={handleMemoClick}
    />
  );
};

export default Memoria;
