import { useEffect, useRef } from "react";

const VLIBRAS_SCRIPT_SRC = "https://vlibras.gov.br/app/vlibras-plugin.js";
const VLIBRAS_APP_URL = "https://vlibras.gov.br/app";

declare global {
  interface Window {
    VLibras?: { Widget: new (url: string) => unknown };
    plugin?: {
      player?: unknown;
      translate?: (texto: string) => void;
    };
  }
}

interface VLibrasPlayerProps {
  palavra: string;
  onReady?: () => void;
}

let scriptPromise: Promise<void> | null = null;
const carregarScript = (): Promise<void> => {
  if (window.VLibras) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existente = document.querySelector<HTMLScriptElement>(
      `script[src="${VLIBRAS_SCRIPT_SRC}"]`,
    );
    if (existente) {
      existente.addEventListener("load", () => resolve());
      existente.addEventListener("error", () =>
        reject(new Error("Falha ao carregar o VLibras")),
      );
      return;
    }
    const script = document.createElement("script");
    script.src = VLIBRAS_SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () =>
      reject(new Error("Falha ao carregar o VLibras")),
    );
    document.body.appendChild(script);
  });

  return scriptPromise;
};

let widgetIniciado = false;

const VLibrasPlayer: React.FC<VLibrasPlayerProps> = ({ palavra, onReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prontoRef = useRef(false);
  const palavraAtualRef = useRef(palavra);

  const traduzir = (texto: string) => {
    const termo = (texto ?? "").trim();
    if (!termo || !window.plugin) return;

    if (typeof window.plugin.translate === "function") {
      window.plugin.translate(termo);
    } else {
      const player = window.plugin.player as
        | { translate?: (t: string) => void }
        | undefined;
      if (player && typeof player.translate === "function") {
        player.translate(termo);
      }
    }
  };

  useEffect(() => {
    let cancelado = false;
    const intervals: ReturnType<typeof setInterval>[] = [];

    carregarScript()
      .then(() => {
        if (cancelado || !window.VLibras) return;

        const wrapper = containerRef.current?.querySelector(
          "[vw-plugin-wrapper]",
        );
        const temConteudo = !!wrapper && wrapper.children.length > 1;
        if (widgetIniciado && !temConteudo) {
          widgetIniciado = false;
        }

        if (!widgetIniciado) {
          new window.VLibras.Widget(VLIBRAS_APP_URL);
          widgetIniciado = true;
        }
        const bootLoader = setInterval(() => {
          const btn = document.querySelector<HTMLElement>("[vw-access-button]");
          if (!btn) return;
          clearInterval(bootLoader);
          if (!window.plugin || !window.plugin.player) {
            btn.click();
          }

          const waitForMotor = setInterval(() => {
            if (window.plugin && window.plugin.player) {
              clearInterval(waitForMotor);
              if (cancelado) return;
              prontoRef.current = true;
              onReady?.();
              traduzir(palavraAtualRef.current);
            }
          }, 400);
          intervals.push(waitForMotor);
        }, 400);
        intervals.push(bootLoader);
      })
      .catch(() => {});

    return () => {
      cancelado = true;
      intervals.forEach(clearInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    palavraAtualRef.current = palavra;
    if (prontoRef.current) {
      traduzir(palavra);
    }
  }, [palavra]);

  return (
    <div
      ref={containerRef}
      {...({ vw: "true" } as Record<string, string>)}
      className="enabled"
      id="vlibras-container"
      style={{ width: "100%", height: "100%" }}
    >
      <div
        {...({ "vw-access-button": "true" } as Record<string, string>)}
        className="active"
      ></div>
      <div {...({ "vw-plugin-wrapper": "true" } as Record<string, string>)}>
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
};

export default VLibrasPlayer;
