import axiosInstance from "../axiosInstance";

export interface Friend {
  memberSeq: string;
  nickname: string;
  introduction: string | null;
  imageUrl: string | null;
  followed: boolean;
}

interface FriendsPage {
  content: Friend[];
  number: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  numberOfElements: number;
}

interface FriendsResponse {
  data: FriendsPage;
}

export const searchFriends = (page = 0, size = 10, query = "") => {
  return axiosInstance.get<FriendsResponse>("/api/members", {
    params: {
      page,
      size,
      query,
    },
  });
};

// 팔로우
export const followFriend = (followMemberSeq: string) => {
  return axiosInstance.post("/api/member-follows", {
    followMemberSeq,
  });
};

// 언팔
interface UnfollowFriendType {
  followMemberSeq: string;
}

export const unfollowFriend = (data: UnfollowFriendType) => {
  return axiosInstance.request({
    url: `/api/member-follows/${data.followMemberSeq}`,
    method: "delete",
  });
};

// 팔로잉 리스트 가져오기
export interface Following {
  followMemberSeq: string;
  followMemberNickname: string;
  imageUrl: string | null;
}

interface FollowingListPage {
  content: Following[];
  number: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  numberOfElements: number;
}

interface FollowingListResponse {
  data: FollowingListPage;
}
export const getFollowingList = (page = 0, size = 10) => {
  return axiosInstance.get<FollowingListResponse>("/api/member-follows/my", {
    params: {
      page,
      size,
    },
  });
};
