import * as ChessJS from 'chess.js';
const Chess = ChessJS.Chess;

const randomMove = () => fen => {
    return new Promise(resolve => {
        const moves = new Chess(fen).moves({ verbose: true });
        const { from, to } = moves[Math.floor(Math.random() * moves.length)];
        setTimeout(() => resolve({ from, to }), 500);
    });
}

const uciWorker = (file, actions) => () => {
    const worker = new Worker(file);
    let resolver = null;
  
    worker.addEventListener('message', e => {
        const move = e.data.match(/^bestmove\s([a-h][1-8])([a-h][1-8])/);
        if (move && resolver) {
            resolver({ from: move[1], to: move[2] });
            resolver = null;
        }
    });
  
    return fen =>
        new Promise((resolve, reject) => {
            if (resolver) {
                reject('Pending move is present');
                return;
            }
  
            resolver = resolve;
            worker.postMessage(`position fen ${fen}`);
            actions.forEach(action => worker.postMessage(action));
        });
};


const Bots = {
    Random: randomMove,
    'nmrugg/stockfish (l:1,d:10)': uciWorker('bots/stockfish.js-10.0.2/stockfish.js', [
        'setoption name Skill Level value 1',
        'go depth 10',
    ]),
    'nmrugg/stockfish (l:20,d:10)': uciWorker('bots/stockfish.js-10.0.2/stockfish.js', [
        'setoption name Skill Level value 20',
        'go depth 10',
    ]),
    'nmrugg/stockfish (l:20,t:1s)': uciWorker('bots/stockfish.js-10.0.2/stockfish.js', [
        'setoption name Skill Level value 20',
        'go movetime 1000',
    ]),
    'op12no2/lozza (l:1,d:10)': uciWorker('bots/lozza-1.18/lozza.js', [
        'setoption name Skill Level value 1',
        'go depth 10',
    ]),
    'op12no2/lozza (l:20,d:10)': uciWorker('bots/lozza-1.18/lozza.js', [
        'setoption name Skill Level value 20',
        'go depth 10',
    ]),
    'op12no2/lozza (l:20,t:1s)': uciWorker('bots/lozza-1.18/lozza.js', [
        'setoption name Skill Level value 20',
        'go movetime 1000',
    ]),
};
export default Bots;

export const difficultyLevels = {
    Noob: {
        label: 'Noob',
        description: 'For beginners learning the ropes.',
        level: uciWorker('bots/stockfish.js-10.0.2/stockfish.js', [
            'setoption name Skill Level value 1',
            'go depth 5'
        ]),
    },
    Casual: {
        label: 'Casual',
        description: 'A relaxed challenge.',
        level: uciWorker('bots/stockfish.js-10.0.2/stockfish.js', [
            'setoption name Skill Level value 5',
            'go depth 10'
        ]),
    },
    Pro: {
        label: 'Pro',
        description: 'A strong opponent awaits.',
        level: uciWorker('bots/stockfish.js-10.0.2/stockfish.js', [
            'setoption name Skill Level value 15',
            'go depth 15'
        ]),
    },
    Warrior: {
        label: 'Warrior',
        description: 'Fast and brutal.',
        level: uciWorker('bots/stockfish.js-10.0.2/stockfish.js', [
            'setoption name Skill Level value 20',
            'go movetime 1000' // 1 second move
        ]),
    },
    Grandmaster: {
        label: 'Grandmaster',
        description: 'Maximum difficulty, full power!',
        level: uciWorker('bots/stockfish.js-10.0.2/stockfish.js', [
            'setoption name Skill Level value 20',
            'go depth 20'
        ]),
    },

};
