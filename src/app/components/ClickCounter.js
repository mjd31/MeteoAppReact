import { useState } from "react";

export default function ClickCounter() {
    const [clickCount, setClickCount] = useState(0);

    function incrementClickCount(step = 1) {
    setClickCount(clickCount + step);
    }

    return (
        <div>
            <button onClick={() => incrementClickCount(1)}>+1</button>
            <button onClick={() => incrementClickCount(3)}>+3</button>
            <p>{clickCount}</p>
        </div>
        );
}