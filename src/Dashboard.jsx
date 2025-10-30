import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/performance")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);
