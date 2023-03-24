import { useState } from "react";
import classNames from "classnames";

type ICard = number[][];

type ICardPosition = {
  row: number;
  column: number;
  cardNumber: number;
};

const CARDS: ICard = [
  [1, 2, 3, 4],
  [1, 2, 3, 4],
  [5, 5, 6, 6],
  [7, 7, 8, 8],
];

export function Game(): JSX.Element {
  const [revealedCards, setRevealedCards] = useState<ICardPosition[]>([]);
  const [wasPlayerWin, setWasPlayerWin] = useState<boolean>(false);

  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  function playerWon() {
    const totalCardsMatched = matchedCards.length + 1;

    const totalCardsInGame = CARDS.reduce((accumulator, cardNumber) => {
      return accumulator + cardNumber.length;
    }, 0);

    const individualCardsInGame = totalCardsInGame / 2;

    setWasPlayerWin(totalCardsMatched === individualCardsInGame);
  }

  function matchCards(firstCard: ICardPosition, secondCard: ICardPosition) {
    if (firstCard.cardNumber !== secondCard.cardNumber) return;

    setMatchedCards(prevMatchedCards => {
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
    if (matchedCards.includes(cardNumber)) return true;

    let isRevealed = false;

    if (revealedCards.length > 0) {
      isRevealed = !!revealedCards.find(
        card => card.column === column && card.row === row
      );
    }

    return isRevealed;
  }

  function resetGame() {
    setRevealedCards([]);
    setWasPlayerWin(false);
    setMatchedCards([]);
  }

  return (
    <>
      {wasPlayerWin ? (
        <div className="grid place-items-center w-full h-full">
          <h1 className="text-6xl text-slate-50">Congratulations</h1>
          <button className="text-slate-50" onClick={resetGame}>
            Play again?
          </button>
        </div>
      ) : (
        <div className="grid gap-5 grid-cols-4 grid-rows-4 w-full h-full">
          {CARDS.map((row, rowIndex) => {
            return row.map((cardNumber, columnIndex) => {
              const isMatchedCard = matchedCards.includes(cardNumber);
              console.log("🚀 ~ isMatchedCard:", isMatchedCard);

              return (
                <button
                  key={`card_${rowIndex}_${columnIndex}`}
                  className={classNames(
                    "bg-zinc-700 shadow-zinc-900 shadow-sm text-slate-50 rounded grid place-items-center text-2xl transition-transform hover:scale-105",
                    {
                      "!bg-green-400 text-slate-800": isMatchedCard,
                    }
                  )}
                  onClick={() =>
                    onCardClick({
                      row: rowIndex,
                      column: columnIndex,
                      cardNumber,
                    })
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
      )}
    </>
  );
}
