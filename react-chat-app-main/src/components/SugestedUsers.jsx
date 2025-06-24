import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../api/AuthContext";
import axios from "axios";
export default function SugestedUsers({ all_users }) {
  const { user, token } = useContext(AuthContext);
  const followUser = async (followingId, token) => {
    try {
      const response = await axios.post(
        `ttp://localhost:3000/followed/follow/%${followingId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const unfollowUser = async (followingId, token) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/follower/unfollow",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { followingId: followingId },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // const [all_users, setUsers] = useState([]);
  const [followingIds, setFollowingIds] = useState(new Set());
  function getfollowing() {
    axios
      .get(`http://localhost:3000/follow/following/${user.userId}`)
      .then((data) => {
        console.log(data.data);
        const following = data.data;
        setFollowingIds(new Set(following.map((user) => user.id)));
        console.log(followingIds);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getfollowing();
  }, [all_users]);

  return (
    <div>
      {all_users.map((data, ind) => {
        const isFollowing = followingIds.has(data.id);
        return (
          <div
            key={ind}
            style={{
              color: "white",
              display: "flex",
              height: "10vh",
              width: "20vw",
              alignItems: "center",
              justifyContent: "space-around",
              
              border: "1px solid rgb(48, 48, 48)",
    margin:"10px",borderRadius:"10px"
            }}
          >
            <div>{data.name}</div>
            {isFollowing ? (
              <button
                onClick={() => {
                  unfollowUser();
                }}
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => {
                  followUser();
                }}
              >
                Follow
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
