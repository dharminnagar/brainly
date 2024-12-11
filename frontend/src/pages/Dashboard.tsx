import { useEffect, useState } from "react";
import "../App.css";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { SideBar } from "../components/sideBar";
import { Buttons, TopBar } from "../components/topBar";
import { useContent } from "../hooks/useContent";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();

  console.log(contents);

  return (
    <>
      {/* TODO: Design this page */}
      <div className="flex">
        <SideBar />

        {/* Top Bar */}
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center bg-slate-100">
            <TopBar />
            <Buttons setModalOpen={setModalOpen} />
          </div>

          {/* Content */}
          <div className="h-full bg-slate-100 p-7">
            <CreateContentModal
              open={modalOpen}
              onClose={() => {
                setModalOpen(false);
              }}
            />

            <div className="flex gap-4 flex-wrap">
              {contents.length === 0 && (
                <div className="text-center w-full">
                  <p>
                    No content available. Create some content to get started!
                  </p>
                </div>
              )}

              {contents.map(({ title, link, type }) => (
                <Card title={title} link={link} type={type} />
              ))}

              {/* <Card
                title="My Video"
                link="https://www.youtube.com/watch?v=PkbxjgnLuXo"
                type="video"
              />

              <Card
                title="My First Tweet"
                link="https://x.com/DharminNagar/status/1857591879581188409"
                type="tweet"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
