import moment from "moment";
import { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import {
  deleteComment,
  fetchComments,
  postComment,
} from "../../../api/services/comments";
import useBoardStore from "../../../store/useBoardStore";
import useCardStore from "../../../store/useCardStore";
import useUserStore from "../../../store/useUserStore";
import { CommentData } from "../../../types";

export default function Comment() {
  const [text, setText] = useState("");
  const user = useUserStore((state) => state.user);
  const [comments, setComments] = useState<CommentData[]>([]);
  const boardId = useBoardStore((state) => state.boardId);
  const card = useCardStore((state) => state.selectedCard);

  const commentHandler = async () => {
    await postComment({
      text,
      board_id: boardId,
      card_id: card?.id,
      profile_id: user?.id,
    });

    if (card) {
      const { data } = await fetchComments(card.id);
      setComments(data);
      console.log(data);
      setText("");
    }
  };

  const deleteCommentHandler = async (id: string) => {
    await deleteComment(id);
    setComments((prev) => {
      return prev.filter((comment) => comment.id !== id);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (card) {
        const { data } = await fetchComments(card.id);
        setComments(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="w-full p-3 rounded-lg shadow-lg border mt-5 flex">
        <div className="img-container w-10 h-10">
          <img
            src="https://images.unsplash.com/photo-1658171402816-315e4cb993bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="img-full"
          />
        </div>
        <div className="ml-3 grow">
          <ReactTextareaAutosize
            className="w-full  outline-none resize-none"
            placeholder="Write a comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="btn-blue px-5 py-1 text-sm float-right"
            disabled={text.trim().length <= 0}
            onClick={commentHandler}
          >
            Comment
          </button>
        </div>
      </div>
      <div className="mt-8 space-y-5">
        {comments.map((comment) => (
          <div key={comment.id}>
            <div className="flex h-10 justify-between">
              <div className="flex">
                <div className="img-container w-10 h-full">
                  <img
                    src={comment.profile?.avatar_url}
                    alt=""
                    className="img-full"
                  />
                </div>
                <div className="flex flex-col justify-between ml-3">
                  <h2>{comment.profile?.username}</h2>
                  <small className="text-gray-400 text-xs">
                    {moment(comment.created_at).format("ll")}
                  </small>
                </div>
              </div>
              {user?.id === comment.profile_id && (
                <div className="flex text-gray-400 text-sm">
                  <button className="hover:text-gray-500">Edit</button>
                  <button
                    className="ml-3 hover:text-gray-500"
                    onClick={() => deleteCommentHandler(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="mt-3">
              <p className="w-full text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
