import { Button } from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addModal } from "../../actions/modals";

export default function InviteBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const openInvites = () => {
    console.log("openInvites called");
    const modal = {
      type: "InvitesCard",
      id: null,
    };
    dispatch(addModal(modal));
  };

  if (user.invites.length < 1) return null;
  if (user.invites.length === 1) {
    return (
      <Button
        variant="contained"
        size="small"
        color="secondary"
        onClick={openInvites}
      >
        {user.invites.length} invite
      </Button>
    );
  }
  return (
    <Button
      variant="contained"
      size="small"
      color="secondary"
      onClick={openInvites}
    >
      {user.invites.length} invites
    </Button>
  );
}
