"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const STEPS = [
  { label: "Pagamento recebido", delay: 400 },
  { label: "Pedido confirmado", delay: 1200 },
  { label: "Redirecionando para seus pedidos", delay: 2000 },
];

const TOTAL_DURATION = 3500;

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { slug } = useParams<{ slug: string }>();

  const [layers, setLayers] = useState(0);
  const [stepsCompleted, setStepsCompleted] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const layerInterval = setInterval(() => {
      setLayers((prev) => {
        if (prev >= 6) {
          clearInterval(layerInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 420);

    STEPS.forEach((step, i) => {
      setTimeout(() => setStepsCompleted(i + 1), step.delay);
    });

    setTimeout(() => setShowSuccess(true), 2600);
    setTimeout(() => setCountdown(2), 2800);
    setTimeout(() => setCountdown(1), 3100);

    const redirect = setTimeout(() => {
      router.replace(`/${slug}/orders?${searchParams.toString()}`);
    }, TOTAL_DURATION);

    return () => {
      clearInterval(layerInterval);
      clearTimeout(redirect);
    };
  }, [router, searchParams, slug]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-white px-6">

      {/* ── HAMBÚRGUER FLAT ── */}
      <div className="flex h-48 flex-col items-center justify-end">

        {/* pão superior */}
        {layers >= 6 && (
          <div className="animate-in slide-in-from-top-4 duration-300">
            <div
              style={{
                position: "relative",
                width: 90,
                height: 32,
                background: "#f0a030",
                borderRadius: "45px 45px 0 0",
                overflow: "hidden",
              }}
            >
              {/* brilho */}
              <div
                style={{
                  position: "absolute",
                  top: 5,
                  left: 10,
                  width: 24,
                  height: 9,
                  background: "rgba(255,255,255,0.18)",
                  borderRadius: "50%",
                  transform: "rotate(-20deg)",
                }}
              />
              {/* gergelins */}
              {[
                { top: 8, left: 14, rotate: -20 },
                { top: 6, left: 34, rotate: 20 },
                { top: 9, left: 54, rotate: -10 },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: 7,
                    height: 4,
                    background: "#c97d30",
                    borderRadius: "50%",
                    top: s.top,
                    left: s.left,
                    transform: `rotate(${s.rotate}deg)`,
                  }}
                />
              ))}
            </div>
            {/* base do pão superior */}
            <div style={{ width: 90, height: 7, background: "#d4831a" }} />
          </div>
        )}

        {/* alface — faixa flat com ondulação orgânica suave no topo via SVG */}
        {layers >= 5 && (
          <div
            className="animate-in slide-in-from-top-4 duration-300"
            style={{ width: 96, lineHeight: 0 }}
          >
            <svg
              width="96"
              height="14"
              viewBox="0 0 96 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,7 Q12,0 24,5 Q36,10 48,4 Q60,0 72,5 Q84,10 96,4 L96,14 L0,14 Z"
                fill="#66bb6a"
              />
              <rect x="0" y="9" width="96" height="5" fill="#4caf50" />
            </svg>
          </div>
        )}

        {/* tomate */}
        {layers >= 4 && (
          <div
            className="animate-in slide-in-from-top-4 duration-300"
            style={{ width: 90, height: 9, background: "#e53935" }}
          />
        )}

        {/* queijo — clip-path diagonal */}
        {layers >= 3 && (
          <div
            className="animate-in slide-in-from-top-4 duration-300"
            style={{
              width: 100,
              height: 7,
              background: "#fdd835",
              clipPath: "polygon(0 0, 100% 0, 96% 100%, 4% 100%)",
            }}
          />
        )}

        {/* carne */}
        {layers >= 2 && (
          <div
            className="animate-in slide-in-from-top-4 duration-300"
            style={{
              position: "relative",
              width: 90,
              height: 18,
              background: "#6d3b1c",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 5,
                left: 8,
                right: 8,
                height: 3,
                background: "rgba(255,255,255,0.07)",
                borderRadius: 2,
              }}
            />
          </div>
        )}

        {/* pão inferior */}
        {layers >= 1 && (
          <div
            className="animate-in slide-in-from-top-4 duration-300"
            style={{
              width: 90,
              height: 16,
              background: "#f0a030",
              borderRadius: "0 0 16px 16px",
            }}
          />
        )}
      </div>

      {/* ── TEXTOS ── */}
      {!showSuccess ? (
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-xl font-semibold text-foreground">
            Preparando seu pedido
          </h1>
          <p className="text-sm text-muted-foreground">Só um instante...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h1 className="text-xl font-semibold text-foreground">
            Pagamento confirmado!
          </h1>
          <p className="text-sm text-muted-foreground">
            Redirecionando em{" "}
            <span className="font-semibold" style={{ color: "#f0a030" }}>
              {countdown}s
            </span>
          </p>
        </div>
      )}

      {/* ── STEPS ── */}
      <div className="flex w-full max-w-xs flex-col gap-3">
        {STEPS.map((step, i) => {
          const done = stepsCompleted > i;
          return (
            <div key={step.label} className="flex items-center gap-3">
              <div
                className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500"
                style={{
                  borderColor: done ? "#f0a030" : "#e5e7eb",
                  background: done ? "#f0a030" : "transparent",
                }}
              >
                {done && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5L4 7L8 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span
                className="text-sm transition-all duration-500"
                style={{
                  color: done ? "var(--foreground)" : "var(--muted-foreground)",
                  fontWeight: done ? 500 : 400,
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── BARRA DE PROGRESSO ── */}
      <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full"
          style={{
            background: "#f0a030",
            animation: `progress ${TOTAL_DURATION}ms ease-in-out forwards`,
          }}
        />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes progress {
              0%   { width: 0%; }
              100% { width: 100%; }
            }
          `,
        }}
      />
    </div>
  );
};

export default SuccessPage;