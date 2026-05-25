"use client";
import { trpc } from "~/trpc/client";

export default function Home() {
  const { data } = trpc.health.getHealth.useQuery();
  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl">Streamyst - Stream in Style</h1>
        <h2>Server Status: {data?.status}</h2>
      </div>
    </main>
  );
}
