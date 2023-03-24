import { useState } from "react";

type ICard = number[][];

type ICardPosition = {
  row: number;
  column: number;
  cardNumber: number;
};

const cards: ICard = [
  [1, 2, 3, 4],
  [1, 2, 3, 4],
  [5, 5, 6, 6],
  [7, 7, 8, 8],
];

export function Game(): JSX.Element {
  const [revealedCards, setRevealedCards] = useState<ICardPosition[]>([]);
  const [wasPlayerWin, setWasPlayerWin] = useState<boolean>(false);

  const [matchedCardsNumber, setMatchedCardsNumber] = useState<number[]>([]);

  function playerWon() {}

  function matchCards(firstCard: ICardPosition, secondCard: ICardPosition) {
    if (firstCard.cardNumber !== secondCard.cardNumber) return;

    setMatchedCardsNumber(prevMatchedCards => {
      return [...prevMatchedCards, firstCard.cardNumber];
    });

    playerWon();
  }

  function onCardClick(cardPosition: ICardPosition) {
    let cardsToBeRevealed = [];

    if (revealedCards.length === 2 || revealedCards.length === 0) {
      cardsToBeRevealed = [cardPosition];
    } else {
      cardsToBeRevealed = [...revealedCards, cardPosition];

      matchCards(cardsToBeRevealed[0], cardsToBeRevealed[1]);
    }

    setRevealedCards(cardsToBeRevealed);
  }

  function isRevealedCard({ row, column, cardNumber }: ICardPosition) {
    if (matchedCardsNumber.includes(cardNumber)) return true;

    let isRevealed = false;

    if (revealedCards.length > 0) {
      isRevealed = !!revealedCards.find(
        card => card.column === column && card.row === row
      );
    }

    return isRevealed;
  }

  return (
    <div className="grid gap-2 grid-cols-4 grid-rows-4 w-full h-full">
      {cards.map((row, rowIndex) => {
        return row.map((cardNumber, columnIndex) => {
          return (
            <button
              key={`card_${rowIndex}_${columnIndex}`}
              className="bg-slate-300 rounded grid place-items-center text-2xl hover:bg-slate-400"
              onClick={() =>
                onCardClick({ row: rowIndex, column: columnIndex, cardNumber })
              }
            >
              {isRevealedCard({
                row: rowIndex,
                column: columnIndex,
                cardNumber: cardNumber,
              })
                ? cardNumber
                : ""}
            </button>
          );
        });
      })}
    </div>
  );
}
