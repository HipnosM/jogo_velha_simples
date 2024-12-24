import calculateWinner from './config/helper';

function Square({ value, onSquareClick }) {

    return (
        <button
            className={`square ${value === "X" ? 'square__x' : 'square__o'}`}
            onClick={onSquareClick}>
            {value}
        </button>
    )
};

export default function Board({ xIsNext, squares, onPlay }) {
    function handleSquareClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Vencedor: ${winner}`;
    } else {
        status = `Próximo: ${xIsNext ? "X" : "O"}`;
    }

    return (
        <>
            <div className="board__row">
                {squares.map((square, index) => (
                    <Square key={index} value={square} onSquareClick={() => handleSquareClick(index)} />
                ))}
            </div>

            <div className="status">
                <p>{status}</p>
            </div>
        </>
    );
}