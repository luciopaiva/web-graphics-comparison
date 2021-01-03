import React from "react";
import "./SvgBenchmark.css";

interface PlayerProps {
    x: number;
    y: number;
    a: number;
}

class PlayerInfo {
    id: number;
    x: number;
    y: number;
    a: number;
    constructor(id: number, x: number, y: number, a: number) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.a = a;
    }
}

function Player(props: PlayerProps) {
    const translate = `translate(${props.x} ${props.y})`;
    const rotate = `rotate(${props.a})`;
    const transform = `${translate} ${rotate} scale(0.5)`;
    return (
        <use xlinkHref="#player" transform={transform} />
    );
}

interface SvgBenchmarkState {
    players: PlayerInfo[],
}

export default class SvgBenchmark extends React.Component<any, SvgBenchmarkState> {

    private timer: any;
    private isUpdating = false;

    constructor(props: any) {
        super(props);
        const players = [];
        for (let i = 0; i < 10000; i++) {
            const x = Math.trunc(Math.random() * 800);
            const y = Math.trunc(Math.random() * 600);
            const a = Math.trunc(Math.random() * 306);
            players.push(new PlayerInfo(i, x, y, a));
        }

        this.state = {
            players
        }
    }

    componentDidMount() {
        this.timer = setInterval(this.update.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    update() {
        if (this.isUpdating) {
            return;
        }
        this.isUpdating = true;
        const start = performance.now();
        this.setState((state: SvgBenchmarkState): SvgBenchmarkState => {
            const newPlayers = [...state.players];
            for (const player of newPlayers) {
                player.a += 10;
            }
            return { players: newPlayers };
        });
        console.info(performance.now() - start);
        this.isUpdating = false;
    }

    render() {
        const players = this.state.players.map(p => <Player key={p.id} x={p.x} y={p.y} a={p.a} />)

        return (
            <svg className="SvgBenchmark" shapeRendering="geometricPrecision">
                <defs>
                    <path id="player" d="M 0 -10 L 8 10 L 0 6 L -8 10 Z" fill="#00d" stroke="#88c" strokeWidth="2" strokeLinejoin="round" />
                </defs>
                {players}
            </svg>
        );
    }
}
