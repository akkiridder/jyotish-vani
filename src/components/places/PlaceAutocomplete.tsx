"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2 } from "lucide-react";

interface PlaceResult {
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  importance: number;
}

interface PlaceAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (place: {
    displayName: string;
    latitude: number;
    longitude: number;
    timezone: string;
  }) => void;
  placeholder?: string;
  className?: string;
}

function getTimezoneFromOffset(offset: string): string {
  const tzMap: Record<string, string> = {
    "+05:30": "Asia/Kolkata",
    "+05:00": "Asia/Dubai",
    "+06:00": "Asia/Dhaka",
    "+08:00": "Asia/Shanghai",
    "+09:00": "Asia/Tokyo",
    "-07:00": "America/Los_Angeles",
    "-05:00": "America/New_York",
    "+00:00": "Europe/London",
    "+01:00": "Europe/Paris",
    "+02:00": "Europe/Berlin",
  };
  return tzMap[offset] || "Asia/Kolkata";
}

export function PlaceAutocomplete({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Start typing city name...",
  className,
}: PlaceAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<PlaceResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchPlaces = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=in&accept-language=en`,
        {
          headers: {
            "User-Agent": "JyotishVani/1.0 (vedic-astrology-app)",
          },
        }
      );
      const data: PlaceResult[] = await res.json();
      setSuggestions(data);
      setIsOpen(data.length > 0);
      setHighlightIndex(-1);
    } catch {
      setSuggestions([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchPlaces(val), 300);
  };

  const handleSelect = (place: PlaceResult) => {
    const displayName = place.display_name.split(",").slice(0, 2).join(",").trim();
    onChange(displayName);
    onPlaceSelect({
      displayName,
      latitude: parseFloat(place.lat),
      longitude: parseFloat(place.lon),
      timezone: getTimezoneFromOffset("+05:30"),
    });
    setIsOpen(false);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[highlightIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          className={`pl-10 pr-10 bg-surface-container-high border-border/50 ${className || ""}`}
          autoComplete="off"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-surface-container-high border border-border/50 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((place, index) => (
            <li
              key={`${place.lat}-${place.lon}-${index}`}
              className={`px-4 py-3 cursor-pointer text-sm transition-colors ${
                index === highlightIndex
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-surface-container-highest"
              }`}
              onClick={() => handleSelect(place)}
              onMouseEnter={() => setHighlightIndex(index)}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <span>{place.display_name.split(",").slice(0, 3).join(",").trim()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlaceAutocomplete;
