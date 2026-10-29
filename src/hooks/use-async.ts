import { useEffect, useRef, useState } from 'react';

type AsyncState<T> = { status: 'loading' | 'success' | 'error'; data?: T };

/**
 * Carregador genérico (mesmo padrão do Kipia).
 * `key` precisa mudar sempre que os parâmetros da requisição mudarem.
 * Mantém os dados anteriores enquanto recarrega, para a tela não "piscar".
 */
export function useAsync<T>(fn: () => Promise<T>, key: string) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' });
  const [tick, setTick] = useState(0);
  const fnRef = useRef(fn);

  // Declarado antes do efeito de busca: roda primeiro e garante a função mais recente.
  useEffect(() => {
    fnRef.current = fn;
  });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ status: 'loading', data: s.data }));
    fnRef
      .current()
      .then((data) => {
        if (!cancelled) setState({ status: 'success', data });
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ status: 'error', data: s.data }));
      });
    return () => {
      cancelled = true;
    };
  }, [key, tick]);

  return { ...state, refetch: () => setTick((t) => t + 1) };
}
