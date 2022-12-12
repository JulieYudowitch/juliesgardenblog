/* eslint-disable @next/next/no-img-element */
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { BsBarChart, BsTrash, BsChatDots } from "react-icons/bs";
import Moment from "react-moment";

function Comment({ comment }) {
  return (
    <div>
      <img
        src={comment?.userImg}
        alt=""
      />
      <div>
        <div>
          <div>
            <div>
              <h4>
                {comment?.username}
              </h4>
              <span>
                @{comment?.tag}{" "}
              </span>
            </div>{" "}
            ·{" "}
            <span>
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p>
              {comment?.comment}
            </p>
          </div>
          <div>
            <BiDotsHorizontalRounded />
          </div>
        </div>

        <div>
          <div>
            <BsChatDots />
          </div>

          <div>
            <div>
              <AiOutlineHeart />
            </div>
            <span></span>
          </div>

          <div>
            <AiOutlineShareAlt />
          </div>
          <div>
            <BsBarChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
