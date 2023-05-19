import React from "react";
import { Skeleton } from "antd";

function ChatLoading() {
  return (
    <div className="mt-5 ">
      <hr />
      <Skeleton
        loading={true}
        active
        avatar
        paragraph={{
          rows: 0,
        }}
      />

      <hr />
      <Skeleton
        loading={true}
        active
        avatar
        paragraph={{
          rows: 0,
        }}
      />

      <hr />
      <Skeleton
        loading={true}
        active
        avatar
        paragraph={{
          rows: 0,
        }}
      />
      <hr />
      <Skeleton
        loading={true}
        active
        avatar
        paragraph={{
          rows: 0,
        }}
      />
      <hr />
    </div>
  );
}

export default ChatLoading;
