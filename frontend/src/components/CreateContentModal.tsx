import { X } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./InputBox";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateContentModal = ({
  open,
  onClose,
}: CreateContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const type = typeRef.current?.value;

    if (type === "default") {
      alert("Select a type");
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/content`,
        {
          title: title,
          link: link,
          type: type,
          tags: [],
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert("Content Added Successfully");
      onClose();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-black bg-opacity-40 fixed top-0 left-0 flex justify-center items-center shadow-lg">
          <div className="w-96 bg-slate-100 rounded-lg p-5">
            <div className="flex justify-between items-center">
              <div className="flex justify-start text-xl">Add Content</div>
              <div className="flex justify-end">
                <button onClick={onClose}>
                  <X />{" "}
                </button>
              </div>
            </div>

            <Input
              placeholder="Title"
              className={"mt-5"}
              reference={titleRef}
            />
            <Input placeholder="Link" className={"mt-5"} reference={linkRef} />

            <div className="pt-5">
              <div>
                <select
                  name="Types"
                  id="type"
                  className="border border-purple-300 rounded-md p-1 outline-none hover:border-purple-500 hover:shadow-md hover:shadow-purple-400"
                  ref={typeRef}
                >
                  <option value="default">Select Type...</option>
                  <option value="tweet">Tweet</option>
                  <option value="video">Video</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center pt-5">
              <Button
                variant="primary"
                size="md"
                text="Done"
                onClick={addContent}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
