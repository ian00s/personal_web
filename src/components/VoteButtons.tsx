"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

interface VoteButtonsProps {
  postId: string;
  initialVotes: number;
}

const VoteButtons = ({ postId, initialVotes }: VoteButtonsProps) => {
  const { data: session } = useSession();
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async (value: number) => {
    if (!session) {
      alert("You need to be signed in to vote!");
      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);

      // If user already voted with the same value, remove the vote
      if (userVote === value) {
        const response = await fetch(`/api/votes/${postId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setVotes(votes - value);
          setUserVote(null);
        }
      } else {
        // If user hasn't voted or is changing their vote
        const response = await fetch(`/api/votes/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value }),
        });

        if (response.ok) {
          // If changing from opposite vote, adjust by 2x the value
          const adjustment = userVote ? 2 * value : value;
          setVotes(votes + adjustment);
          setUserVote(value);
        }
      }
    } catch (error) {
      console.error("Error voting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center">
      <p className="text-lg font-medium mr-4 mb-2 sm:mb-0">
        Did you find this useful?
      </p>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleVote(1)}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md flex items-center ${
            userVote === 1
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          } transition-colors`}
          aria-label="Upvote"
        >
          <FiThumbsUp className="mr-1" />
          <span>Upvote</span>
        </button>

        <button
          onClick={() => handleVote(-1)}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md flex items-center ${
            userVote === -1
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          } transition-colors`}
          aria-label="Downvote"
        >
          <FiThumbsDown className="mr-1" />
          <span>Downvote</span>
        </button>

        <div className="ml-3 text-lg font-medium">
          {votes > 0 && "+"}
          {votes}
        </div>
      </div>
    </div>
  );
};

export default VoteButtons;
