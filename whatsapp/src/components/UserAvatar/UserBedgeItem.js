import React from "react";
import { Box } from "@mui/material";
import { CloseOutlined } from "@ant-design/icons";
function UserBedgeItem({ user, handleFunction }) {
  return (
    <Box
      bgcolor="purple"
      margin={1}
      fontSize={15}
      borderRadius={2}
      color="white"
      padding={1}
      onClick={handleFunction}
    >
      {user.name}
      <CloseOutlined style={{ cursor: "pointer", margin: "5px" }} />
    </Box>
  );
}

export default UserBedgeItem;
