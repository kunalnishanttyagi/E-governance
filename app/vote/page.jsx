"use client";
import { useState } from 'react';
import { Button } from '../../components/ui/button';
const candidates = [
  {
    id: 1,
    name: "Arvind Kejriwal",
    party: "Janata Party",
    photo: "/arvindKejriwal.webp",
    wiki: "https://en.wikipedia.org/wiki/Arun_Mehta",
    description: "Arun Mehta is a social reformer and politician with 15 years of public service..."
  },
  {
    id: 2,
    name: "Narendra Modi",
    party: "Bharat Progressive Party",
    photo: "/narendraModi.jpg",
    wiki: "https://en.wikipedia.org/wiki/Priya_Sharma",
    description: "Priya Sharma has worked on women's education and healthcare reforms..."
  },
  {
    id: 3,
    name: "Rahul Gandhi",
    party: "National People's Alliance",
    photo: "/rahulGhandhi.webp",
    wiki: "https://en.wikipedia.org/wiki/Ravi_Verma",
    description: "Ravi Verma is a former civil servant known for his transparent leadership..."
  },
  {
    id: 3,
    name: "Mamata Banerjee",
    party: "National Group Alliance",
    photo: "/mamtaBanerjee.jpeg",
    wiki: "https://en.wikipedia.org/wiki/Rama",
    description: "Ravi Verma is a former civil servant known for his transparent leadership..."
  }
];


export default function VotePage() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  return (
    <div className="min-h-screen pt-24 bg-black p-4">
      {/* <h1 className="text-3xl font-bold text-center mb-6">🗳️ Cast Your Vote</h1> */}

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {candidates.map((c) => (
          <div key={c.id} className="bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-xl transition-all duration-300">
            <img src={c.photo} alt={c.name} className="w-full object-scale-down h-48  rounded-xl mb-3" />
            <h2 className="text-xl font-semibold">{c.name}</h2>
            <p className="text-gray-600">{c.party}</p>
            <a
              href={c.wiki}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              View on Wikipedia
            </a>
            <button
              onClick={() => setSelectedCandidate(c)}
              className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700"
            >
              Vote
            </button>
          </div>
        ))}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0  backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-2xl max-w-lg w-full relative shadow-xl">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-2 right-3 text-gray-500 text-2xl font-bold hover:text-red-600"
            >
              &times;
            </button>
            <img src={selectedCandidate.photo} alt={selectedCandidate.name} className="w-full h-60 object-scale-down rounded-xl mb-4" />
            <h2 className="text-2xl font-bold mb-2">{selectedCandidate.name}</h2>
            <p className="text-white font-medium mb-1">Party: {selectedCandidate.party}</p>
            <p className="text-white mb-3">{selectedCandidate.description}</p>
            <div className=' items-center justify-between flex gap-10' >
              <a
              href={selectedCandidate.wiki}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              Learn more on Wikipediaa
            </a>
            <Button className=' text-black' >Vote</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
