"use client";
import { Admin } from "../../components/Admin";
import { useEffect, useState } from "react";
import { type GameDeal } from "../../types";

export default function AdminPage() {
  const [deals, setDeals] = useState<GameDeal[]>([]);

  useEffect(() => {
    fetch("/api/giveaways-feed?type=game")
      .then(res => res.json())
      .then(data => setDeals(data))
      .catch(() => setDeals([]));
  }, []);

  return <Admin deals={deals} />;
}
