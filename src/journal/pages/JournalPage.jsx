import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout";
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";

export const JournalPage = () => {
  const { isSaving, active } = useSelector((store) => store.journal);
  const dispatch = useDispatch();
  const onClickNewNote = () => {
    dispatch(startNewNote());
  };
  return (
    <JournalLayout>
      {!!active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main" },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined fontSize="30" />
      </IconButton>
    </JournalLayout>
  );
};
