import { useState } from "react";

type ICard = number[][];

type ICardPosition = {
  row: number;
  column: number;
};

export function Game(): JSX.Element {
  const [cards, setCards] = useState<ICard>([
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [5, 5, 6, 6],
    [7, 7, 8, 8],
  ]);

  const [revealedCards, setRevealedCards] = useState<ICardPosition[]>([]);

  function onCardClick(cardPosition: ICardPosition) {
    setRevealedCards(prevRevealed => {
      if (prevRevealed.length === 2) return [cardPosition];

      return [...prevRevealed, cardPosition];
    });
  }

  return (
    <div className="grid gap-2 grid-cols-4 grid-rows-4 w-full h-full">
      {cards.map((row, rowIndex) => {
        return row.map((cardNumber, columnIndex) => {
          console.log("🚀 ~ revealedCards:", revealedCards);

          const isRevealedCard =
            revealedCards.length > 0
              ? revealedCards.find(
                  card => card.column === columnIndex && card.row === rowIndex
                )
              : false;

          return (
            <button
              key={`card_${rowIndex}_${columnIndex}`}
              className="bg-slate-300 rounded grid place-items-center text-2xl hover:bg-slate-400"
              onClick={() =>
                onCardClick({ row: rowIndex, column: columnIndex })
              }
            >
              {/* {cardNumber} */}
              {isRevealedCard ? cardNumber : ""}
            </button>
          );
        });
      })}
    </div>
  );
}
