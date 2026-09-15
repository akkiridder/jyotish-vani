"use client";

import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface KundliSnapshotProps {
  fullName?: string;
  dob?: string;
  tob?: string;
  pob?: string;
  onClose?: () => void;
}

export function KundliSnapshot({ fullName, dob, tob, pob, onClose }: KundliSnapshotProps) {
  return (
    <div className="w-full bg-surface-container-low/95 border border-primary/20 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all">
      {/* Background Glow */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 bg-surface-container/50 -mx-6 -mt-6 p-4 px-6 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
            <span className="text-lg">☉</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              {fullName ? `${fullName}'s Janam Kundli` : "D1 Janam Kundli Snapshot"}
            </h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {pob ? `${pob} • ` : ""}{dob ? `${dob}${tob ? ` (${tob})` : ""} • ` : ""}Vrishabha Lagna • Rohini Nakshatra
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">
            Taurus Rising
          </Badge>
          <Badge variant="secondary" className="text-[10px] text-primary">
            Shukra Dominant
          </Badge>
          {onClose && (
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-container transition-colors ml-1"
              aria-label="Close Kundli Snapshot"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Chart Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* SVG Chart */}
        <div className="md:col-span-6 flex justify-center items-center">
          <div className="relative w-56 h-56 bg-surface-container-lowest/80 rounded-xl p-2 shadow-inner flex items-center justify-center">
            <svg
              className="w-full h-full stroke-primary/50 fill-none"
              strokeWidth="1.2"
              viewBox="0 0 200 200"
            >
              {/* Outer Box */}
              <rect
                className="stroke-primary/40"
                height="180"
                width="180"
                x="10"
                y="10"
              />
              {/* Inner Diagonals */}
              <line className="stroke-primary/30" x1="10" x2="190" y1="10" y2="190" />
              <line className="stroke-primary/30" x1="190" x2="10" y1="10" y2="190" />
              {/* Central Diamond */}
              <polygon
                className="stroke-primary/60 fill-primary/5"
                points="100,10 190,100 100,190 10,100"
              />
              {/* House Labels */}
              <text
                className="fill-primary text-[10px]"
                stroke="none"
                textAnchor="middle"
                x="100"
                y="60"
              >
                1st (Lagna) ♉
              </text>
              <text
                className="fill-foreground text-[9px]"
                stroke="none"
                textAnchor="middle"
                x="100"
                y="75"
              >
                Ven • ♀
              </text>
              <text
                className="fill-muted-foreground text-[8px]"
                stroke="none"
                textAnchor="middle"
                x="50"
                y="40"
              >
                2 (Gem)
              </text>
              <text
                className="fill-muted-foreground text-[8px]"
                stroke="none"
                textAnchor="middle"
                x="150"
                y="40"
              >
                12 (Ari)
              </text>
              <text
                className="fill-pink-400 text-[9px] font-semibold"
                stroke="none"
                textAnchor="middle"
                x="50"
                y="105"
              >
                4 (Leo) ☉
              </text>
              <text
                className="fill-blue-400 text-[9px] font-semibold"
                stroke="none"
                textAnchor="middle"
                x="150"
                y="105"
              >
                10 (Aqu) ♄
              </text>
              <text
                className="fill-muted-foreground text-[9px]"
                stroke="none"
                textAnchor="middle"
                x="100"
                y="145"
              >
                7th (Sco) ☽
              </text>
              <text
                className="fill-destructive text-[8px]"
                stroke="none"
                textAnchor="middle"
                x="100"
                y="160"
              >
                Rahu ☊
              </text>
            </svg>
            {/* Center Om */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-primary/20 text-2xl font-bold font-heading">
                ॐ
              </span>
            </div>
          </div>
        </div>

        {/* Planetary Positions */}
        <div className="md:col-span-6 flex flex-col gap-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-sm">♀ Venus</span>
            </div>
            <span className="text-xs text-foreground font-semibold">
              1st House • Exalted 21°
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-bold text-sm">♄ Saturn</span>
            </div>
            <span className="text-xs text-blue-400 font-semibold">
              10th House • Retrograde
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-bold text-sm">♃ Jupiter</span>
            </div>
            <span className="text-xs text-green-400 font-semibold">
              11th House • Benefic
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-bold text-sm">☽ Moon</span>
            </div>
            <span className="text-xs text-muted-foreground">
              7th House • Anuradha
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
