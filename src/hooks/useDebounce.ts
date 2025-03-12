import { useEffect, useRef, useState } from 'react';

const useDebounce = <T>(value: T, delay: number) => {
    const [state, setState] = useState(value);
    const timeoutId = useRef<number | undefined>();

    useEffect(() => {
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => setState(value), delay);
    }, [value, delay]);

    return state;
};

export { useDebounce };
