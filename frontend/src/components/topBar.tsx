import { Plus, Share2 } from "lucide-react";
import { Button } from "./Button";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const TopBar = () => {
  return (
    <div className=" items-center p-7">
      <div className="text text-2xl font-bold">All Notes</div>
    </div>
  );
};

interface addContentButtonProps {
  setModalOpen: (open: boolean) => void;
}

export const Buttons = ({ setModalOpen }: addContentButtonProps) => {
  async function shareBrain() {
    if (true) {
      alert("This feature is under development");
      return;
    }

    try {
      await axios
        .post(
          `${BACKEND_URL}/brain/share`,
          {
            share: true,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          alert("Brain shared successfully\n" + res);
          console.log(res);
        });
    } catch (error) {
      alert("Failed to share brain\n" + error?.request.response);
      console.log(error);
    }
  }
  return (
    <div className="buttons flex justify-end p-4">
      <Button
        variant="secondary"
        size="md"
        text="Share Brain"
        startIcon={<Share2 size={20} />}
        onClick={shareBrain}
        className="mr-3"
      />

      <Button
        variant="primary"
        size="md"
        text="Add Content"
        startIcon={<Plus />}
        onClick={() => setModalOpen(true)}
      />
    </div>
  );
};
