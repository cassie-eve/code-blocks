import { db } from "@/db";
import Link from "next/link";

export default async function BlockPage({ params }: { params: { id: string } }) {
  const block = await db.block.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!block) {
    return <p>Block not found</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">Block Details</p>
        <div className="flex gap-2">
          <Link href={`/blocks/edit/${block.id}`}>
            <button className="rounded p-2 bg-blue-600 hover:bg-blue-700 text-white">
              Edit
            </button>
          </Link>
          <Link href={`/blocks/delete/${block.id}`}>
            <button className="rounded p-2 bg-red-600 hover:bg-red-700 text-white">
              Delete
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-bold">Title:</p>
        <p>{block.title}</p>
        <p className="font-bold mt-2">Code:</p>
        <pre className="border rounded p-2">{block.code}</pre>
      </div>
      <Link href="/">
        <button className="mt-4 rounded p-2 bg-gray-600 hover:bg-gray-700 text-white">
          Go Home
        </button>
      </Link>
    </div>
  );
}
