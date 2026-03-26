import { MessageWall } from "@/components/MessageWall";

export default function Home() {
  return (
    <main className="flex-1 flex items-start justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Üzenőfal
        </h1>
        <MessageWall />
      </div>
    </main>
  );
}
