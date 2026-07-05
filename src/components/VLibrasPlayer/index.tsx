import { useEffect, useRef } from "react";

interface VLibrasPlayerProps {
  palavra: string;
  onReady?: () => void;
}

const VLibrasPlayer: React.FC<VLibrasPlayerProps> = ({ palavra, onReady }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const prontoRef = useRef(false);
  const palavraAtualRef = useRef(palavra);

  const enviarPalavra = (texto: string) => {
    const win = iframeRef.current?.contentWindow;
    if (!win || !prontoRef.current) return;
    win.postMessage({ type: "sinalizar", texto }, "*");
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data as { source?: string; type?: string };
      if (data?.source !== "vlibras-frame" || data.type !== "ready") return;

      prontoRef.current = true;
      onReady?.();
      enviarPalavra(palavraAtualRef.current);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Envia a palavra atual sempre que ela mudar (apos o iframe estar pronto).
  useEffect(() => {
    palavraAtualRef.current = palavra;
    enviarPalavra(palavra);
  }, [palavra]);

  return (
    <iframe
      ref={iframeRef}
      src="/vlibras-frame.html"
      title="VLibras"
      style={{ width: "100%", height: "100%", border: 0, display: "block" }}
    />
  );
};

export default VLibrasPlayer;
